import mysql from 'mysql2';

const db =  
  mysql.createConnection({
    //connectionLimit: 10,
    host: "192.168.1.172",
    user: "bactran",
    password: "Backhung123!",
    database: "elmoreDB"
  }).promise();


export {db};