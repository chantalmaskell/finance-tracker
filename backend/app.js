const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

const { pool, dbConfig } = require('./database_connect.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});
  
// Test GET request
app.get('/test', (req, res) => {
    res.send('This is a test endpoint');
  });

// GET all users
app.get('/users', (req, res) => {
const query = 'SELECT * FROM "User"';

pool.query(query, (err, result) => {
    if (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
    } else {
    const users = result.rows;
    res.status(200).json(users); // Sending the result as JSON in the response body
    }
});
});

// GET one user
app.get('/getuser', (req, res) => {
    const query = 'SELECT * FROM "User" WHERE first_name = \'james\';';
    
    pool.query(query, (err, result) => {
        if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        const users = result.rows;
        res.status(200).json(users); // Sending the result as JSON in the response body
        }
    });
    });

// GET salaries of all users
app.get('/getsalary', (req, res) => {
    const query = `SELECT first_name, last_name, salary
                   FROM "Spending"
                   INNER JOIN "User"
                   ON "Spending".user_id = "User".user_id;`;

pool.query(query, (err, result) => {
    if (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
    } else {
    const users = result.rows;
    res.status(200).json(users); // Sending the result as JSON in the response body
    }
});
});

// POST user data
app.post('/newuser', async (req, res) => {
    const { user_id, first_name, last_name, email_address } = req.body;
    const insertQuery = 'INSERT INTO "User" (user_id, first_name, last_name, email_address) VALUES ($1, $2, $3, $4)';
  
    try {
      await pool.query(insertQuery, [user_id, first_name, last_name, email_address]);
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// start server listening
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});