
var Account = require('../../../_models/Account');
var Leg = require('../../../_models/Leg');

var Connections = require('../../../_models/Connection');
var express = require('express');
var request = require('request');
var router = express.Router();
var mysql      = require('mysql');


router.get('/options/', function(req, res, next) {
    console.log('Entering Orders');
    const connection = mysql.createConnection(Connections.getRtdbConfig());
    let myAccount = new Account('rb7brady@gmail.com', '');
    connection.connect();
    connection.query('select * from account where username like \"' + myAccount.username + '\"', function (error, results) {
        if (results.length > 0) {
            myAccount.setToken(results[0].token);
            var options = {
                method: 'GET',
                url: 'https://api.robinhood.com/options/orders/',
                headers:
                    {
                        authorization: 'Bearer ' + myAccount.getToken()
                    }
            };
            queryOrdersPage('https://api.robinhood.com/options/orders/',options,connection);
            res.send('Complete');
        }
    })
});

function queryChildPage(url,options,connection,parentId) {
    request(url, options, function (error, response, body) {
        if (!error) {
            let orders = JSON.parse(body);
            if (orders.results) {
                for (i = 0; i < orders.results.length; i++) { //loop through order page.
                    let myLeg = new Leg();
                    myLeg.setOoid(parentId);
                    myLeg.setOption(orders.results[i]._option);
                    myLeg.setPosition_effect(orders.results[i].position_effect);
                    myLeg.setRatio_quantity(orders.results[i].ratio_quantity);
                    myLeg.setRh_id(orders.results[i].rh_id);
                    myLeg.setSide(orders.results[i].side);
                    connection.query(myLeg.buildInsertQuery(), function (error) { //perform insert.
                        if (error) {console.log('[ERROR] '+ error.sqlMessage);} //Error handling on INSERT.
                    });

                }
            }
        } else {
            console.log('ERROR');
        }
    })
}


module.exports = router;