class sqlUtil {
    static appendStringValue(val) {
        if (val !== null) {return '\"' + val + '\"';} else return val;
    }
    static appendHexID(val){
        if (val !== null) {return 'unhex(replace(\"'+val+'\",\"-\",\"\"))';} else {return val;}
    }
    static buildInsertPrefix(tablename) {
        return 'INSERT INTO ' + tablename;
    }

}

module.exports = sqlUtil;