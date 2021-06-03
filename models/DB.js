const mysql = require('mysql2');

const {HOST, USER, DATABASE, PASSWORD} = process.env;

class DataBase {
    constructor() {
        this.con = mysql.createPool({
            multipleStatements: true,
            connectionLimit: 5,
            host: HOST,
            user: USER,
            database: DATABASE,
            password: PASSWORD
        });
        this.con.connect((error)=>{
            if(error){
                return console.log('Error to connect to DB');
            }else{
                return console.log('Connect to DB !!!');
            }
        })
    }

    query(...args) {
        let queryString = args[0];
        let params = null;
        let callback = null;

        if (args.length === 2) {
            callback = args[1];
            params = [];
        } else if (args.length === 3) {
            params = args[1];
            callback = args[2];
        } else {
            throw new Error('Invalid arguments count');
        }

        this.con.execute(queryString, params, (err, result) => {
            if (err) {
                callback(this._error('Mysql query error'));
            } else {
                callback(this._success(result));
            }
        });
    }

    promise() {
        return this.con.promise();
    }

    _success(msg) {
        return {
            success: true,
            msg,
        };
    }

    _error(msg) {
        return {
            success: false,
            msg,
        };
    }

    closeConnection() {
        this.con.end();
    }
}

const DB = new DataBase();

process.on('uncaughtException', () => {
    DB.con.end();
});
process.on('end', () => {
    DB.con.end();
});
process.on('unhandledRejection', () => {
    DB.con.end();
});

module.exports = DB;
