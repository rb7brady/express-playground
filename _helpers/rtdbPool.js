exports.pool = pool;
E
var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com',
    user     : 'rtdb',
    password : 'Riptide99!',
    database : 'rtdb'
});
34E5 65i
