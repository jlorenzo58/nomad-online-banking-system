const express = require('express');
const { pool } = require('../db');
const app = express();
const db = require('../db');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const query = 'SELECT id FROM users WHERE username = $1 AND password = $2';
      const values = [username, password];
      const result = await pool.query(query, values);
      
      if (result.rows.length > 0) {
        
        res.status(200).json({ message: 'Login successful', userId: result.rows[0].id });
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
        const id = await pool.query('SELECT id FROM users WHERE credit_card_num=$1', [creditCardNumber]);
        if (id.rows.length === 0) {
          return res.status(400).send('Invalid credit card number');
        }
        const result = await pool.query('UPDATE users SET username = $1, password = $2 WHERE id = $3', [username, password, id.rows[0].id]);
        console.log(result);
    
        res.status(201).json({ message: 'Account created successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
});

app.get('/api/overview/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT checking_routing_num, checking_account_num, saving_routing_num, saving_account_num, checking_balance, savings_balance FROM users WHERE id = $1',
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
