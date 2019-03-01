
var Account = require('../../../_models/Account');
var OptionOrderConverter = require('../../../_models/OptionOrders/converter');
var express = require('express');
var request = require('request');
var router = express.Router();
var rtdbPool = require('../../../_helpers/rtdbPool').pool;


router.get('/optionsRefresh', function(req, res, next) {
    console.log('Entering Orders');
    let myAccount = new Account('rb7brady@gmail.com', '');
    rtdbPool.getConnection(function(err,conn) {
        conn.query('select * from account where username like \"' + myAccount.username + '\"', function (error, results) {
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
                queryOrdersPage('https://api.robinhood.com/options/orders/', options);
                res.send('Complete');
            }
        });
        conn.release();
    });
});

router.get('/options', function(req, res, next) {
    console.log('Entering Orders');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');

    rtdbPool.getConnection(function(err,conn) {
        conn.query('SELECT \n' +
            'oo.symbol,\n' +
            'oo.premium,\n' +
            'oo.price,\n' +
            'oo.processed_premium,\n' +
            'oo.created_at,\n' +
            'oo.opening_strategy,\n' +
            'oo.closing_strategy\n' +
            'FROM order_option_robinhood oo \n' +
            'LEFT OUTER JOIN\n' +
            'leg ON oo.id = leg.ooid\n' +
            'LEFT OUTER JOIN\n' +
            'execution exec ON exec.leg_id = leg.id\n' +
            'ORDER BY _option,created_at;', function (error, results) {
            res.send(results);
        });
        conn.release();
    });
});

function queryOrdersPage(url,options) {
    request(url, options, function (error, response, body) {
        if (!error) {
            let orders = JSON.parse(body);
            if (orders.results) {
                for (i = 0; i < orders.results.length; i++) { //loop through order page.
                    if (orders.results[i] != null) {
                        OptionOrderConverter.convertToDb(orders.results[i]);
                    }
                }
                if (orders.results.length === 100) {
                    console.log("Loading next page: " + orders.next);
                    queryOrdersPage(orders.next, options);
                }
            }
        } else {
            console.log(error.toString());
        }
    })
}



module.exports = router;
