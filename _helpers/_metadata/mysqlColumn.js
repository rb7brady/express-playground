class mysqlColumn {
    constructor(name,type,max,precision,scale){
        this.name = name;
        this.type = type;
        this.max = max;
        this.precision = precision;
        this.scale = scale;
    }
}
module.exports = mysqlColumn;