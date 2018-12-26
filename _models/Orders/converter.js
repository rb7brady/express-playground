var dbModel = require('./rtdb');

class Converter {
    convertToDb(result) {
        let myOrder = new dbModel();
        myOrder.setPrice(orders.results[i].price);
        myOrder.setCreated_at(orders.results[i].created_at);
        myOrder.setUpdated_at(orders.results[i].updated_at);
        myOrder.setCumulative_quantity(orders.results[i].cumulative_quantity);
        myOrder.setInstrument(orders.results[i].instrument);
        myOrder.setReject_reason(orders.results[i].reject_reason);
        myOrder.setQuantity(orders.results[i].quantity);
        myOrder.setResponse_category(orders.results[i].response_category);
        myOrder.setType(orders.results[i].type);
        myOrder.setState(orders.results[i].state);
        myOrder.setSide(orders.results[i].side);
        myOrder.setRh_id_bin(orders.results[i].id);
        return myOrder;
    }
}
module.exports = Converter;