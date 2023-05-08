// import { Pool } from 'pg';
require('dotenv').config({path: '../.env'});
// require('dotenv').config();

// console.log(process.env.DB_USER)

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });
const postgres = require('postgres');
const { PGHOST_Pooler, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST_Pooler}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

// const pool = new postgres({
//     PGUSER: process.env.PGUSER,
//     PGHOST: process.env.PGHOST,
//     PGDATABASE: process.env.PGDATABASE,
//     PGPASSWORD: process.env.PGPASSWORD,
//     ENDPOINT_ID: process.env.ENDPOINT_ID,
//     ssl: 'require'
// });

const sql = postgres(URL, { ssl: 'require'});

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPostgresVersion();


// pool.connect((err, client, done) => {
//     if (err) {
//       console.error('Error connecting to database', err.stack);
//     } else {
//       console.log('Connected to database');
//     }
//     done();
//   });
exports.pool = sql;
// export default  pool ;
// module.exports = sql;