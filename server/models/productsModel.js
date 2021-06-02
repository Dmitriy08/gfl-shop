const DataBase = require('./DB');

class ProductsModel {
    createProduct(callback){

    }

    getAllProducts(callback) {
        DataBase.query('SELECT * FROM products', results => {
            callback(results);
        });
    }

    getProduct(id, callback) {
        DataBase.query('SELECT * FROM products WHERE id_product=?', [id], results => {
            callback(results);
        });
    }
}

module.exports = new ProductsModel();
