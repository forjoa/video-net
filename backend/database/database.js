import mysql from 'mysql2'

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'videonet'
})

export default database