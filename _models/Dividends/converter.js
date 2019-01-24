var Dividend = require('./rtdb');
var Connections = require('../Connection');
var mysql      = require('mysql');

class Converter {
    static convertToDb(dividend, parentId) {
        let myDividend = new Dividend();
        myDividend.setCompany_id(parentId);
        myDividend.setAmount(dividend.amount);
        myDividend.setEx_date(dividend.exDate);
        myDividend.setDeclared_date(dividend.declaredDate);
        myDividend.setPayment_date(dividend.paymentDate);
        myDividend.setRecord_date(dividend.recordDate);

        const divConn = mysql.createConnection(Connections.getRtdbConfig());
        divConn.connect();
        divConn.query(myDividend.buildInsertQuery(), function (error, response) {
            if (error) {console.log("[ERROR]");}
            if (!error) {}
        });
        divConn.end();
        return myDividend;
    }
}

module.exports = Converter;
