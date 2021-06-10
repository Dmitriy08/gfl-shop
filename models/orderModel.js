const Database = require('./DB')

class OrderModel {
    async getCheckoutInfo(callback) {
        const [payment_method] = await Database.promise().execute('Select payment_method.id_payment_method as id, payment_method.name_payment_method as name from payment_method')
        const [delivery_method] = await Database.promise().execute('Select delivery_method.id_delivery_method as id, delivery_method.name_delivery as name from delivery_method')
        callback({success: true, msg: {
                payment_method: payment_method,
                delivery_method: delivery_method
            }});
    }

    async addOrder(id_user, country, city, state, delivery_address, postcode, payment_method, delivery_method, order_comments, order_full_price, date_of_order, callback) {
        Database.query(`INSERT INTO orders VALUES (NULL, ${+id_user}, '${country}', '${city}', '${state}', '${delivery_address}', '${postcode}', ${+payment_method}, ${+delivery_method}, '${order_comments}', ${+order_full_price}, '${date_of_order}', 2)`, async result => {
                const {success, msg} = result;
                if (!success) return callback(msg);

                let [id] = await Database.promise().execute('SELECT MAX(orders.id_order) FROM orders WHERE orders.id_user=?', [id_user])
                id = id[0]['MAX(orders.id_order)']
                let [CardOptions] = await Database.promise().execute('SELECT cart.id_product, cart.id_options, cart.product_count, cart.product_sum FROM cart WHERE cart.id_user=?', [id_user])
                let newString = '';
                let separator = ','
                CardOptions.forEach((option, index) => {
                    if (CardOptions.length - 1 === index) separator = '';
                    newString += `(${option.id_product}, ${option.id_options}, ${option.product_count}, ${option.product_sum}, ${id})${separator} `
                })

                Database.query(`insert into order_details(id_product, product_options, product_count, product_sum, id_order) VALUES ${newString}`, async result => {
                    const {success, msg} = result;
                    if (!success) return callback(msg);

                    Database.query(`DELETE FROM cart WHERE cart.id_user=${id_user}`, async result => {
                        const {success, msg} = result;
                        if (!success) return callback(msg);
                        console.log(msg)
                        callback(result);
                    })
                })
            }
        );
    }
}

module.exports = new OrderModel();
