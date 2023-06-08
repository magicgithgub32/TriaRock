const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategory,
} = require('../controllers/category-controllers');
const router = express.Router();
const { isAuth } = require('../../middlewares/isAuth');
// const { uploadImgCloudinary } = require('../../middlewares/uploadImg');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', [isAuth], createCategory);
router.put('/:id', [isAuth], updateCategoryById);
router.delete('/:id', [isAuth], deleteCategory);

module.exports = router;