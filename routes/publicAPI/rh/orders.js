
var Account = require('../../../_models/Account');
var Order = require('../../../_models/Order');

var Connections = require('../../../_models/Connection');
var express = require('express');
var request = require('request');
var router = express.Router();
var mysql      = require('mysql');


router.get('/orders', function(req, res, next) {
    console.log('Entering Orders');
    const connection = mysql.createConnection(Connections.getRtdbConfig());
    let myAccount = new Account('rb7brady@gmail.com', '@92Hatbf1234');
    let myOrder = new Order();
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
            // request('https://api.robinhood.com/orders/', options, function (error, response, body) {
            //     if (!error) {
            //         let orders = JSON.parse(body);
            //         for (i = 0; i < orders.results.length; i++) { //loop through order page.
            //             let myOrder = new Order();
            //             myOrder.setPrice(orders.results[i].price);
            //             myOrder.setCreatedAt(orders.results[i].created_at);
            //             myOrder.setUpdatedAt(orders.results[i].updated_at);
            //             myOrder.setCumulativeQuantity(orders.results[i].cumulative_quantity);
            //             myOrder.setInstrument(orders.results[i].instrument);
            //             myOrder.setRejectReason(orders.results[i].reject_reason);
            //             myOrder.setQuantity(orders.results[i].quantity);
            //             myOrder.setResponseCategory(orders.results[i].response_category);
            //             myOrder.setType(orders.results[i].type);
            //             myOrder.setState(orders.results[i].state);
            //
            //             request(orders.results[i].instrument, options, function (error, response, body) {//fetch instrument data.
            //                 if (!error) {
            //                     let json = JSON.parse(body);
            //                     myOrder.setSymbol(json.symbol);
            //                     console.log(myOrder.getInsertQuery());
            //                     connection.query(myOrder.getInsertQuery(), function(error) { //perform insert.
            //                         if (error) {console.log(error.sqlMessage);} //Error handling on INSERT.
            //                     });
            //                 }
            //             });
            //             if (orders.next != null) {
            //                 console.log(orders.next);
            //                 request(orders.next, options, function (error, response, body) {//fetch instrument data.
            //                     if (!error) {
            //                         let json = JSON.parse(body);
            //                         myOrder.setSymbol(json.symbol);
            //                         console.log(myOrder.getInsertQuery());
            //                         connection.query(myOrder.getInsertQuery(), function (error) { //perform insert.
            //                             if (error) {
            //                                 console.log(error.sqlMessage);
            //                             } //Error handling on INSERT.
            //                         });
            //                     }
            //                 });
            //             }
            //         }
            //         res.send(JSON.stringify(orders.results));
            //     } else {
            //         console.log('ERROR');
            //     }
            // })
        }
    })
});

function queryOrdersPage(url,options,connection) {
    request(url, options, function (error, response, body) {
        if (!error) {
            let orders = JSON.parse(body);
            if (orders.results) {
                for (i = 0; i < orders.results.length; i++) { //loop through order page.
                    let myOrder = new Order();
                    myOrder.setPrice(orders.results[i].price);
                    myOrder.setCreatedAt(orders.results[i].created_at);
                    myOrder.setUpdatedAt(orders.results[i].updated_at);
                    myOrder.setCumulativeQuantity(orders.results[i].cumulative_quantity);
                    myOrder.setInstrument(orders.results[i].instrument);
                    myOrder.setRejectReason(orders.results[i].reject_reason);
                    myOrder.setQuantity(orders.results[i].quantity);
                    myOrder.setResponseCategory(orders.results[i].response_category);
                    myOrder.setType(orders.results[i].type);
                    myOrder.setState(orders.results[i].state);
                    myOrder.setSide(orders.results[i].side);
                    myOrder.setRHID(orders.results[i].id);
                    request(orders.results[i].instrument, options, function (error, response, body) {//fetch instrument data.
                        if (!error) {
                            let json = JSON.parse(body);
                            myOrder.setSymbol(json.symbol);
                            connection.query(myOrder.getInsertQuery(), function (error) { //perform insert.
                                if (error) {console.log('[ERROR] '+ error.sqlMessage);} //Error handling on INSERT.
                            });
                        }
                    });
                }
                if (orders.results.length === 100) {
                    queryOrdersPage(orders.next, options, connection);
                }
            }
            //res.send(JSON.stringify(orders.results));
        } else {
            console.log('ERROR');
        }
    })
}


module.exports = router;