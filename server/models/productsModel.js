const DataBase = require('./DB');

class ProductsModel {
    async createProduct(
        fileName,
        name,
        productDescription,
        productPrice,
        productAvailable,
        productCount,
        productKeywords,
        productStructure,
        callback
    ){
        await DataBase.query("INSERT INTO products VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
            [
                name,
                productDescription,
                productPrice,
                productAvailable,
                productCount,
                productKeywords,
                productStructure
            ], result => {
            const { success, msg } = result;

            if (!success) return callback(msg);

            callback(result);
        });
        await DataBase.query("INSERT INTO image VALUES (NULL, ?)", [fileName], result => {
                const { success, msg } = result;

                if (!success) return callback(msg);

                callback(result);
            });
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
