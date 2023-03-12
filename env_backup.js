const mysql2 = require('mysql2');
const {mariaDB} = require("./env_backup");


module.exports = {
    env: 'local',
    mariaDB: {
        DB_HOST: "",
        DB_PORT: "",
        DB_USER: "",
        DB_PASSWORD: "",
        DB_NAME: "" // fucai
    },
    JWT_SECRET: ''
};
