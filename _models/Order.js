
class Order {

    setSymbol(s) {
        this.symbol = s;
    }
    setPrice(p) {
        this.price = p;
    }
    setInstrument(i) {
        this.instrument = i;
    }
    setUpdatedAt(a) {
        this.updatedAt = a;
    }
    setCreatedAt(c) {
        this.createdAt = c;
    }
    setQuantity(q) {
        this.quantity = q;
    }
    setState(s) {
        this.state = s;
    }
    setSide(s) {
        this.side = s;
    }
    setType(t) {
        this.type = t;
    }
    setRejectReason(r) {
        this.rejectReason = r;
    }
    setResponseCategory(r) {
        this.responseCategory = r;
    }
    setCumulativeQuantity(c) {
        this.cumulativeQuantity = c;
    }
    setRHID(r) {
        this.RHID = r;
    }

    getInsertQuery() {
        return 'INSERT INTO order_robinhood (symbol,instrument,_state,_type,reject_reason,response_category,side,quantity,price,cumulative_quantity,created_at,updated_at,rh_id_bin) values ('
            + Order.appendStringValue(this.symbol)+','
            + Order.appendStringValue(this.instrument)+','
            + Order.appendStringValue(this.state)+','
            + Order.appendStringValue(this.type)+','
            + Order.appendStringValue(this.rejectReason)+','
            + Order.appendStringValue(this.responseCategory)+','
            + Order.appendStringValue(this.side)+','
            + this.quantity+','
            + this.price+','
            + this.cumulativeQuantity+','
            + Order.appendStringValue(this.createdAt)+','
            + Order.appendStringValue(this.updatedAt)+','
            + 'unhex(replace(\"'+this.RHID+'\",\"-\",\"\"))'
            + ')';
    }

    static appendStringValue(val) {
        if (val !== null) {
            return '\"' + val + '\"';
        }
        else return val;
    }

}
module.exports = Order;