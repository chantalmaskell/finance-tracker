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
    res.status(200).json(users);
    }
    });
});

// GET one user
app.get('/getuser', (req, res) => {
    const query = 'SELECT * FROM "User" WHERE first_name = \'Chantal\';';
    
    pool.query(query, (err, result) => {
        if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        const users = result.rows;
        res.status(200).json(users);
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
    res.status(200).json(users);
    }
});
});

// GET budget from current user
app.get('/getbudget', (req, res) => {
    const query = `SELECT s.budget
                        FROM "Spending" s
                        INNER JOIN "User" u ON s.user_id = u.user_id
                        WHERE u.first_name = \'Chantal\';`;
    pool.query(query, (err, result) => {
        if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        const users = result.rows;
        res.status(200).json(users);
        }
        });
    });

// Create new user
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

// GET expense from current user
app.get('/getexpense', (req, res) => {
    const query = `SELECT first_name, last_name, expense_name, expense_cost 
                    FROM "ExpenseItems"
                    INNER JOIN "User"
                    ON "User".user_id = "ExpenseItems".user_id
                    WHERE "User".first_name = 'Chantal';`;
    pool.query(query, (err, result) => {
        if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        const users = result.rows;
        res.status(200).json(users);
        }
        });
    });

// GET name of current user
app.get('/getname', (req, res) => {
    const query = `SELECT first_name
                    FROM "User"
                    WHERE first_name = \'Chantal\';`;
    pool.query(query, (err, result) => {
        if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        const users = result.rows;
        res.status(200).json(users);
        }
        });
    });

// Create expense item
app.post('/addexpense', async (req, res) => {
    const { expense_id, expense_name, expense_cost, user_id } = req.body;
    const insertQuery = 'INSERT INTO "ExpenseItems" (expense_id, expense_name, expense_cost, user_id) VALUES ($1, $2, $3, $4)';
  
    try {
      await pool.query(insertQuery, [expense_id, expense_name, expense_cost, user_id]);
      res.status(201).json({ message: 'Expense added successfully!' });0
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // GET list of expenses for ExpenseList
app.get('/getexpenses', (req, res) => {
    const query = `SELECT expense_name, expense_cost
                    FROM "ExpenseItems"
                    WHERE user_id = '122';`;
    pool.query(query, (err, result) => {
        if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        const users = result.rows;
        res.status(200).json(users);
        }
        });
    });

// Remove expense
app.delete('/deleteexpense', (req, res) => {
    const query = `SELECT expense_name, expense_cost
                    FROM "ExpenseItems"
                    WHERE user_id = '122';`;
    pool.query(query, (err, result) => {
        if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        } else {
        const users = result.rows;
        res.status(200).json(users);
        }
        });
    });

// GET just expense costs for current user
app.get('/expensecost', (req, res) => {
  const query = `SELECT expense_cost
                  FROM "ExpenseItems"
                  WHERE user_id = '122';`;
  pool.query(query, (err, result) => {
      if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
      } else {
      const users = result.rows;
      res.status(200).json(users);
      }
      });
  });

// Start server listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });