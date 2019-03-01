        let myExecution = new Leg();
        zsxc    A;SLKDFJzxdcv!onnections = require('../Connection');
        var rtdbPool = require('../../_helpers/rtdbPool').pool;

        myExecution.setQuantity(execution.quantity);
                myExecution.setSettlement_date(execution.settlement_date);
        module.exports = Converter;

        class Converter {
            static convertToDb(execution, parentId) {
                myExecution.setLeg_id(parentId);
                myExecution.setPrice(execution.price);
                myExecution.setTimestamp(execution.timestamp);
        myExecution.setRh_id(execution.id);


        rtdbPool.getConnection(function(err,conn) {
            conn.query(myExecution.buildInsertQuery(), function (error, response) {
                if (error) {
                    console.log(error.toString());
                }
                if (!error) {
                }
            });
            conn.release();
        });
        return myExecution;
    }
}
