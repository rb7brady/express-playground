class RTDBConnector {
    constructor(h,u,p,d) {
        this.host = h;
        this.user = u;
        this.password = p;
        this.database = d;
    }
    getConfig() {
        return {
            host: this.host,
            user:this.user,
            password:this.password,
            database:this.database
        }
    }
}
function getRtdbConfig() {
    let myConfig = new RTDBConnector(
        "rtdb002.cppjlghnvwmg.us-east-2.rds.amazonaws.com",
        "rtdb",
        "Riptide99!",
        "rtdb"
    );
    return myConfig.getConfig();
}

module.exports = {getRtdbConfig};

