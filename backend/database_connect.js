const { Pool } = require('pg');

console.log('hello from the connection')

console.log(Pool)
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'finance_tracker',
  password: 'root',
  port: '5433',
});

module.exports = pool