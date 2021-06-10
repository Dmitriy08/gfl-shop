const Router = require('express');
const router = new Router()
const {orderController} = require('../controllers')

router.get('/checkout', orderController.getCheckoutInfo)
router.post('/add', orderController.addOrder)

module.exports = router;
