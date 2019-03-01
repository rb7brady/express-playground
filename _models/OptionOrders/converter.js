var OrderOption = require('./rtdb')
var LegConverter = require('../Legs/converter');
var rtdbPool = require('../../_helpers/rtdbPool').pool;

class Converter {
    static convertToDb(result) {
        let myOrder = new OrderOption();
        myOrder.setPrice(result.price);
        myOrder.setCreated_at(result.created_at);
        myOrder.setUpdated_at(result.updated_at);
        myOrder.setQuantity(result.quantity);
        myOrder.setResponse_category(result.response_category);
        myOrder.setType(result.type);
        myOrder.setDirection(result.direction);
        myOrder.setState(result.state);
        myOrder.setCanceled_quantity(result.canceled_quantity);
        myOrder.setPremium(result.premium);
        myOrder.setPending_quantity(result.pending_quantity);
        myOrder.setProcessed_quantity(result.processed_quantity);
        myOrder.setClosing_strategy(result.closing_strategy);
        myOrder.setProcessed_premium(result.processed_premium);
        myOrder.setCanceled_quantity(result.canceled_quantity);
        myOrder.setOpening_strategy(result.opening_strategy);
        myOrder.setCanceled_quantity(result.canceled_quantity);
        myOrder.setCanceled_quantity(result.canceled_quantity);
        myOrder.setChain_id(result.chain_id);
        myOrder.setSymbol(result.chain_symbol);
        myOrder.setRef_id(result.ref_id);

        //const orderConn = mysql.createConnection(Connections.getRtdbConfig());
        //orderConn.connect();
        rtdbPool.getConnection(function(err,conn){
            conn.query(myOrder.buildInsertQuery(), function (error, response) {
                if (error) {console.log(error.toString());}
                if (!error && response.insertId) {
                    if (result.legs != null && result.legs.length > 0) {
                        for (var j = 0; j < result.legs.length; j++) {
                            LegConverter.convertToDb(result.legs[j], response.insertId);
                        }
                    }
                }
            });
            conn.release();

        });
       // orderConn.end();
        return myOrder;
    }
}

module.exports = Converter;
