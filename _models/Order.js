const sqlUtil = require('../_helpers/sqlUtil');
const mysqlColumn = require('../_helpers/_metadata/mysqlColumn');
class Order {

    setRh_id_bin(value){
        this.rh_id_bin=
            {
                value:value,
                meta: new mysqlColumn("rh_id_bin","binary","16","NULL","NULL")
            }
    }
    setAccount_id(value){
        this.account_id=
            {
                value:value,
                meta: new mysqlColumn("account_id","int","NULL","10","0")
            }
    }
    setSymbol(value){
        this.symbol=
            {
                value:value,
                meta: new mysqlColumn("symbol","varchar","5","NULL","NULL")
            }
    }
    setQuantity(value){
        this.quantity=
            {
                value:value,
                meta: new mysqlColumn("quantity","double","NULL","22","NULL")
            }
    }
    setPrice(value){
        this.price=
            {
                value:value,
                meta: new mysqlColumn("price","double","NULL","22","NULL")
            }
    }
    setSide(value){
        this.side=
            {
                value:value,
                meta: new mysqlColumn("side","varchar","25","NULL","NULL")
            }
    }
    setState(value){
        this.state=
            {
                value:value,
                meta: new mysqlColumn("_state","varchar","50","NULL","NULL")
            }
    }
    setType(value){
        this.type=
            {
                value:value,
                meta: new mysqlColumn("_type","varchar","35","NULL","NULL")
            }
    }
    setReject_reason(value){
        this.reject_reason=
            {
                value:value,
                meta: new mysqlColumn("reject_reason","varchar","50","NULL","NULL")
            }
    }
    setResponse_category(value){
        this.response_category=
            {
                value:value,
                meta: new mysqlColumn("response_category","varchar","50","NULL","NULL")
            }
    }
    setCumulative_quantity(value){
        this.cumulative_quantity=
            {
                value:value,
                meta: new mysqlColumn("cumulative_quantity","double","NULL","22","NULL")
            }
    }
    setFees(value){
        this.fees=
            {
                value:value,
                meta: new mysqlColumn("fees","double","NULL","22","NULL")
            }
    }
    setTrigger(value){
        this.trigger=
            {
                value:value,
                meta: new mysqlColumn("_trigger","varchar","50","NULL","NULL")
            }
    }
    setCreated_at(value){
        this.created_at=
            {
                value:value,
                meta: new mysqlColumn("created_at","timestamp","NULL","NULL","NULL")
            }
    }
    setUpdated_at(value){
        this.updated_at=
            {
                value:value,
                meta: new mysqlColumn("updated_at","timestamp","NULL","NULL","NULL")
            }
    }
    setLast_transaction_at(value){
        this.last_transaction_at=
            {
                value:value,
                meta: new mysqlColumn("last_transaction_at","timestamp","NULL","NULL","NULL")
            }
    }
    setExtended_hours(value){
        this.extended_hours=
            {
                value:value,
                meta: new mysqlColumn("extended_hours","tinyint","NULL","3","0")
            }
    }
    setInstrument(value){
        this.instrument=
            {
                value:value,
                meta: new mysqlColumn("instrument","varchar","255","NULL","NULL")
            }
    }
    setSource(value){
        this.source=
            {
                value:value,
                meta: new mysqlColumn("source","int","NULL","10","0")
            }
    }
    buildInsertQuery() {
        var query = 'INSERT INTO order_robinhood ';
        var values = 'VALUES (';
        var columns = '(';
        var i = 0;
        for(var name in this) {
            i++;
            columns += this[name].meta.name;
            if (this[name].meta.type === 'varchar') {
                values += sqlUtil.appendStringValue(this[name].value)
            } else if (this[name].meta.type === 'binary') {
                values += sqlUtil.appendHexID(this[name].value)
            } else {
                values += sqlUtil.appendStringValue(this[name].value)
            }
            if (i < Object.keys(this).length) {
                values += ',';
                columns += ',';
            }
        }
        values += ' ) ';
        columns += ' ) ';
        return query + columns+ values;
    }
}
module.exports = Order;