// app.post('/user', async(req, res) => {
//     try {
//         const user = req.body;
//         const insertQuery = `insert into users(id, firstname, lastname, location) 
//         values(${user.id}, '${user.first_name}', '${user.last_name}', '${user.email_address}')`
//        res.json(user.rows[0])
//        console.log(user)

        
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).json({ error: 'Server error' });
//     }
// })