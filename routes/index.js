const Router = require('express');
const router = new Router();
const productsRouter = require('./productsRouter');
const userRouter = require('./userRouter');
const categoryProductRouter = require('./categoryProductRouter');

router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/categories', categoryProductRouter);

module.exports = router;
