const Router = require('express');
const router = new Router();
const productsController = require('../controllers/categoryProductController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'),  productsController.createCategory)
router.get('/', productsController.getAllCategories)

module.exports = router;
