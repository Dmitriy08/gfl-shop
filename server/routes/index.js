const Router = require('express');
const router = new Router();
const productsRouter = require('./productsRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter)
router.use('/products', productsRouter)

module.exports = router;
