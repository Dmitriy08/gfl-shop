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

    getOrders(req, res, next) {
        const {token} = req.query;
        let idUser = Buffer.from(token, 'base64').toString('utf-8').split('.')[0];
        orderModel.getOrders(idUser, callback => {
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

    getOrder(req, res, next){
        const {id} = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(500).send('Server Error');
        }

        orderModel.getOrder( id,product => {
            const { success, msg } = product;

            if (!success || msg.length === 0) {
                return next(ApiError.badRequest('Order not fount'))
            }

            try {
                res.json(msg[0])
            } catch (e) {
                res.json({message: e.message})
            }
        })
    }
}

module.exports = new orderController()
