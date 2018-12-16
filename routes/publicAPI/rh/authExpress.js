var express = require('express');
var request = require('request');
var router = express.Router();

// router.post('/login', function(req, res, next) {
//     console.log(JSON.stringify(req.body));
//
//     var iUserJsonModel = {};
//     var client_id = 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS';
//     var grant_type = 'password';
//
//     console.log('-------------');
//     console.log(JSON.stringify(req.params.username));
//     console.log(JSON.stringify(req.params.password));
//     console.log('-------------');
//
//     iUserJsonModel.username = req.body.username;
//     iUserJsonModel.password = req.body.password;
//     iUserJsonModel.grant_type = grant_type;
//     iUserJsonModel.client_id = client_id;
//
//     var options = {
//         uri: 'https://api.robinhood.com/oauth2/token/',
//         body: JSON.stringify(iUserJsonModel),
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     console.log(options.body);
//
//     request('https://api.robinhood.com/oauth2/token/',options, function (error, response, body) {
//         if (!error) {
//             res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//             res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//             res.setHeader('Access-Control-Allow-Origin', '*');
//             res.send(JSON.stringify(response));
//         } else {
//             res.send(JSON.stringify(error));
//         }
//     })
// });
router.get('/login', function(req, res, next) {

});
module.exports = router;