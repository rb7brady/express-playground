class mysqlColumn {
    constructor(name,type,max,precision,scale){
        this.name = name;
        this.type = type;
        this.max = max;
        this.precision = precision;
        this.scale = scale;
    }
}
function test() {

}

var mysqlDef = {
    test:"TEST"
}

module.exports = mysqlColumn;