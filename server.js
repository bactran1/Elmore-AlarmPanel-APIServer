const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "192.168.1.172",
    user: "bactran",
    password: "Backhung123!",
    database: "elmoreDB"
  });

exports.db = db;