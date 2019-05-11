var express = require('express');
var request = require('request');
var router = express.Router();
var http = require("http");
var https = require("https");
var options = {
    host: 'https://api.iextrading.com/1.0',
    port: 443,
    path: '/stock/aapl/company',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
//router.get('/search', function(req, res, next) {
//     var request = https.request(options, function (res) {
//
//         res.on('data', (chunk) => {
//             console.log(`BODY: ${chunk}`);
//         });
//         console.log(req);
//     });
//     request.on('error', function (e) {
//         console.log('ERROR:: ' + e.message);
//     });
//});

router.get('/external-api/:symbol', function(req, res){

    request('https://api.iextrading.com/1.0/stock/' + req.params.symbol + '/company', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
    });

});

module.exports = router;
