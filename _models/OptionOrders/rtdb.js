const sqlUtil = require('../../_helpers/sqlUtil');
const mysqlColumn = require('../../_helpers/_metadata/mysqlColumn');

class OrderOption
{
    setId(value){
        this.id=
            {
                value:value,
                meta: new mysqlColumn("id","int","NULL","10","0")
            }
    }
    setAccount_id(value)
    {
        this.account_id =
            {
                value: value,
                meta: new mysqlColumn("account_id", "int", "NULL", "10", "0")
            }
    }
    setOpening_strategy(value)
    {
        this.opening_strategy =
            {
                value: value,
                meta: new mysqlColumn("opening_strategy", "varchar", "100", "NULL", "NULL")
            }
    }
    setRef_id(value)
    {
        this.ref_id =
            {
                value: value,
                meta: new mysqlColumn("ref_id", "varchar", "36", "NULL", "NULL")
            }
    }
    setRh_id(value)
    {
        this.rh_id =
            {
                value: value,
                meta: new mysqlColumn("rh_id", "varchar", "36", "NULL", "NULL")
            }
    }
    setChain_id(value)
    {
        this.chain_id =
            {
                value: value,
                meta: new mysqlColumn("chain_id", "varchar", "36", "NULL", "NULL")
            }
    }
    setTime_in_force(value)
    {
        this.time_in_force =
            {
                value: value,
                meta: new mysqlColumn("time_in_force", "varchar", "20", "NULL", "NULL")
            }
    }
    setResponse_category(value)
    {
        this.response_category =
            {
                value: value,
                meta: new mysqlColumn("response_category", "varchar", "10", "NULL", "NULL")
            }
    }
    setSymbol(value)
    {
        this.symbol =
            {
                value: value,
                meta: new mysqlColumn("symbol", "varchar", "5", "NULL", "NULL")
            }
    }
    setState(value)
    {
        this._state =
            {
                value: value,
                meta: new mysqlColumn("_state", "varchar", "50", "NULL", "NULL")
            }
    }
    setTrigger(value)
    {
        this._trigger =
            {
                value: value,
                meta: new mysqlColumn("_trigger", "varchar", "50", "NULL", "NULL")
            }
    }
    setType(value)
    {
        this._type =
            {
                value: value,
                meta: new mysqlColumn("_type", "varchar", "35", "NULL", "NULL")
            }
    }
    setDirection(value)
    {
        this.direction =
            {
                value: value,
                meta: new mysqlColumn("direction", "varchar", "10", "NULL", "NULL")
            }
    }
    setPremium(value)
    {
        this.premium =
            {
                value: value,
                meta: new mysqlColumn("premium", "double", "NULL", "22", "NULL")
            }
    }
    setPrice(value)
    {
        this.price =
            {
                value: value,
                meta: new mysqlColumn("price", "double", "NULL", "22", "NULL")
            }
    }
    setPending_quantity(value)
    {
        this.pending_quantity =
            {
                value: value,
                meta: new mysqlColumn("pending_quantity", "double", "NULL", "22", "NULL")
            }
    }
    setProcessed_quantity(value)
    {
        this.processed_quantity =
            {
                value: value,
                meta: new mysqlColumn("processed_quantity", "double", "NULL", "22", "NULL")
            }
    }
    setClosing_strategy(value)
    {
        this.closing_strategy =
            {
                value: value,
                meta: new mysqlColumn("closing_strategy", "varchar", "25", "NULL", "NULL")
            }
    }
    setProcessed_premium(value)
    {
        this.processed_premium =
            {
                value: value,
                meta: new mysqlColumn("processed_premium", "double", "NULL", "22", "NULL")
            }
    }
    setCreated_at(value)
    {
        this.created_at =
            {
                value: value,
                meta: new mysqlColumn("created_at", "timestamp", "NULL", "NULL", "NULL")
            }
    }
    setUpdated_at(value)
    {
        this.updated_at =
            {
                value: value,
                meta: new mysqlColumn("updated_at", "timestamp", "NULL", "NULL", "NULL")
            }
    }
    setCanceled_quantity(value)
    {
        this.canceled_quantity =
            {
                value: value,
                meta: new mysqlColumn("canceled_quantity", "double", "NULL", "22", "NULL")
            }
    }
    setQuantity(value)
    {
        this.quantity =
            {
                value: value,
                meta: new mysqlColumn("quantity", "double", "NULL", "22", "NULL")
            }
    }
    setCancel_url(value)
    {
        this.cancel_url =
            {
                value: value,
                meta: new mysqlColumn("cancel_url", "varchar", "100", "NULL", "NULL")
            }
    }
    setSource(value)
    {
        this.source =
            {
                value: value,
                meta: new mysqlColumn("source", "int", "NULL", "10", "0")
            }
    }

    buildInsertQuery()
    {
        var query = 'INSERT INTO order_option_robinhood ';
        var values = 'VALUES (';
        var columns = '(';
        var i = 0;
        for (var name in this) {
            i++;
            columns += this[name].meta.name;
            if (this[name].meta.type === 'varchar') {
                3
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
        return query + columns + values;
    }

}

module.exports = OrderOption;