const {cartModel} = require('../models')
const ApiError = require('../helpers/ApiError')
const jwt_decode = require('jwt-decode');
class cartController {
    addToCart(req, res, next){
        const {id_user, id_product, id_options, product_count, product_sum} = req.body
        const decodedEmail = jwt_decode(id_user).email

        cartModel.addToCart(decodedEmail, id_product, id_options, product_count, product_sum, callback => {
            const { success, msg } = callback;
            if (!success || msg.length === 0) {
                return next(ApiError.badRequest('Something went wrong'))
            }
            try {
                res.json(msg)
            } catch (e) {
                res.json({message: e.message})
            }
        })
    }

    getCartInfo(req, res, next) {
        const {token} = req.query

        const decodedEmail = jwt_decode(token).email

        cartModel.getCartInfo(decodedEmail, callback =>{
            const { success, msg } = callback;
            if (!success || msg.length === 0) {
                return next(ApiError.badRequest('Your cart is empty'))
            }
            try {
                res.json({msg})
            } catch (e) {
                res.json({message: e.message})
            }

        })
    }
}


module.exports = new cartController()
