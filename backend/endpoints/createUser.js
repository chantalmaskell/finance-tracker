// Test GET request
app.get('/test', (req, res) => {
    res.send('This is a test endpoint!');
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
app.get('/meow', (req, res) => {
    const query = 'SELECT * FROM "User" LIMIT 1';
    
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