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
const { isAdmin } = require('../../middlewares/isAdmin-middleware');
const { uploadProductImgCloudinary } = require('../../middlewares/uploadImg-middleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', [isAdmin], uploadProductImgCloudinary.single('image'), createProduct);
router.put('/:id', [isAdmin], updateProduct)
router.patch('/:id', [isAdmin], uploadProductImgCloudinary.single('image'), uploadProductImg);
router.delete('/:id', [isAdmin], deleteProduct);

module.exports = router;
