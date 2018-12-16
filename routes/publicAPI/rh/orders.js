var express = require('express');
var request = require('request');
var router = express.Router();
class Account {
    // username;
    // token;
    // password;

    constructor(u,p) {
        this.username = u;
        this.password = p;
    }
    setToken(t) {
        this.token = t;
    }
    getToken() {
        return this.token;
    }
}

router.get('/orders', function(req, res, next) {
    console.log('Entering Orders');

    let myAccount = new Account('rb7brady@gmail.com', '@92Hatbf1234');
    connection.connect();
    connection.query('select * from account where username like \"' + req.params.username + '\"', function (error, results) {
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
            request('https://api.robinhood.com/orders/', options, function (error, response, body) {
                if (!error) {
                    res.send(JSON.stringify(response));
                } else {
                    console.log('ERROR');
                }
            })
        }
    })
});
module.exports = router;