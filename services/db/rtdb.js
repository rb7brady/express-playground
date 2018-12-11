var mysql      = require('mysql');

var connection = mysql.createConnection({
    host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
    user:"rtdb",
    password:"Riptide99!",
    database:"rtdb"
});


function helloWorldRtdb() {
    return "RTDB Hello World";
}
module.exports = helloWorldRtdb();