import mysql from 'mysql2'
import pkg from 'pg'

const { Pool } = pkg

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'videonet',
})

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
})

if (pool) {
  console.log('Postgre connection made correctly')
}

export default database
