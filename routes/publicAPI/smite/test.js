var express = require('express');
var request = require('request');
var router = express.Router();
var md5 = require('md5');
var moment = require('moment');
var constants = require('../../../_helpers/_constants/smite');
var htmlHeaders = "<!doctype html>"+
    "<html lang=\"en\">" +
    "<head>" +
    "  <meta charset=\"utf-8\">" +
    "  <title>Smite Abilities</title>" +
    "  <meta name=\"description\" content=\"Smite Ablities\">" +
    "  <link rel=\"stylesheet\" href=\"css/styles.css?v=1.0\">" +
    "<style>tr {valign:top;}</style>" +
    "</head>" +
    "<body>";
var htmlFooters ="<script src=\"js/scripts.js\"></script></body></html>";

var godNames = {names:[]};
var devID = "1420";
var authKey = "4F3F3D6041D24489AFB1AD5DB443E7E2";
var sessionId = "B0542222BC5A4CF5B41AED50AD9280FD";
var sessionTimestamp;

router.get('/gods', gods);
router.get('/session', session);
router.get('/gods/:godNames', requestSessionHandler, function (req,res) {
    godNames.names = req.params.godNames.split(',');
    var endpoint = constants.BASE_URL + constants.END_POINT.GETGODS + constants.RESPONSE_TYPE.JSON;
    requestHandler(req, res, endpoint, function(k) {formatGodsList(res, k)});
});

function requestHandler(req, res, endpoint, callback) {
    var UTCDate = moment.utc().format('YYYYMMDDHHmmss');
    var signature = md5(devID+constants.END_POINT.GETGODS+authKey+UTCDate);
    var url = endpoint + "/" + devID +"/"+ signature +"/"+ sessionId + "/" + UTCDate + "/" + constants.LANGUAGE_CODE.US;
    request(url, function (error, response, body) {
        if (!error) {
            console.log(body);
            callback(body);
        }
    });
}

function requestSessionHandler(req, res, next) {
    if (checkSessionExpired(sessionTimestamp)) {
        var UTCDate = moment.utc().format('YYYYMMDDHHmmss');
        var signature = md5(devID + constants.END_POINT.CREATESESSION + authKey + UTCDate);
        var url = constants.BASE_URL+constants.END_POINT.CREATESESSION+constants.RESPONSE_TYPE.JSON+"/"+devID+"/"+signature+"/"+UTCDate;
        request(url,function (error, response, body) {
            if (!error) {
                let session = JSON.parse(body);
                sessionId = session.session_id;
                sessionTimestamp = moment(session.timestamp.toString(), 'MM/DD/YYYY hh:mm:ss a').add(15, "minutes");
                next();
            }
        });
    } else {
        next();
    }
}

function formatGodsList(res,body) {
    var table  = "<table style=\"width:100%\">";
    let jsonBody = JSON.parse(body);
    var output = "";
    for (i = 0; i<jsonBody.length; i++) {
        for (j = 0; j < godNames.names.length; j++) {
            if (jsonBody[i].Name == godNames.names[j]) {
                output += "<tr></tr><th colspan='6'>" + jsonBody[i].Name.toUpperCase() + "</th></tr>";
                output += "<tr valign='top'>";
                output += createAbilityString(jsonBody[i].Ability_1);
                output += createAbilityString(jsonBody[i].Ability_2);
                output += createAbilityString(jsonBody[i].Ability_3);
                output += createAbilityString(jsonBody[i].Ability_4);
                output += createAbilityString(jsonBody[i].Ability_5);
                output += "</tr>";
            }
        }
    }
    table += output + "</table>";
    res.send(htmlHeaders + table + htmlFooters);
}

function checkSessionExpired() {
    if (sessionTimestamp != null) {
        if (sessionTimestamp.isAfter(moment.utc())) {
            return false;
        }
    }
    return true;
}

function createAbilityString(ability) {
    var abilityString = "<td>";
        abilityString += ability.Summary.toUpperCase();
    if (ability.Description.itemDescription.rankitems.length > 0) {
        abilityString+="<dl>";
        for (k = 0; k < ability.Description.itemDescription.rankitems.length; k++) {
            abilityString += "<dt style='color:blue'>" + ability.Description.itemDescription.rankitems[k].description + "</dt>";
            abilityString += "<dt style='font:small-caption'>" + ability.Description.itemDescription.rankitems[k].value + "</dt>";
        }
        abilityString+="</dl>";
    }
    return abilityString += "</td>";
}

module.exports = router;
