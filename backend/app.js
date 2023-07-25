const express = require('express')
const app = express();
const cors = require("cors")
const port = 5000;
const { pool } = require('./database_connect.js')

app.use(cors());
app.use(express.json())

console.log(cors)
app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`listening ${port}`)
})

app.get('/user', async(req, res)=> {
    try {
        const Users = await pool.query(
            "SELECT * FROM 'User'"
        )
        res.json(Users.rows)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Server error' });
        
    }
})


// app.post('/user', async(req, res) => {
//     try {
//         const user = req.body;
//         const insertQuery = `INSERT INTO "User"(id, firstname, lastname, location) 
//         VALUES(${"User".id}, '${"User".first_name}', '${"User".last_name}', '${"User".email_address}')`
//        res.json(user.rows[0])
//        console.log(user)

        
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).json({ error: 'Server error' });
//     }
// })