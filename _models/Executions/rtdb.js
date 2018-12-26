const sqlUtil = require('../../_helpers/sqlUtil');
const mysqlColumn = require('../../_helpers/_metadata/mysqlColumn');
class Execution {
    setId(value){
        this.id=
            {
                value:value,
                meta: new mysqlColumn("id","int","NULL","10","0")
            }
    }                                              
 setTimestamp(value){
        this._timestamp=
            {
                value:value,
                meta: new mysqlColumn("_timestamp","timestamp","NULL","NULL","NULL")
            }
    }            
 setPrice(value){
        this.price=
            {
                value:value,
                meta: new mysqlColumn("price","double","NULL","22","NULL")
            }
    }                               
 setSettlement_date(value){
        this.settlement_date=
            {
                value:value,
                meta: new mysqlColumn("settlement_date","date","NULL","NULL","NULL")
            }
    } 
 setRh_id(value){
        this.rh_id=
            {
                value:value,
                meta: new mysqlColumn("rh_id","varchar","36","NULL","NULL")
            }
    }                              
 setLeg_id(value){
        this.leg_id=
            {
                value:value,
                meta: new mysqlColumn("leg_id","varchar","36","NULL","NULL")
            }
    }                           
 setQuantity(value){
        this.quantity=
            {
                value:value,
                meta: new mysqlColumn("quantity","double","NULL","22","NULL")
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
        var query = 'INSERT INTO execution ';
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
module.exports = Execution;