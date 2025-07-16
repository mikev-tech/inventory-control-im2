import mysql from 'mysql2/promise';

let pool;

if (!globalThis.dbPool) {
  globalThis.dbPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'im2db',
    waitForConnections: true,
    connectionLimit: 10,      //Limit max active connections
    queueLimit: 0
  });

  // Optional: Test only once
  globalThis.dbPool.query('SELECT 1').then(() => {
    console.log('MySQL connected');
  }).catch((err) => {
    console.error('DB Connection Failed:', err);
  });
}

pool = globalThis.dbPool;

export default pool;
