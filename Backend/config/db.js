const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


const initDB = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS schools (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(255)  NOT NULL,
      address     VARCHAR(500)  NOT NULL,
      latitude    FLOAT(10, 6)  NOT NULL,
      longitude   FLOAT(10, 6)  NOT NULL,
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(sql);
  console.log("Database initialised — schools table ready");
};

module.exports = { pool, initDB };