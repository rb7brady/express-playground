var Leg = require('./rtdb');
var Connections = require('../Connection');
var mysql      = require('mysql');

class Converter {
    static convertToDb(execution, parentId) {
        let myExecution = new Leg();
        myExecution.setLeg_id(parentId);
        myExecution.setPrice(execution.price);
        myExecution.setQuantity(execution.quantity);
        myExecution.setSettlement_date(execution.settlement_date);
        myExecution.setTimestamp(execution.timestamp);
        myExecution.setRh_id(execution.id);

        const execConn = mysql.createConnection(Connections.getRtdbConfig());
        execConn.connect();
        execConn.query(myExecution.buildInsertQuery(), function (error, response) {
            if (error) {console.log("[ERROR]");}
            if (!error) {}
        });
        execConn.end();
        return myExecution;
    }
}

module.exports = Converter;