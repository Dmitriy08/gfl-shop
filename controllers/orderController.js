const orderModel = require('../models/orderModel')
const ApiError = require('../helpers/ApiError')
const jwt_decode = require('jwt-decode');

class orderController {
    addOrder(req, res, next){
        const {token, country, city, address, paymentMethod, deliveryMethod, addInfo, orderTotalPrice, date_of_order } = req.body;
        const decodedEmail = jwt_decode(token).email
        orderModel.addOrder(decodedEmail, country, city, address, deliveryMethod, paymentMethod, addInfo, orderTotalPrice, date_of_order, callback => {
            const { success, msg } = callback;
            if (!success) {
                return next(ApiError.badRequest('Product not fount'))
            }
            try {
                res.json(msg)
            } catch (e) {
                res.json({message: e.message})
            }
        })
    }

    getCheckoutInfo(req, res, next) {
        orderModel.getCheckoutInfo(callback => {
            const { success, msg } = callback;

            if (!success) {
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
