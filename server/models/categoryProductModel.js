const DataBase = require('./DB');

class categoryProductModel {
    async createCategory(name, desc, callback){
        if (!name)
            return callback({
                success: false,
                msg: 'Cat name is required',
            });
        if (!desc)
            return callback({
                success: false,
                msg: 'Desc is required',
            });
        await DataBase.query("INSERT INTO category VALUES (NULL, ?, ?)", [name, desc], result => {
            const { success, msg } = result;

            if (!success) return callback(msg);

            callback(result);
        });
    }

    async getAllCategories(callback) {
        await DataBase.query('SELECT * FROM category', results => {
            callback(results);
        });
    }
}

module.exports = new categoryProductModel();
