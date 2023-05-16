const express = require('express');
const { Router } = require('express');
const serverless = require('serverless-http');
const postgres = require('postgres');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sql = postgres(URL, { ssl: 'require' });

const api = express();
const router = Router();

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
 //
api.use('/.netlify/functions/api', router);

module.exports.handler = serverless(api);
