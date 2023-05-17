const express = require('express');
const { Router } = require('express');
const serverless = require('serverless-http');
const postgres = require('postgres');
const bodyParser = require('body-parser');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sql = postgres(URL, { ssl: 'require' });

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPostgresVersion();

const api = express();
const router = Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = sql`SELECT id FROM users WHERE username = ${username} AND password = ${password}`;
    const result = await query;

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

router.post('/accounts', async (req, res) => {
  try {
      const { username, password, creditCardNumber } = req.body;
      // const query = 'SELECT id FROM users WHERE credit_card_num=$1';
      // const id = await pool.query(query, [creditCardNumber]);
      const query = sql`SELECT id FROM users WHERE credit_card_num=${creditCardNumber}`;
      const id = await query;
      if (id[0].id < 0) {
        return res.status(400).send('Invalid credit card number');
      }
      else{
        // const updateQuery= 'UPDATE users SET username = $1, password = $2 WHERE id = $3';
        // const result = await pool.query(updateQuery, [username, password, id.rows[0].id]);
        const updateQuery = sql`UPDATE users SET username =${username}, password =${password} WHERE id =${id[0].id}`;
        const result = await updateQuery;
        console.log(result);
        res.status(200).json({ message: 'Account created successfully', userId: id[0].id });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/overview/:id', async (req, res) => {
const { id } = req.params;

try {
  // const result = await pool.query(
  //   'SELECT checking_routing_num, checking_account_num, savings_routing_num, savings_account_num, checking_balance, savings_balance FROM users WHERE id = $1',
  //   [id]
  // );
  const query = sql`SELECT checking_routing_num, checking_account_num, savings_routing_num, savings_account_num, checking_balance, savings_balance FROM users WHERE id = ${id}`;
  const result = await query;
  res.json(result[0]);
} catch (err) {
  console.error(err);
  res.status(500).send('Internal server error');
}
});

router.get('/transactions/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY transaction_id DESC`;
    const result = await query;

    res.json(result);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'An error occurred while fetching transactions.' });
  }
});

router.get('/settings/:id', async (req, res) => {
const { id } = req.params;

try {
  // const result = await pool.query(
  //   'SELECT username, password, email, phone, address FROM users WHERE id = $1',
  //   [id]
  // );
  const query = sql`SELECT username, password, email, phone, address FROM users WHERE id = ${id}`
  const result = await query;

  res.json(result[0]);
} catch (err) {
  console.error(err);
  res.status(500).send('Internal server error');
}
});

router.put('/settings/:id', async (req, res) => {
const { id } = req.params;
const { username, email, phone, address } = req.body;

try {
  // Update the user's details in the database
  // const result = await pool.query(
  //   'UPDATE users SET username=$1, email=$2, phone=$3, address=$4 WHERE id=$5',
  //   [username, email, phone, address, id]
  // );
  const query = sql`UPDATE users SET username=${username}, email=${email}, phone=${phone}, address=${address} WHERE id=${id}`;
  const result = await query;

  res.json({ message: 'User details updated successfully' });
} catch (err) {
  console.error(err);
  res.status(500).send('Internal server error');
}
});

router.post('/send-money/:id', async (req, res) => {
const { accountType, amount, account } = req.body;

const { id } = req.params; 
try {
  if(accountType.startsWith('c')){
    const recipientQuery = sql`SELECT checking_balance FROM users WHERE checking_account_num = ${account}`
    const recipientResult = await recipientQuery;

    const query = sql`SELECT checking_balance FROM users WHERE id =${id}`;
    const result = await query;
    const senderBalance = result[0].checking_balance;
    const temp1 = parseFloat(senderBalance) - parseFloat(amount);
    const deduct = temp1.toFixed(2);

    const updateQuery = sql`UPDATE users SET checking_balance = ${deduct} WHERE id = ${id}`;
    const updateResult = await updateQuery;
    // await pool.query(`UPDATE users SET "${senderBalanceColumnName}" = ${deduct} WHERE id = $1`, [id]);

    // const recipientQuery = sql`SELECT checking_balance FROM users WHERE checking_account_num = ${account}`
    // const recipientResult = await recipientQuery;

    const recipientBalance = recipientResult[0].checking_balance;
    const temp = parseFloat(recipientBalance) + parseFloat(amount);
    const newBalance = temp.toFixed(2);

    const recipientUpdateQuery = sql`UPDATE users SET checking_balance = ${newBalance} WHERE checking_account_num = ${account}`;
    const finalResult = await recipientUpdateQuery;
  }
  else{
    const recipientQuery = sql`SELECT savings_balance FROM users WHERE savings_account_num = ${account}`
    const recipientResult = await recipientQuery;

    const query = sql`SELECT savings_balance FROM users WHERE id =${id}`;
    const result = await query;
    const senderBalance = result[0].savings_balance;
    const temp1 = parseFloat(senderBalance) - parseFloat(amount);
    const deduct = temp1.toFixed(2);

    const updateQuery = sql`UPDATE users SET savings_balance = ${deduct} WHERE id = ${id}`;
    const updateResult = await updateQuery;

    const recipientBalance = recipientResult[0].savings_balance;
    const temp = parseFloat(recipientBalance) + parseFloat(amount);
    const newBalance = temp.toFixed(2);

    const recipientUpdateQuery = sql`UPDATE users SET savings_balance = ${newBalance} WHERE savings_account_num = ${account}`;
    const finalResult = await recipientUpdateQuery;
  }

  return res.send({ success: true });
} catch (err) {
  console.error(err);
  return res.status(500).send({ error: 'Internal server error' });
}
});

