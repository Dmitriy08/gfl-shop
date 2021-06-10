const orderModel = require('../models/orderModel')
const ApiError = require('../helpers/ApiError')
const jwt_decode = require('jwt-decode');

class orderController {
    addOrder(req, res, next){
        const {id_user, country, city, state, delivery_address, postcode, payment_method, delivery_method, order_comments, order_full_price, date_of_order } = req.body;
        const decodedEmail = jwt_decode(id_user).email
        orderModel.addOrder(decodedEmail, country, city, state, delivery_address, postcode, payment_method, delivery_method, order_comments, order_full_price, date_of_order, callback => {
            const { success, msg } = callback;

            if (!success || msg.length === 0) {
                return next(ApiError.badRequest('Product not fount'))
            }
            console.log(callback)
            try {
                res.json(msg)
            } catch (e) {
                res.json({message: e.message})
            }
        })
    }

    getCheckoutInfo(req, res, next) {
        const {token} = req.query;
        orderModel.getCheckoutInfo(callback => {
            const { success, msg } = callback;

            if (!success || msg.length === 0) {
                return next(ApiError.badRequest('Product not fount'))
            }

            try {
                res.json(msg)
            } catch (e) {
                res.json({message: e.message})
            }
        })
    }
}

module.exports = new orderController()
