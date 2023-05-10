const express = require('express');
const { pool } = require('../db');
const app = express();
// const db = require('../db');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPostgresVersion();

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // const query = 'SELECT id FROM users WHERE username = $1 AND password = $2';
      const values = [username, password];
      // const result = await pool.query(query, values);
      const query = sql`SELECT id FROM users WHERE username = ${username} AND password = ${password}`;
      const result = await query;
      
      // const result = await sql(query, values);
      console.dir(result[0].id);
      if (result[0].id >= 0) {
        res.status(200).json({ message: 'Login successful', userId: result[0].id });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/accounts', async (req, res) => {
    try {
        const { username, password, creditCardNumber } = req.body;
        const query = 'SELECT id FROM users WHERE credit_card_num=$1';
        const id = await pool.query(query, [creditCardNumber]);
        if (id.rows.length === 0) {
          return res.status(400).send('Invalid credit card number');
        }
        else{
          const updateQuery= 'UPDATE users SET username = $1, password = $2 WHERE id = $3';
          const result = await pool.query(updateQuery, [username, password, id.rows[0].id]);
          console.log(result);
          res.status(200).json({ message: 'Account created successfully', userId: id.rows[0].id });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
});

app.get('/api/overview/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT checking_routing_num, checking_account_num, savings_routing_num, savings_account_num, checking_balance, savings_balance FROM users WHERE id = $1',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/api/settings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT username, password, email, phone, address FROM users WHERE id = $1',
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.put('/api/settings/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, phone, address } = req.body;

  try {
    // Update the user's details in the database
    const result = await pool.query(
      'UPDATE users SET username=$1, email=$2, phone=$3, address=$4 WHERE id=$5',
      [username, email, phone, address, id]
    );

    res.json({ message: 'User details updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/send-money/:id', async (req, res) => {
  const { accountType, amount, account } = req.body;

  const { id } = req.params; 
  try {
    const senderBalanceColumnName = `${accountType}_balance`;
    const senderAccount = await pool.query(`SELECT "${senderBalanceColumnName}" FROM users WHERE id =$1`, [id]);
    // console.log(senderAccount)
    const senderBalance = senderAccount.rows[0][senderBalanceColumnName];
    const temp1 = parseFloat(senderBalance) - parseFloat(amount);
    const deduct = temp1.toFixed(2);
    await pool.query(`UPDATE users SET "${senderBalanceColumnName}" = ${deduct} WHERE id = $1`, [id]);


    // get the recipient's account balance and update it
    const recipientBalanceColumnName = `${accountType}_balance`;
    const recipientAccount = await pool.query(`SELECT "${recipientBalanceColumnName}" FROM users WHERE ${accountType}_account_num = $1`, [account]);
    const recipientBalance = recipientAccount.rows[0][recipientBalanceColumnName];
    const temp = parseFloat(recipientBalance) + parseFloat(amount);
    const newBalance = temp.toFixed(2);
  
    await pool.query(`UPDATE users SET "${recipientBalanceColumnName}" = ${newBalance} WHERE ${accountType}_account_num = $1`, [account]);

    return res.send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/api/deposit-check/:id', async (req, res) => {
  try {
    const { accountType, amount } = req.body;
    const { id } = req.params; 
    
    if (!id || !accountType || !amount) {
      return res.status(400).send({ error: 'Missing required parameters' });
    }

    const balanceColumnName = `${accountType}_balance`;
    const account = await pool.query(`SELECT "${balanceColumnName}" FROM users WHERE id = $1`, [id]);
    const currentBalance = account.rows[0][balanceColumnName];
    const temp = parseFloat(currentBalance) + parseFloat(amount);
    const newBalance = temp.toFixed(2);
    await pool.query(`UPDATE users SET "${balanceColumnName}" = $1 WHERE id = $2`, [temp, id]);

    return res.send({ success: true, currentBalance:currentBalance });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Server error' });
  }
});

// POST /api/transfer
// Transfer money between two accounts
app.post('/api/transfer/:id', async (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;
  const { id } = req.params; 
  try {
    // Check if the "from" and "to" accounts are different
    if (fromAccount === toAccount) {
      return res.status(400).send({ error: 'Transfer not allowed: accounts must be different' });
    }

    // Get the current balance of the "from" account
    const fromAccountType = fromAccount.startsWith('c') ? 'checking' : 'savings';
    const fromAccountBalanceColumnName = `${fromAccountType}_balance`;
    const fromAccountResult = await pool.query(`SELECT "${fromAccountBalanceColumnName}" FROM users WHERE id = $1`, [id]);
    const fromAccountBalance = fromAccountResult.rows[0][fromAccountBalanceColumnName];

    // Deduct the transfer amount from the "from" account
    const temp1 = parseFloat(fromAccountBalance) - parseFloat(amount);
    const newFromAccountBalance = temp1.toFixed(2);
    console.log(newFromAccountBalance)
    await pool.query(`UPDATE users SET "${fromAccountBalanceColumnName}" = $1 WHERE id = $2`, [newFromAccountBalance, id]);

    // Get the current balance of the "to" account
    const toAccountType = toAccount.startsWith('c') ? 'checking' : 'savings';
    const toAccountBalanceColumnName = `${toAccountType}_balance`;
    const toAccountResult = await pool.query(`SELECT "${toAccountBalanceColumnName}" FROM users WHERE id = $1`, [id]);
    const toAccountBalance = toAccountResult.rows[0][toAccountBalanceColumnName];

    // Increase the balance of the "to" account
    const temp = parseFloat(toAccountBalance) + parseFloat(amount);
    const newToAccountBalance= temp.toFixed(2);
    console.log(newToAccountBalance)
    await pool.query(`UPDATE users SET "${toAccountBalanceColumnName}" = $1 WHERE id = $2`, [newToAccountBalance, id]);

    // Return success response
    return res.send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});



app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
