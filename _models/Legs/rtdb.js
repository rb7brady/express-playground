const sqlUtil = require('../../_helpers/sqlUtil');
const mysqlColumn = require('../../_helpers/_metadata/mysqlColumn');
class Leg {
    setId(value){
        this.id=
            {
                value:value,
                meta: new mysqlColumn("id","int","NULL","10","0")
            }
    }
    setOption(value){
        this._option=
            {
                value:value,
                meta: new mysqlColumn("_option","varchar","255","NULL","NULL")
            }
    }
    setSide(value){
        this.side=
            {
                value:value,
                meta: new mysqlColumn("side","varchar","25","NULL","NULL")
            }
    }
    setPosition_effect(value){
        this.position_effect=
            {
                value:value,
                meta: new mysqlColumn("position_effect","varchar","25","NULL","NULL")
            }
    }
    setRh_id(value){
        this.rh_id=
            {
                value:value,
                meta: new mysqlColumn("rh_id","varchar","36","NULL","NULL")
            }
    }
    setOoid(value){
        this.ooid=
            {
                value:value,
                meta: new mysqlColumn("ooid","varchar","36","NULL","NULL")
            }
    }
    setRatio_quantity(value){
        this.ratio_quantity=
            {
                value:value,
                meta: new mysqlColumn("ratio_quantity","decimal","NULL","10","0")
            }
    }

    buildInsertQuery() {
        var query = 'INSERT INTO leg ';
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
module.exports = Leg;