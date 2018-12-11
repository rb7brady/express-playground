var express = require('express');
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
router.get('/search', function(req, res, next) {
    var request = https.request(options, function (res) {

        res.on('data', function (chunk) {
            console.log(res.statusCode);
            return chunk;
        });
    });
    request.on('error', function (e) {
        console.log('ERROR:: ' + e.message);
    });
});

module.exports = router;