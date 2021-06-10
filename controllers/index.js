const { UserController } = require('./userController');
const {productsController} = require('./productsController')
const {cartController} = require('./cartController');
const orderController = require('./orderController');

module.exports = {
    UserController,
    productsController,
    cartController,
    orderController
};
