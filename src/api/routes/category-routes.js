const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category-controllers');
const router = express.Router();
const { isAuth } = require('../../middlewares/isAuth-middleware');
// const { uploadImgCloudinary } = require('../../middlewares/uploadImg');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', [isAuth], createCategory);
router.put('/:id', [isAuth], updateCategory);
router.delete('/:id', [isAuth], deleteCategory);

module.exports = router;
