const express = require('express');
const productsRouter = require('./product-routes');
const categoriesRouter = require('./category-routes');
const usersRouter = require('./user-routes');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);

module.exports = router;
