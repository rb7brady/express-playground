var OrderOption = require('./rtdb')
var LegConverter = require('../Legs/converter');
var Connections = require('../Connection');
var mysql      = require('mysql');

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

        const orderConn = mysql.createConnection(Connections.getRtdbConfig());
        orderConn.connect();
        orderConn.query(myOrder.buildInsertQuery(), function (error, response) {
            if (!error && response.insertId) {
                for (var j = 0; j < result.legs.length; j++) {
                    console.log('inserting leg for order - ' + response.insertId + 'leg ' + j + ' of ' + result.legs.length);
                    LegConverter.convertToDb(result.legs[j], response.insertId);
                }
            }
        });

        orderConn.end();
        return myOrder;
    }
}

module.exports = Converter;