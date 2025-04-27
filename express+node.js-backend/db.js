// db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2309',
  database: 'equipment_system'
});

module.exports = db;
