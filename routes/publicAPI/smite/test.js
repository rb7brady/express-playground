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
var sessionTimestamp;
var UTCDate = moment.utc().format('YYYYMMDDHHmmss');

var signature = md5(devID+constants.END_POINT.CREATESESSION+authKey+UTCDate);
var url = constants.BASE_URL +
    constants.END_POINT.CREATESESSION +
    constants.RESPONSE_TYPE.JSON + "/" +
    devID +"/"+
    signature +"/"+
    UTCDate;

function gods(req,res) {
    console.log("Invoking Smite API getgods Method: " +
        "\n-sessionId: " + sessionId +
        "\n-sessionTimestamp: " + sessionTimestamp);

    if(checkSessionExpired(sessionTimestamp)) {
        //sessionTimestamp = moment.utc("20191222180302", "YYYYMMDDHHmmss");
            //moment.utc().format('YYYYMMDDHHmmss');
        console.log("session expired, creating new one.");
        url = constants.BASE_URL +
            constants.END_POINT.CREATESESSION +
            constants.RESPONSE_TYPE.JSON + "/" +
            devID +"/"+
            signature +"/"+
            UTCDate;
        signature = md5(devID+constants.END_POINT.CREATESESSION+authKey+UTCDate);
        request(url, options,
            function (error, response, body) {
                if (!error) {
                    let session = JSON.parse(body);
                    console.log(session.timestamp.toString());
                    sessionId = session.session_id;
                    sessionTimestamp = moment(session.timestamp.toString(), 'MM/DD/YYYY hh:mm:ss a').add(15, "minutes");
                    console.log(sessionTimestamp.isAfter(moment.utc()));
                    console.log("New Session ID: " + sessionId);
                    console.log("New Session Expiration: " + sessionTimestamp);
                } else {
                    console.log('ERROR');
                }
            });

    }

     signature = md5(devID+constants.END_POINT.GETGODS+authKey+UTCDate);
     url = constants.BASE_URL +
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
                console.log(body);
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
        });
}

function checkSessionExpired() {
    console.log("+entering checkSessionExpired." );
    if (sessionTimestamp != null) {
        if (sessionTimestamp.isAfter(moment.utc())) {
            console.log("+Session not expired.");
            return false;
        }
    }
    return true;
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
    console.log('Entering session');

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
            sessionId = session.session_id;
            sessionTimestamp = session.timestamp.toString();
            console.log("new session id: " + sessionId);
            console.log("expires 15 minutes after: " + sessionTimestamp);
        } else {
            console.log('ERROR');
        }
        if (res != null) {
            res.send();
        }
    });
}

module.exports = router;
