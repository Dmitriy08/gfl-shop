const DataBase = require('./DB');

class ProductsModel {
    createProduct(callback){

    }

    async getAllProducts(callback) {
        await DataBase.query('SELECT * FROM products', results => {
            callback(results);
        });
    }

    async getProduct(id, callback) {
        await DataBase.query('SELECT * FROM products WHERE id_product=?', [id], results => {
            callback(results);
        });
    }
}

module.exports = new ProductsModel();
