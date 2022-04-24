const mysql = require('mysql');
const mysqlConfig = require('../config/database');

const connectionPool = mysql.createPool(mysqlConfig);
const query = async (sql, params) => {
    console.log('Query: ', sql);
    console.log('Param: ', params);
    
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, params, (error, results) => {
            if(error) reject(error);
            return resolve(results);
        })
    });
}

module.exports = { query };