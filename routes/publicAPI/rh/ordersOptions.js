
var Account = require('../../../_models/Account');
var Order = require('../../../_models/OrderOption');

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

function queryOrdersPage(url,options,connection) {
    request(url, options, function (error, response, body) {
        if (!error) {
            let orders = JSON.parse(body);
            if (orders.results) {
                for (i = 0; i < orders.results.length; i++) { //loop through order page.
                    let myOrder = new Order();
                    myOrder.setPrice(orders.results[i].price);
                    myOrder.setCreated_at(orders.results[i].created_at);
                    myOrder.setUpdated_at(orders.results[i].updated_at);
                    myOrder.setQuantity(orders.results[i].quantity);
                    myOrder.setResponse_category(orders.results[i].response_category);
                    myOrder.setType(orders.results[i].type);
                    myOrder.setDirection(orders.results[i].direction);
                    myOrder.setState(orders.results[i].state);
                    myOrder.setCanceled_quantity(orders.results[i].canceled_quantity);
                    myOrder.setPremium(orders.results[i].premium);
                    myOrder.setPending_quantity(orders.results[i].pending_quantity);
                    myOrder.setProcessed_quantity(orders.results[i].processed_quantity);
                    myOrder.setClosing_strategy(orders.results[i].closing_strategy);
                    myOrder.setProcessed_premium(orders.results[i].processed_premium);
                    myOrder.setCanceled_quantity(orders.results[i].canceled_quantity);
                    myOrder.setCanceled_quantity(orders.results[i].canceled_quantity);
                    myOrder.setCanceled_quantity(orders.results[i].canceled_quantity);
                    myOrder.setCanceled_quantity(orders.results[i].canceled_quantity);
                    myOrder.setChain_id(orders.results[i].chain_id);
                    myOrder.setSymbol(orders.results[i].canceled_quantity);
                    myOrder.setRef_id(orders.results[i].ref_id);

                    request(orders.results[i].instrument, options, function (error, response, body) {//fetch instrument data.
                        if (!error) {
                            let json = JSON.parse(body);
                            myOrder.setSymbol(json.symbol);
                            connection.query(myOrder.buildInsertQuery(), function (error) { //perform insert.
                                if (error) {console.log('[ERROR] '+ error.sqlMessage);} //Error handling on INSERT.
                                if (!error) {
                                    if (orders.results[i].legs) {
                                        queryChildPage(url, options, connection, orders.results[i].ref_id)
                                    }
                                }
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