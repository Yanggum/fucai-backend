const path = require('path');
const env = require('../env');
const database = require('./database');
const pool = require("../env");
const mybatisMapper = require("mybatis-mapper");
const con = require("mysql2/promise");

let mybatisFormat = {language: 'sql', indent: '  '};
//let query = mybatisMapper.getStatement('fruit', 'testBasic', param, format);

mybatisMapper.createMapper([
    path.join(__dirname, '..', 'mapper', 'characters.xml'),
    path.join(__dirname, '..', 'mapper', 'chatParticipant.xml'),
    path.join(__dirname, '..', 'mapper', 'chats.xml'),
    path.join(__dirname, '..', 'mapper', 'users.xml')
]);


const connector = {
    async mybatisQuery(statementAndQuery, params) {
        const mybatisMapper = require('mybatis-mapper');
        const statement = statementAndQuery.split('.')[0];
        const query = statementAndQuery.split('.')[1];
        const mappedStatement = mybatisMapper.getStatement(statement, query, params);
        return database.promise().query(mappedStatement)
    },
};

module.exports = connector;
