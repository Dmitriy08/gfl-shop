const DataBase = require('./DB');

class ProductsModel {
    createProduct(
        fileName,
        name,
        productDescription,
        productPrice,
        productAvailable,
        productCount,
        productKeywords,
        productStructure,
        callback
    ) {
        DataBase.query("INSERT INTO products VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
            [
                name,
                productDescription,
                productPrice,
                productAvailable,
                productCount,
                productKeywords,
                productStructure
            ], result => {

                const {success, msg} = result;
                console.log('SUCCESSSSS',success);
                console.log('MESSAGEEEEE',msg);
                if (success) {
                    DataBase.promise().execute( "INSERT INTO image VALUES (NULL, ?)", [fileName], result => {
                        const {success, msg} = result;

                        if (!success) return callback(msg);

                        callback(result);
                    });
                }

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
