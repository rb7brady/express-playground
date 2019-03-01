var Leg = require('./rtdb');
var Connections = require('../Connection');
var ExecutionConverter = require('../Executions/converter');
var rtdbPool = require('../../_helpers/rtdbPool').pool;

class Converter {

    static convertToDb(leg, parentId) {
        let myLeg = new Leg();
        myLeg.setOoid(parentId);
        myLeg.setOption(leg.option);
        myLeg.setSide(leg.side);
        myLeg.setPosition_effect(leg.position_effect);
        myLeg.setRatio_quantity(leg.ratio_quantity);
        myLeg.setRh_id(leg.id);

        rtdbPool.getConnection(function(err,conn) {
            conn.query(myLeg.buildInsertQuery(), function (error, response) {
                if (error) {
                    console.log(error.toString());
                }
                if (!error && response.insertId) {
                    if (leg.executions != null && leg.executions.length > 0) {
                        for (var k = 0; k < leg.executions.length; k++) {
                            //console.log('inserting execution for leg - ' + response.insertId + 'exec ' + j + ' of ' + leg.executions.length);
                            ExecutionConverter.convertToDb(leg.executions[k], response.insertId);
                        }
                    }
                }
            });
            conn.release();
        });
        return myLeg;
    }
}

module.exports = Converter;
