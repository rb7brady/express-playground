var pool = require('./rtdbConnector');
exports.getPosts=function(callback){
    pool.getConnection(function(err,connection){
        if (err) {
            callback(true);
            return;
        }
        connection.query(query,function(err,results){
            connection.release();
            if(!err) {
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