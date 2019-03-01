    var dbModel = require('./rtdb');
var request = require('request');
var rtdbPool = require('../../_helpers/rtdbPool').pool;

class Converter {
     static convertToDb(result) {
        let myOrder = new dbModel();
        myOrder.setSymbol(result.symbol);
        myOrder.setPrice(result.average_price);
        myOrder.setCreated_at(result.created_at);
        myOrder.setUpdated_at(result.updated_at);
        myOrder.setCumulative_quantity(result.cumulative_quantity);
        myOrder.setInstrument(result.instrument);
        myOrder.setReject_reason(result.reject_reason);
        myOrder.setQuantity(result.quantity);
        myOrder.setResponse_category(result.response_category);
        myOrder.setType(result.type);
        myOrder.setState(result.state);
        myOrder.setSide(result.side);
        myOrder.setRh_id_bin(result.id);

         request(result.instrument, function (error, response, body) {//fetch instrument data.
             if (!error) {
                 let json = JSON.parse(body);
                 myOrder.setSymbol(json.symbol);
                 rtdbPool.getConnection(function(err,conn) {
                     conn.query(myOrder.buildInsertQuery(), function (error) {
                         if (error) {console.log(error.toString());}
                         if (!error) {console.log("[SUCCESS]: Insert Successful.")}
                     });
                     conn.release();
                 });
             }
         });
        return myOrder;
    }
}
module.exports = Converter;
