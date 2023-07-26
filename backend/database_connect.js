const { Pool } = require('pg');

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'finance_tracker',
  password: 'root',
  port: 5433,
};

const pool = new Pool(dbConfig);

module.exports = { pool, dbConfig };