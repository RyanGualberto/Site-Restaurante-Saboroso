const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'RV',
    database: 'saboroso',
    password: 'Ry044825',
    multipleStatements:  true
});

module.exports = connection;