const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
  //   uploadProductImg
} = require('../controllers/product-controllers');
const router = express.Router();
//const { isAuth } = require('../../middlewares/isAuth-middleware');
// const { uploadImgCloudinary } = require('../../middlewares/uploadImg');

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', createProduct);
router.put('/:id', updateProduct);
// // router.patch('/:id', [isAuth], uploadImgCloudinary.single('image'), uploadProductImg);
// router.delete('/:id', [isAuth], deleteProduct);

module.exports = router;
