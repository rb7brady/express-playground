var conn = require('./rtdbConnector');
// exports.getPosts=function(callback){
//     pool.getConnection(function(err,connection){
//         if (err) {
//             callback(true);
//             return;
//         }
//         connection.query(query,function(err,results){
//             connection.release();
//             if(!err) {
//                 callback(false, {rows: results});
//             }
//             // check null for results here
//         });
//         connection.on('error', function(err) {
//             callback(true);
//             return;
//         });
//     });
// };

exports.getCompanies=function(queryString, callback){
    console.log(queryString);
    conn.getConnection(function(err,connection){
        if (err) {
            console.log('error thrown');
            callback(true);
            return;
        }
        connection.query(queryString,function(err,results){
            console.log('query');
            connection.release();
            if(err) {
                console.log(err);
            }
            if(!err) {
                console.log('callback being called');
                callback(false, {rows: results});
            }
            // check null for results here
        });
        connection.on('error', function(err) {
            callback(true);
            return;
        });
    });
};
module.exports = exports;
