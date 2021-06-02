const DataBase = require('./DB');

class categoryProductModel {
    createCategory(callback){

    }

    getAllCategories(callback) {
        DataBase.query('SELECT * FROM products', results => {
            callback(results);
        });
    }

    getCategory(id, callback) {
        DataBase.query('SELECT * FROM products WHERE id_product=?', [id], results => {
            callback(results);
        });
    }
}

module.exports = new categoryProductModel();
