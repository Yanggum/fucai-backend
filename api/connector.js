const mariadb = require('mariadb');
const env = require('../env');
// read info form env
const dbhost = env.mariaDB.DBHOST;
const dbuser = env.mariaDB.DBUSER;
const dbpassword = env.mariaDB.DBPASSWORD;
const db = env.mariaDB.DB;
const connector = mariadb.createPool({
    host: dbhost,
    user: dbuser,
    password: dbpassword,
    database: db
});

// const connector = mariadb.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'fucai'
// });

module.exports = connector;
