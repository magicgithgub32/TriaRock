const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImg
} = require('../controllers/category-controllers');
const router = express.Router();
const { isAdmin } = require('../../middlewares/isAdmin-middleware');
const { uploadCategoryImgCloudinary } = require('../../middlewares/uploadImg-middleware');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', [isAdmin], createCategory);
router.put('/:id', [isAdmin], updateCategory);
router.patch('/:id', [isAdmin], uploadCategoryImgCloudinary.single('image'), uploadCategoryImg);
router.delete('/:id', [isAdmin], deleteCategory);

module.exports = router;
