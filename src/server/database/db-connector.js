const mysql = require('mysql');
const dotenv = require('dotenv');

// Create 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

// Export for use in our app
module.exports.pool = pool;