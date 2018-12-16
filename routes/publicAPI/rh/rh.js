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
//
router.post('/search/login', function(req, res, next) {

    var iUserJsonModel = {};
    var client_id = 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS';
    var grant_type = 'password';
    iUserJsonModel.username = req.body.username;
    iUserJsonModel.password = req.body.password;
    iUserJsonModel.grant_type = grant_type;
    iUserJsonModel.client_id = client_id;

    var options = {
        uri: 'https://api.robinhood.com/oauth2/token/',
        body: JSON.stringify(iUserJsonModel),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(options.body);
    request('https://api.robinhood.com/oauth2/token/',options, function (error, response, body) {
        if (!error) {
            res.send(JSON.stringify(response));
        } else {
            console.log('ERROR');
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