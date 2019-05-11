var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var Connections = require('../_models/Connection');

/* GET users listing. */

const connection = mysql.createConnection(Connections.getRtdbConfig());

router.get('/all/top', function(req, res, next) {
    console.log("/companies/all/top hit");


    var fullQuery = "SELECT * FROM company";

    connection.query(fullQuery, function (error, results, fields) {
        if (error) {console.log(error);}
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(results);
    });
});


router.get('/all', function(req, res, next) {
    console.log("/companies/all hit");
    var fullQuery = "SELECT * FROM company";
    connection.query(fullQuery, function (error, results, fields) {
        if (error) {console.log(error);}
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(results);
    });
});


module.exports = router;
