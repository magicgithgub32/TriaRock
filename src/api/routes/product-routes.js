const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProduct,
//   deleteProductFieldById,
//   uploadProductImg
} = require('../controllers/product-controllers');
const router = express.Router();
const { isAuth } = require('../../middlewares/isAuth');
// const { uploadImgCloudinary } = require('../../middlewares/uploadImg');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', [isAuth], createProduct);
router.put('/:id', [isAuth], updateProductById);
// router.patch('/:id', [isAuth], uploadImgCloudinary.single('image'), uploadProductImg);
router.delete('/:id', [isAuth], deleteProduct);
// router.delete('/:id/author', [isAuth], deleteProductFieldById);

module.exports = router;
