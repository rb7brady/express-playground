
var express = require('express');
var mysql      = require('mysql');
var config = require('../../config');
var request = require('request');
var iex = require('../../services/rest/iex');
var lookup = require('../../services/db/lookup');
var connector = require('../../services/db/rtdbConnector');
const getCompanies = require("../../services/db/lookup").getCompanies;

//
// var pool      =    mysql.createPool({
//     connectionLimit : 10,
//     host:"rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
//     user:"rtdb",
//     password:"Riptide99!",
//     database:"rtdb",
//     debug    :  false
// });

var router = express.Router();


//const SELECT_PREFIX = "SELECT * FROM company WHERE SYMBOL LIKE ";



router.get('/company/:symbol', lookupMysql, function(callback){
    pool.getConnection(function(err,connection){
        if (err) {
            callback(true);
            return;
        }
        connection.query(query,function(err,results){
            connection.release();
            if(!err) {
                callback(false, {rows: results});
            }
            // check null for results here
        });
        connection.on('error', function(err) {
            callback(true);
            return;
        });
    });
}
);

function handleHttpRequest(req, res) {
    if (lookupMysql())

    if (req.params.symbol === '1') {
        myTestFunction(res,callback1);
    }
    if (req.params.symbol === '2') {
        myTestFunction(res,callback2);
    }

    if (req.params.symbol === '3') {
        myTestFunctionQuery(res,sqlTest);
    }
}

function handleMysqlResposne(res, body) {
    mysql.createQuery('select * from company')
}

function handleIexResponse(res, body) {

}
sendHttpResponse()
function lookupMysql(res, searchTerm) {
    var query = 'select * from company'; //search term
    res.send();
    sendHttpResponse(res, getCompanies);
    // getCompanies(query, function sendHttpResponse(result, body) {
    //     res.send(body);
    // });
}

function lookupIex(res, searchTerm) {

}



function sendHttpResponse(res, body) {
    //res.send(body);
}
function myTestFunction(res, callbackFunction) {
    callbackFunction(res);
}
function myTestFunctionQuery(res, callbackFunction) {
    callbackFunction('SELECT * FROM company', res);
}

function callback1(res) {
    console.log('1');
    res.send('1');
}

function callback2(res) {
    console.log('2');
    res.send('2');
}

function sqlTest(query,res) {
    //var queryString = 'SELECT * FROM company WHERE symbol LIKE \"' + query + '\"';
    console.log(query);
    pool.getConnection(function(err,connection){
        if (err) {
            console.log('error thrown');
            //callback(true);
            return;
        }
        connection.query(query,function(err,results){
            console.log('query');
            connection.release();
            if(err) {
                console.log(err);
            }
            if(!err) {
                console.log('callback being called');
                res.send(results);
                //callback(false, {rows: results});
            }
            // check null for results here
        });
        connection.on('error', function(err) {
            //callback(true);
            return;
        });
    });
};


// function handleHttpRequest(req, res, next) {
//     if (req.params.symbol === 'test') {
//
//     }
//     if (req.params.symbol) {
//         lookup.getCompanies(req.params.symbol, doSomething);
//         var row = lookup.getCompanies(req.params.symbol, doSomething);
//
//         //res.send(lookup.getCompanies(req.params.symbol, doSomething));
//         //res.send('test');
//     }
// }

function doSomething(err,res) {
    if (!err) {
        //console.log( JSON.stringify(res.rows[0]));
        res.send(res.rows[0]);
        //return res;
    }
   /// return null;
}

function mysqlTest(queryString) {

    console.log(config.mysql);
    lookup.getCompanies('queryString', function(err,results){
        if(err) {
            console.log('error');
        }
        if(!err) {
            console.log('no error');
        }
        console.log(results[0]);
        // res.send(results);

    });
    console.log('end of method');
}

function customCallback(err,res) {
    console.log('customCallback called');

}
function iexTest() {

}

module.exports = router;