//const environment = require('/env');
//require('dotenv').config(); // dotenv 패키지 사용
// config/database.js
const environment = require('../env');
const mysql2 = require('mysql2');

const database = mysql2.createConnection({
    host: environment.mariaDB.DB_HOST,
    user: environment.mariaDB.DB_USER,
    password: environment.mariaDB.DB_PASSWORD,
    database: environment.mariaDB.DB_NAME,
});

module.exports = database
