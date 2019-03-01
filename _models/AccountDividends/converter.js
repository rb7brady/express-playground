var Dividend = require('./rtdb');
var rtdbPool = require('../../_helpers/rtdbPool').pool;


class Converter {
    static convertToDb(dividend, parentId) {
        let myDividend = new Dividend();
        myDividend.setCompany_id(parentId);
        myDividend.setAmount(dividend.amount);
        myDividend.setEx_date(dividend.exDate);
        myDividend.setDeclared_date(dividend.declaredDate);
        myDividend.setPayment_date(dividend.paymentDate);
        myDividend.setRecord_date(dividend.recordDate);

        rtdbPool.getConnection(function(err,conn) {
            conn.query(myDividend.buildInsertQuery(), function (error, response) {
                if (error) {console.log("[ERROR]");}
                if (!error) {}
            });
            conn.release();
        });
        return myDividend;
    }
}

module.exports = Converter;
