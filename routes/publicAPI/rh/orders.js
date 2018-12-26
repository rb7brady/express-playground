var Account = require('../../../_models/Account');
var OrderConverter = require('../../../_models/Orders/converter');

var Connections = require('../../../_models/Connection');
var express = require('express');
var request = require('request');
var router = express.Router();
var mysql      = require('mysql');


router.get('/orders', function(req, res, next) {
    console.log('Entering Orders');
    const connection = mysql.createConnection(Connections.getRtdbConfig());
    let myAccount = new Account('rb7brady@gmail.com', '');
    connection.connect();
    connection.query('select * from account where username like \"' + myAccount.username + '\"', function (error, results) {
        if (results.length > 0) {
            myAccount.setToken(results[0].token);
            var options = {
                method: 'GET',
                url: 'https://api.robinhood.com/orders/',
                headers:
                    {
                        authorization: 'Bearer ' + myAccount.getToken()
                    }
            };
            queryOrdersPage('https://api.robinhood.com/orders/',options,connection);
            res.send('Complete');
        }
    })
});

function queryOrdersPage(url,options,connection) {
    request(url, options, function (error, response, body) {
        if (!error) {
            let orders = JSON.parse(body);
            if (orders.results) {
                for (i = 0; i < orders.results.length; i++) { //loop through order page.
                    let myOrder = OrderConverter(orders.results[i]);
                    request(orders.results[i].instrument, options, function (error, response, body) {//fetch instrument data.
                        if (!error) {
                            let json = JSON.parse(body);
                            myOrder.setSymbol(json.symbol);
                            connection.query(myOrder.buildInsertQuery(), function (error) { //perform insert.
                                if (error) {console.log('[ERROR] '+ error.sqlMessage);} //Error handling on INSERT.
                            });
                        }
                    });
                }
                if (orders.results.length === 100) {
                    queryOrdersPage(orders.next, options, connection);
                }
            }
        } else {
            console.log('ERROR');
        }
    })
}


module.exports = router;