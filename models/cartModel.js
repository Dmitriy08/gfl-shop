const DB = require('./DB')

class CartModel {
    async getCartInfo(user_email, callback) {
       
        const [userInfo] = await DB.promise().execute(`SELECT id_user FROM users WHERE user_email='${user_email}' LIMIT 1`);
        const id = userInfo[0].id_user
        
        DB.query('select DISTINCT cart.id_cart, cart.id_user, cart.id_options, cart.id_product, cart.product_count, products.product_count as available, products.product_name, products.product_price ,product_type.type_name, product_color.color_name, product_color.color_code, product_size.size_name from cart, product_options, product_type, product_color, product_size, products where cart.id_options=product_options.id_options and product_options.product_type=product_type.id_type and product_options.product_color=product_color.id_color and product_options.product_size=product_size.id_size and cart.id_product=products.id_product and cart.id_user=?',
            [id],
            result => {
                const {success, msg} = result;
                if (!success) return callback(msg);
                return callback(result);
            })
    }


    async addToCart(user_email, id_product, id_options, product_count, product_sum, callback) {
        const [userInfo] = await DB.promise().execute(`SELECT id_user FROM users WHERE user_email='${user_email}' LIMIT 1`);
        const id_user = userInfo[0].id_user

        this.isExistProduct(id_user, id_options, product_count_before => {
            if (product_count_before) {
                if (product_count_before.product_count + product_count === 0) {
                    DB.query("DELETE FROM cart WHERE cart.id_cart=?",
                        [product_count_before.id_cart],
                        result => {
                            const {success, msg} = result;

                            if (!success) return callback(msg);
                            return callback(result);
                        }
                    )
                } else {
                    DB.query(
                        "UPDATE cart SET product_count=?, product_sum=? WHERE cart.id_cart =?;",
                        [product_count_before.product_count + product_count, product_sum, product_count_before.id_cart],
                        result => {
                            const {success, msg} = result;
                            if (!success) return callback(msg);
                            return callback(result);
                        }
                    );
                }
            } else {
                DB.query(`INSERT INTO cart VALUES (NULL, '${id_user}', '${id_product}', '${id_options}', '${product_count}', '${product_sum}')`, result => {
                        const {success, msg} = result;

                        if (!success) return callback(msg);
                        callback(result);
                    }
                );
            }
        });
    }

    isExistProduct(id_user, id_options, callback) {
        DB.query(
            'SELECT id_cart, product_count FROM cart WHERE id_user=? and id_options=? LIMIT 1',
            [id_user, id_options],
            result => {
                callback(result.msg[0]);
            }
        );
    }
}

module.exports = new CartModel();
