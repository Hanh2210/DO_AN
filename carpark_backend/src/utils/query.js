const mysql = require('mysql');
const mysqlConfig = require('../config/database');

const connectionPool = mysql.createPool(mysqlConfig);
const query = async (sql, params) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, params, (error, results) => {
            if(error) reject(error);
            return resolve(results);
        })
    });
}

module.exports = { query };