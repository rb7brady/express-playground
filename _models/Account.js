
class Account {
    constructor(u,p) {
        this.username = u;
        this.password = p;
    }
    setToken(t) {
        this.token = t;
    }
    getToken() {
        return this.token;
    }
}
module.exports = Account;