router.post('/deposit-check/:id', async (req, res) => {
  try {
    const { accountType, amount } = req.body;
    const { id } = req.params; 
    
    if (!id || !accountType || !amount) {
      return res.status(400).send({ error: 'Missing required parameters' });
    }

    if(accountType.startsWith('c')){
      const transactionDate = new Date().toISOString();
      const transactionType = 'Deposit (Checking)';
      const query = sql`SELECT checking_balance FROM users WHERE id = ${id}`
      const result = await query; 
      console.dir(result[0]);
      const currentBalance = result[0].checking_balance;
      const temp = parseFloat(currentBalance) + parseFloat(amount);
      const newBalance = temp.toFixed(2);
      const updateQuery = sql`UPDATE users SET checking_balance = ${temp} WHERE id = ${id}`;
      const insertQuery = sql`INSERT INTO transactions (transaction_date, transaction_type, amount, user_id) VALUES (${transactionDate}, ${transactionType}, ${amount}, ${id})`;
      const finalResult = await updateQuery;
      await insertQuery;
    }else{
      // const account = await pool.query(`SELECT "${balanceColumnName}" FROM users WHERE id = $1`, [id]);
      const transactionDate = new Date().toISOString();
      const transactionType = 'Deposit (Savings)';
      const query = sql`SELECT savings_balance FROM users WHERE id = ${id}`
      const result = await query; 
      console.dir(result[0]);
      const currentBalance = result[0].savings_balance;
      const temp = parseFloat(currentBalance) + parseFloat(amount);
      const newBalance = temp.toFixed(2);
      const updateQuery = sql`UPDATE users SET savings_balance = ${temp} WHERE id = ${id}`;
      const insertQuery = sql`INSERT INTO transactions (transaction_date, transaction_type, amount, user_id) VALUES (${transactionDate}, ${transactionType}, ${amount}, ${id})`;
      const finalResult = await updateQuery;
      await insertQuery;
    }

    return res.send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Server error' });
  }
});

// POST /api/transfer
// Transfer money between two accounts
router.post('/transfer/:id', async (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;
  const { id } = req.params; 
  try {
    // Check if the "from" and "to" accounts are different
    if (fromAccount === toAccount) {
      return res.status(400).send({ error: 'Transfer not allowed: accounts must be different' });
    }

    // Get the current balance of the "from" account
    const fromAccountType = fromAccount.startsWith('c') ? 'checking' : 'savings';

    if(fromAccount.startsWith('c')){
      const transactionDate = new Date().toISOString();
      const transactionType = 'Transfer (checking to savings)';
      const query = sql`SELECT checking_balance FROM users WHERE id = ${id}`;
      const result = await query;
      const fromAccountBalance = result[0].checking_balance;

      const temp1 = parseFloat(fromAccountBalance) - parseFloat(amount);
      const newFromAccountBalance = temp1.toFixed(2);
      const secondQuery = sql`UPDATE users SET checking_balance = ${newFromAccountBalance} WHERE id = ${id}`;
      const secondResult = await secondQuery;

      const thirdQuery = sql`SELECT savings_balance FROM users WHERE id = ${id}`;
      const thirdResult = await thirdQuery;
      const toAccountBalance = thirdResult[0].savings_balance;

      const temp = parseFloat(toAccountBalance) + parseFloat(amount);
      const newToAccountBalance= temp.toFixed(2);

      const finalQuery = sql`UPDATE users SET savings_balance = ${newToAccountBalance} WHERE id = ${id}`;
      const insertQuery = sql`INSERT INTO transactions (transaction_date, transaction_type, amount, user_id) VALUES (${transactionDate}, ${transactionType}, ${amount}, ${id})`;
    
      const finalResult = await finalQuery;
      await insertQuery;
    }
    else{
      const transactionDate = new Date().toISOString();
      const transactionType = 'Transfer (savings to checking)';
      const query = sql`SELECT savings_balance FROM users WHERE id = ${id}`;
      const result = await query;
      const fromAccountBalance = result[0].savings_balance;

      const temp1 = parseFloat(fromAccountBalance) - parseFloat(amount);
      const newFromAccountBalance = temp1.toFixed(2);
      const secondQuery = sql`UPDATE users SET savings_balance = ${newFromAccountBalance} WHERE id = ${id}`;
      const secondResult = await secondQuery;

      const thirdQuery = sql`SELECT checking_balance FROM users WHERE id = ${id}`;
      const thirdResult = await thirdQuery;
      const toAccountBalance = thirdResult[0].checking_balance;

      const temp = parseFloat(toAccountBalance) + parseFloat(amount);
      const newToAccountBalance= temp.toFixed(2);
      const finalQuery = sql`UPDATE users SET checking_balance = ${newToAccountBalance} WHERE id = ${id}`;
      const insertQuery = sql`INSERT INTO transactions (transaction_date, transaction_type, amount, user_id) VALUES (${transactionDate}, ${transactionType}, ${amount}, ${id})`;
    
      const finalResult = await finalQuery;
      await insertQuery;
    }

    // Return success response
    return res.send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});


 //
api.use('/.netlify/functions/api', router);
// app.use('/api/login', router);
// app.use('/api/accounts',router);
// app.use('/overview/:id',router);
// app.use('/settings/:id',router);
// app.use(`/send-money/:id`,router);
// app.use('/deposit-check/:id',router);
// app.use('/api/transfer/:id', router);

module.exports = api;
module.exports.handler = serverless(api);