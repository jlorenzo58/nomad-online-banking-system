const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to database', err.stack);
    } else {
      console.log('Connected to database');
    }
    done();
  });

module.exports = { pool };