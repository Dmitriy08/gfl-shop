const Router = require('express');
const router = new Router();
const productsRouter = require('./productsRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter')
const categoryProductRouter = require('./categoryProductRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/categories', categoryProductRouter);
router.use('/cart', cartRouter)
router.use('/order', orderRouter)

module.exports = router;
