const Router = require('express');
const router = new Router();
const productsController = require('../controllers/categoryProductController')

router.post('/', productsController.createCategory)
router.get('/', productsController.getAllCategories)

module.exports = router;
