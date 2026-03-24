const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "4538Goose32!!!",
  database: "task_management_db",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;