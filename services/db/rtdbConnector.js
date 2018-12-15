// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
    user:"rtdb",
    password:"Riptide99!",
    database:"rtdb",
    debug    :  false
});

var conn      =    mysql.createConnection({
    host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
    user:"rtdb",
    password:"Riptide99!",
    database:"rtdb"
});

module.exports = [pool,conn];