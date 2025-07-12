import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306, 
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'im2db',
});

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ Connected to database:', rows);
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
  }
}

testConnection(); // Run it once

export default pool;
