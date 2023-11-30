const mysql = require('mysql');
const dotenv = require('dotenv');

// Create 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.AWS_HOST,
    user: process.env.AWS_USERNAME,
    password: process.env.AWS_PASSWORD,
    database: process.env.AWS_DB_NAME,
    port: 3306,
    multipleStatements: true
});

// Export for use in our app
module.exports.pool = pool;