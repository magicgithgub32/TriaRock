const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category-controllers');
const router = express.Router();
const { isAdmin } = require('../../middlewares/isAdmin-middleware');
// const { uploadImgCloudinary } = require('../../middlewares/uploadImg');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', [isAdmin], createCategory);
router.put('/:id', [isAdmin], updateCategory);
router.delete('/:id', [isAdmin], deleteCategory);

module.exports = router;
