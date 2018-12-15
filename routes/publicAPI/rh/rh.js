var express = require('express');
var request = require('request');
var router = express.Router();

// var options = {
//     host: 'https://api.robinhood.com/quotes',
//     port: 443,
//     path: '/',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };
router.get('/search/:login', function(req, res, next) {
    request('https://api.robinhood.com/api-token-auth/' + req.params.symbol + '/', function (error, response, body) {
        if (!error) {
            var json = JSON.parse(body);
            var iCompanyJsonModel = {};
            iCompanyJsonModel.askPrice = json['ask_price'];
            iCompanyJsonModel.symbol = json['symbol'];
            iCompanyJsonModel.bidPrice = json['bid_price'];
            // connection.query("INSERT INTO company (symbol, name) values (\"" + json['symbol'] + "\",\"" + json['companyName'] + "\")", function (error, results, fields) {
            //     if (error) {
            //         console.log(error);
            //     }
            //
            // });
            //console.log(json['companyName']);
            res.send([JSON.stringify(iCompanyJsonModel)]);
        }
    })
});
router.get('/search/:symbol', function(req, res, next) {
    request('https://api.robinhood.com/quotes/' + req.params.symbol + '/', function (error, response, body) {
        if (!error) {
            var json = JSON.parse(body);
            var iCompanyJsonModel = {};
            iCompanyJsonModel.askPrice = json['ask_price'];
            iCompanyJsonModel.symbol = json['symbol'];
            iCompanyJsonModel.bidPrice = json['bid_price'];
            // connection.query("INSERT INTO company (symbol, name) values (\"" + json['symbol'] + "\",\"" + json['companyName'] + "\")", function (error, results, fields) {
            //     if (error) {
            //         console.log(error);
            //     }
            //
            // });
            //console.log(json['companyName']);
            res.send([JSON.stringify(iCompanyJsonModel)]);
        }
    })
});



module.exports = router;