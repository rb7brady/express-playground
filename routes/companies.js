var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
/* GET users listing. */
router.get('/:symbol', function(req, res, next) {
    console.log("/Company hit");

    var connection = mysql.createConnection({
        host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
        user:"rtdb",
        password:"Riptide99!",
        database:"rtdb"
    });

    connection.connect();
    var queryFilter = "\"" + req.params.symbol + "\"";
    var queryBase = "SELECT * FROM company WHERE SYMBOL = ";
    console.log("queryBase: " + queryBase);
    var fullQuery = queryBase + queryFilter;
    console.log(fullQuery);

    connection.query(fullQuery, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].name);
        res.send(results);
    });

    connection.end();
});

router.get('/', function(req, res, next) {
    console.log("/company/all hit");

    var connection = mysql.createConnection({
        host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
        user:"rtdb",
        password:"Riptide99!",
        database:"rtdb"
    });

    connection.connect();
    var fullQuery = "SELECT * FROM company";
    console.log("fullQuery: " + fullQuery);

    connection.query(fullQuery, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].name);
        res.send(results);
    });

    connection.end();
});

module.exports = router;
