var express = require('express');
var request = require('request');
var router = express.Router();
var md5 = require('md5');
var moment = require('moment');
var constants = require('../../../_helpers/_constants/smite');

router.get('/gods', gods);
router.get('/session', session);

var godNames = {
    names:[
        "Nu Wa",
    "Aphrodite",
        "Artio"
    ]
};

var devID = "1420";
var authKey = "4F3F3D6041D24489AFB1AD5DB443E7E2";
var sessionId = "B0542222BC5A4CF5B41AED50AD9280FD";
var UTCDate = moment.utc().format('YYYYMMDDHHmmss');

function gods(req,res) {
    console.log(godNames.names[1]);
    console.log('entering gods');
    var signature = md5(devID+constants.END_POINT.GETGODS+authKey+UTCDate);

    var url = constants.BASE_URL +
        constants.END_POINT.GETGODS +
        constants.RESPONSE_TYPE.JSON + "/" +
        devID +"/"+
        signature +"/"+
        sessionId + "/" +
        UTCDate + "/" +
        constants.LANGUAGE_CODE.US
        ;

    var options = {
        method: 'GET',
        url: url
    };

    console.log(url);
    request(url, options,
        function (error, response, body) {
            if (!error) {
                console.log(body)
                let gods = JSON.parse(body);
                console.log('Number of gods: ' + gods.length);
                var output = "";
                for (i = 0; i<gods.length; i++) {
                    for (j = 0; j < godNames.names.length; j++) {
                        if (gods[i].Name == godNames.names[j]) {
                            output += gods[i].Name.toUpperCase() + "==================";
                            output += "\n\t1. " + createAbilityString(gods[i].Ability_1);
                            output += "\t2. " + createAbilityString(gods[i].Ability_2);
                            output += "\t3. " + createAbilityString(gods[i].Ability_3);
                            output += "\tULT. " + createAbilityString(gods[i].Ability_4);
                            output += "\tPASSIVE. " + createAbilityString(gods[i].Ability_5);
                        }
                    }
                }
                console.log(output);
                res.send(output);
            }
        });h
}

function createAbilityString(ability) {
    var abilityString = "";
        abilityString += ability.Summary.toUpperCase();
    if (ability.Description.itemDescription.rankitems.length > 0) {
        for (k = 0; k < ability.Description.itemDescription.rankitems.length; k++) {
            abilityString += "\n\t\t" + ability.Description.itemDescription.rankitems[k].description;
            abilityString += "\n\t\t\t" + ability.Description.itemDescription.rankitems[k].value;

        }
    }
    return abilityString += "\n";
}
//router.get('/:symbol', function(req, res, next) {
function session(req,res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('Entering SMITE');

    var signature = md5(devID+constants.END_POINT.CREATESESSION+authKey+UTCDate);
    var url = constants.BASE_URL +
        constants.END_POINT.CREATESESSION +
        constants.RESPONSE_TYPE.JSON + "/" +
        devID +"/"+
        signature +"/"+
        UTCDate;

    var options = {
        method: 'GET',
        url: url
    };
    console.log(url);
    request(url, options,
        function (error, response, body) {
        if (!error) {
            let session = JSON.parse(body);
            console.log(session.session_id);
        } else {
            console.log('ERROR');
        }
    });
}

module.exports = router;
