const mariadb = require('mariadb');
// read info form env
const dbhost = process.env.DBHOST;
const dbuser = process.env.DBUSER;
const dbpassword = process.env.DBPASSWORD;
const db = process.env.DB;
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
