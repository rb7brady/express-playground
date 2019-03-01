const sqlUtil = require('../../_helpers/sqlUtil');
const mysqlColumn = require('../../_helpers/_metadata/mysqlColumn');
class Dividend {
    setAmount(value){
        this.amount=
            {
                value:value,
                meta: new mysqlColumn("amount","double","NULL","22","NULL")
            }
    }
    setCompany_id(value){
        this.company_id=
            {
                value:value,
                meta: new mysqlColumn("company_id","int","NULL","10","0")
            }
}
setDeclared_date(value){
        this.declared_date=
            {
                value:value,
                meta: new mysqlColumn("declared_date","date","NULL","NULL","NULL")
            }
    }
    setEx_date(value){
        this.ex_date=
            {
                value:value,
                meta: new mysqlColumn("ex_date","date","NULL","NULL","NULL")
            }
    }
    setId(value){
        this.id=
            {
                value:value,
                meta: new mysqlColumn("id","int","NULL","10","0")
            }
    }
    setPayment_date(value){
        this.payment_date=
            {
                value:value,
                meta: new mysqlColumn("payment_date","date","NULL","NULL","NULL")
            }
    }
    setRecord_date(value){
        this.record_date=
            {
                value:value,
                meta: new mysqlColumn("record_date","date","NULL","NULL","NULL")
            }
    }

    buildInsertQuery() {
        var query = 'INSERT INTO company_dividends ';
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
        console.log(query + columns + values);
        return query + columns+ values;
    }



module.exports = Dividend;
