var Leg = require('./rtdb');
var Connections = require('../Connection');
var ExecutionConverter = require('../Executions/converter');
var mysql      = require('mysql');

class Converter {

    static convertToDb(leg, parentId) {
        let myLeg = new Leg();
        myLeg.setOoid(parentId);
        myLeg.setOption(leg.option);
        myLeg.setSide(leg.side);
        myLeg.setPosition_effect(leg.position_effect);
        myLeg.setRatio_quantity(leg.ratio_quantity);
        myLeg.setRh_id(leg.id);

        const legConn = mysql.createConnection(Connections.getRtdbConfig());
        legConn.connect();
        legConn.query(myLeg.buildInsertQuery(), function (error, response) {
            if (error) {console.log("[ERROR]");}
            if (!error && response.insertId) {
                for (var j = 0; j < leg.executions.length; j++) {
                    console.log('inserting execution for leg - ' + response.insertId + 'exec ' + j + ' of ' + leg.executions.length);
                    ExecutionConverter.convertToDb(leg.executions[j], response.insertId);
                }
            }
        });
        legConn.end();
        return myLeg;
    }
}

module.exports = Converter;