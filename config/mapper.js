// config/mapper.js

const path = require('path');
const { createMapper } = require('mybatis-mapper');
const { database } = require('./database');

const mapperPath = path.join(__dirname, '../mapper');
const configPath = path.join(__dirname, '../mybatis-config.xml');

createMapper({
    mapperLocations: [mapperPath + '/*.xml'],
    configLocation: configPath,
    pool: database,
});
