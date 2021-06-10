const Router = require('express');
const router = new Router()
const {orderController} = require('../controllers')

router.get('/checkout', orderController.getCheckoutInfo)
router.post('/add', orderController.addOrder)
router.get('/get', orderController.getOrders)
router.get('/get/:id', orderController.getOrder)

module.exports = router;
