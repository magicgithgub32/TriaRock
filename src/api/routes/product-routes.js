const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImg
} = require('../controllers/product-controllers');
const router = express.Router();
const { isAuth } = require('../../middlewares/isAuth-middleware');
const { uploadProductImgCloudinary } = require('../../middlewares/uploadImg-middleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', [isAuth], uploadProductImgCloudinary.single('image'), createProduct);
router.put('/:id', [isAuth], updateProduct);
router.patch('/:id', [isAuth], uploadProductImgCloudinary.single('image'), uploadProductImg);
router.delete('/:id', [isAuth], deleteProduct);

module.exports = router;
