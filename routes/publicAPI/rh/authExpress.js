var Account = require('../../../_models/Account');
var Connections = require('../../../_models/Connection');
var express = require('express');
var request = require('request');
var router = express.Router();
var mysql      = require('mysql');

//---------------------------------LOGIN-------------------------------------

router.get('/login', function(req, res, next) {

    var iUserJsonModel = {};
    var client_id = 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS';
    var grant_type = 'password';
    iUserJsonModel.username = 'rb7brady@gmail.com';
    iUserJsonModel.password = '@92Hatbf1234';
    iUserJsonModel.grant_type = grant_type;
    iUserJsonModel.client_id = client_id;
    console.log('debug 5756');

    var options = {
        uri: 'https://api.robinhood.com/oauth2/token/',
        body: JSON.stringify(iUserJsonModel),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let myAccount = new Account('rb7brady@gmail.com', '');

    request('https://api.robinhood.com/oauth2/token/',options, function (error, response, body) {

        if (!error) {
            var json = JSON.parse(body);
            myAccount.setToken(json.access_token);
            var connection = mysql.createConnection(Connections.getRtdbConfig());
            connection.connect();
            connection.query('update account set token = \"' + myAccount.getToken() + '\" where username = \"' + myAccount.username + '\"', function (error, results) {
                if (!error) {
                    res.send(JSON.stringify(response));
                } else {
                    console.log(error);
                    res.send(JSON.stringify(error));
                }
            });
        } else {
            console.log('ERROR');
        }
    })
});
module.exports = router;