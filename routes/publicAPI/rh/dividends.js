
var Account = require('../../../_models/Account');
var OptionOrderConverter = require('../../../_models/OptionOrders/converter');
var express = require('express');
var request = require('request');
var router = express.Router();
var rtdbPool = require('../../../_helpers/rtdbPool').pool;


router.get('/dividendsRefresh', function(req, res, next) {
    console.log('Entering Dividends');
    let myAccount = new Account('rb7brady@gmail.com', '');
    rtdbPool.getConnection(function(err,conn) {
        conn.query('select * from account where username like \"' + myAccount.username + '\"', function (error, results) {
            if (results.length > 0) {
                myAccount.setToken(results[0].token);
                var options = {
                    method: 'GET',
                    url: 'https://api.robinhood.com/dividends/',
                    headers:
                        {
                            authorization: 'Bearer ' + myAccount.getToken()
                        }
                };
                queryOrdersPage('https://api.robinhood.com/dividends/', options);
                res.send('Complete');
            }
        });
        conn.release();
    });
});

function queryOrdersPage(url,options) {
    request(url, options, function (error, response, body) {
        if (!error) {
            let divs = JSON.parse(body);
            if (divs.results) {
                for (i = 0; i < divs.results.length; i++) { //loop through order page.
            if (divs.results[i] != null) {
                OptionOrderConverter.convertToDb(divs.results[i]);
                    }f
                }
                if (orders.results.length === 100) {
                    console.log("Loading next page: " + divs.next);
                    queryOrdersPage(divs.next, options);
                }
            }
        } else {
            console.log(error.toString());
        }
    })
}



module.exports = router;
