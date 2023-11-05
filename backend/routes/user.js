import express from 'express'
import database from '../database/database.js'
import bcrypt from 'bcrypt' 

const user = express.Router()

user.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    
    database.query(query, [email], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }

        // user doesn't exist
        if (results.length === 0) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        const user = results[0];
        const hashedPassword = user.pwd;

        try {
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            
            if (passwordMatch) {
                res.status(200).json({ message: 'Autenticación exitosa', id: user.id, username: user.username });
            } else {
                // incorrect password
                res.status(401).json({ error: 'Incorrect password' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
});


user.get('/users', (req, res) => {
    const query = 'SELECT * FROM users'

    database.query(query, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json(err)
            return
        }

        res.json(result)
    })
})

export default user