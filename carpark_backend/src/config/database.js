require("dotenv").config();
module.exports = {
    connectionLimit : 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'default',
    port: process.env.DB_PORT || 3306
}