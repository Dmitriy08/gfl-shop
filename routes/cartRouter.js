const Router = require('express');
const router = new Router()
const cartController = require('../controllers/cartController')

router.get('/get', cartController.getCartInfo)
router.post('/add', cartController.addToCart)

module.exports = router;
