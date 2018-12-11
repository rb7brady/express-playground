var express = require('express');
var request = require('request');
var router = express.Router();
var mysql      = require('mysql');

const SELECT_PREFIX = "SELECT * FROM company WHERE SYMBOL LIKE ";
const SELECT_PREFIX_ID = "SELECT * FROM company WHERE ID = ";




/* GET users listing. */
router.get('/test/json', function(req, res, next) {
    console.log("Entering method....");
    connection.connect();

    var queryFilter = "\'\%" + req.params.symbol + "\'\%";
    var queryBase = "SELECT json_object(*) FROM company WHERE SYMBOL = ";
    console.log("queryBase: " + queryBase);
    var fullQuery = queryBase + queryFilter;
    console.log(fullQuery);

    connection.query(fullQuery, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            console.log('The solution is: ', results[0].name);
        }

        res.send(results);
    });

    connection.end();
});


/* GET company listing. */
router.get('/search/:symbol', function(req, res, next) {

    var connection = mysql.createConnection({
        host: "rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
        user: "rtdb",
        password: "Riptide99!",
        database: "rtdb"
    });
    console.log(req.params);
    connection.connect();
    connection.query(SELECT_PREFIX + "\"%" + req.params.symbol + "%\"",  function(error, results, fields) {
        queryCallback(error, results);
    });
});

function queryCallback(error, results) {
    var resultsFound = false;

    if (results.length > 0) {
        resultsFound = true;
        res.send(results);
    } else if (!resultsFound) {
        request('https://api.iextrading.com/1.0/stock/' + req.params.symbol + '/company', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (!error) {
                var json = JSON.parse(body);
                var iCompanyJsonModel = {};
                iCompanyJsonModel.name = json['companyName'];
                iCompanyJsonModel.symbol = json['symbol'];

                connection.query("INSERT INTO company (symbol, name) values (\"" + json['symbol'] + "\",\"" + json['companyName'] + "\")", function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }

                });
                console.log(json['companyName']);
                res.send([JSON.stringify(iCompanyJsonModel)]);
            }
        });
    }
};


router.get('/:id', function(req, res, next) {
    var connection = mysql.createConnection({
        host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
        user:"rtdb",
        password:"Riptide99!",
        database:"rtdb"
    });
    console.log(req.params);
    connection.connect();
    connection.query(SELECT_PREFIX_ID + "\"" + req.params.id + "\"", function (error, results, fields) {
        if (error) {console.log(error);}
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(results[0]);
    });
    connection.end();
});


// router.get('/', function(req, res, next) {
//     console.log("/company/all hit");
//
//     var connection = mysql.createConnection({
//         host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
//         user:"rtdb",
//         password:"Riptide99!",
//         database:"rtdb"
//     });
//
//     connection.connect();
//     var fullQuery = "SELECT * FROM company";
//     console.log("fullQuery: " + fullQuery);
//
//     connection.query(fullQuery, function (error, results, fields) {
//         if (error) throw error;
//         if (results) {
//             console.log('The name is: ', results[0].name);
//         }
//         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.send(results);
//     });
//
//     connection.end();
// });

module.exports = router;
