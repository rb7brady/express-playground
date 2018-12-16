var express = require('express');
var https = require("https");
var request = require('request');
var mysql      = require('mysql');

var router = express.Router();
const SELECT_PREFIX = "SELECT * FROM company WHERE SYMBOL LIKE ";

router.get('/iex/:symbol', mysqlTest, iexTest);
var connection = mysql.createConnection({
    host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
    user:"rtdb",
    password:"Riptide99!",
    database:"rtdb"
});
// router.get('/iex/:id', function(res, req, mysqlTest, iexTest) {
//     if (res.length ===0 ) {
//         next();
//     }
//     // console.log('Modular Test Router Hit');
//     // var mysqlCon = mysql.createConnection({
//     //     host: "rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
//     //     user: "rtdb",
//     //     password: "Riptide99!",
//     //     database: "rtdb"
//     // });
//     // var mysqlResponse = mysqlCon.query(SELECT_PREFIX + "\"%" + req.params.symbol + "%\"");
//     // mysqlResponse.
//     //var iex = require('./../services/rest/iex');
//
//     res.send('test');
// });

function mysqlTest(req, res, next) {
    var connection = mysql.createConnection({
        host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
        user:"rtdb",
        password:"Riptide99!",
        database:"rtdb"
    });

    connection.connect();
    connection.query('select * from company where symbol like \"' + req.params.symbol + '\"', function (error, results) {
        if (error) {
            //console.log(error);
            console.log("ERROR IN MYSQL");
            next();}
        if (results.length ===0) {
            console.log("LENGTH IS ZERO");
           // connection.end();
            next();
        }
        //if (!error) {console.log('Query returned ' + results.length + 'rows.');}
        //if (fields) {console.log(fields);}
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (results.length > 0) {
            console.log('The solution is: ', results[0].name);
            res.send(JSON.stringify(results[0]));
        }
    });
    if (res.length ===0 ) {
        next();
    }
}
function iexTest(req, res) {
    request('https://api.iextrading.com/1.0/stock/' + req.params.symbol + '/company', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (!error) {
            var json = JSON.parse(body);
            var iCompanyJsonModel = {};
            iCompanyJsonModel.name = json['companyName'];
            iCompanyJsonModel.symbol = json['symbol'];

            // connection.query("INSERT INTO company (symbol, name) values (\"" + json['symbol'] + "\",\"" + json['companyName'] + "\")", function (error, results, fields) {
            //     if (error) {
            //         console.log(error);
            //     }
            //
            // });
            console.log(json['companyName']);
            console.log(iCompanyJsonModel.toJSON);
            console.log(JSON.stringify(iCompanyJsonModel));

            res.send(iCompanyJsonModel);
            connection.query("INSERT INTO company (symbol, name) values (\"" + json['symbol'] + "\",\"" + json['companyName'] + "\")", function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
}
module.exports = router;