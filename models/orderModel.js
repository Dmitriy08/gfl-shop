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

    async addOrder(user_email, country, city, address, deliveryMethod, paymentMethod, addInfo, orderTotalPrice, date_of_order, callback) {
        const [userInfo] = await Database.promise().execute(`SELECT id_user FROM users WHERE user_email='${user_email}' LIMIT 1`);
        const id_user = userInfo[0].id_user
        Database.query(`INSERT INTO orders VALUES (NULL, ${+id_user}, '${country}', '${city}', '${address}', ${+paymentMethod}, ${+deliveryMethod}, '${addInfo}', ${orderTotalPrice}, '${date_of_order}', 2)`, async result => {
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

                        callback(result);
                    })
                })
            }
        );
    }

    async getOrders(user_email, callback){
        const [userInfo] = await Database.promise().execute(`SELECT id_user FROM users WHERE user_email='${user_email}' LIMIT 1`);
        const id_user = userInfo[0].id_user

        await Database.query('SELECT orders.id_order, orders.id_user, orders.country, orders.city, orders.address, orders.order_comments, orders.order_full_price, orders.date_of_order, payment_method.name_payment_method, delivery_method.name_delivery, order_status.name_order_status FROM orders, payment_method, delivery_method, order_status WHERE orders.payment_method=payment_method.id_payment_method and orders.delivery_method=delivery_method.id_delivery_method and orders.order_status=order_status.id_order_status and orders.id_user=?',[id_user], result => {
            const {success, msg} = result;
            if (!success) return callback(msg);
            return callback(result);
        })
    }

    async getOrder(id, callback){
        try {
            let [orderInfo] = await Database.promise().execute('SELECT orders.id_order, orders.id_user, orders.country, orders.city, orders.address, orders.order_comments, orders.order_full_price, orders.date_of_order, payment_method.name_payment_method, delivery_method.name_delivery, order_status.name_order_status FROM orders, payment_method, delivery_method, order_status WHERE orders.payment_method=payment_method.id_payment_method and orders.delivery_method=delivery_method.id_delivery_method and orders.order_status=order_status.id_order_status and orders.id_order=?',[id])
            if (orderInfo.length === 0) {
                return callback({success: false, msg: 'Order did not found'});
            }

            let [orderProductsInfo] = await Database.promise().execute('Select orders.id_order, products.product_name, product_type.type_name, product_color.color_name, product_size.size_name, order_details.product_count, order_details.product_sum from products, orders, order_details, product_options, product_type, product_color, product_size where order_details.id_order=orders.id_order and order_details.product_options=product_options.id_options and product_options.product_type=product_type.id_type and product_options.product_color=product_color.id_color and product_options.product_size=product_size.id_size and order_details.id_product=products.id_product and orders.id_order=?', [id])
            if (orderProductsInfo.length === 0) {
                return callback({success: false, msg: 'Order did not found'});
            }

            callback({
                success: true, msg: {
                    orderInfo: orderInfo[0],
                    orderProductsInfo: orderProductsInfo,
                }
            });
        } catch (error) {
            callback({success: false, msg: JSON.stringify(error)});
        }
    }
}

module.exports = new OrderModel();
