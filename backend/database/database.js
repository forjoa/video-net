import mysql from 'mysql2'

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'videonet',
})

export default database
