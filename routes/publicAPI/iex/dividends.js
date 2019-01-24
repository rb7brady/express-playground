
var Account = require('../../../_models/Account');
var DivConverter = require('../../../_models/Dividends/converter');

var Dividend = require('../../../_models/Dividends/rtdb');

var Connections = require('../../../_models/Connection');
var express = require('express');
var request = require('request');
var router = express.Router();
var mysql      = require('mysql');
router.get('/:symbol', mysqlTest, divTest);


//router.get('/:symbol', function(req, res, next) {
function mysqlTest(req,res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('Entering Dividends');
    const connection = mysql.createConnection(Connections.getRtdbConfig());
    connection.connect();
    var options = {
        method: 'GET',
        url: 'https://api.iextrading.com/1.0/stock/' + req.params.symbol + '/dividends/5y',
    };
    //TODO: Move query to object class constants. Need to implement data binding.
    connection.query('select max(c.id) as \'id\', count(cd.id) as \'count\' from company c left outer join company_dividends cd on cd.company_id = c.id where lower(c.symbol) like  lower(\"' + req.params.symbol + '\")', function(error, results) {
        if (results.length > 0 && results[0].id) {
            if (results[0].count === 0 ) {
                console.log('Result: ' + results[0].count);
                var companyId = results[0].id;

                request('https://api.iextrading.com/1.0/stock/' + req.params.symbol + '/dividends/5y', options, function (error, response, body) {
                    if (!error) {
                        let divs = JSON.parse(body);

                        if (divs) {
                            for (i = 0; i < divs.length; i++) { //loop through order page.
                                DivConverter.convertToDb(divs[i], companyId);
                            }
                            next();

                        }
                    } else {
                        console.log('ERROR');
                    }
                });
            } else { next (); } // if dividends do exist in the database.
            //Get company from DB
            //If company Exists, use parent ID later
            //query IEX for dividend
            //if divs exist insert into db.
            //queryDivsPage('https://api.iextrading.com/1.0/stock/' + req.params.symbol + '/dividends/5y',options,companyId);
            connection.end();

        } else {
            console.log('No ID found');
            //if no company exists in db...
            //look up company on iex and insert into db
            //keep id
            //look up divdend on iex
            //insert into db
            next();
        }
    });

}

function divTest(req, res) {
    const connection = mysql.createConnection(Connections.getRtdbConfig());
    connection.connect();
    connection.query('select cd.* from company_dividends cd join company c on cd.company_id = c.id where lower(c.symbol) like lower(\"' + req.params.symbol + '\") order by cd.declared_date desc', function(error, results) {
        if (error) {
            console.log('error');
        } if (results && results.length > 0) {
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(results);
        }
    });
}

function queryDivsPage(url,options, parentId) {
    request(url, options, function (error, response, body) {
        if (!error) {
            let divs = JSON.parse(body);
            if (divs.results) {
                for (i = 0; i < results.length; i++) { //loop through order page.
                    DivConverter.convertToDb(divs.results[i], parentId);
                }
            }
        } else {
            console.log('ERROR');
        }
    })
}

module.exports = router;
