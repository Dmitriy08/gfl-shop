const Router = require('express');
const router = new Router();
const productsController = require('../controllers/productsController')

router.post('/', productsController.createProduct)
router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProduct)

module.exports = router;
