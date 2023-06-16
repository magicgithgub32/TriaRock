const Category = require('../models/category-model');
const { deleteImgCloudinary } = require('../../middlewares/uploadImg-middleware');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate('items');
    return res.status(200).json(categories);
  } catch (error) {
    return next('Categories not found 🥵', error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    const createdCategory = await newCategory.save();
    return res.status(200).json(createdCategory);
  } catch (error) {
    return next('Error while creating new Category 😱', error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(200).json(category);
  } catch (error) {
    return next('Category not found 🤬', error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return next('Category not found 😡', error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    return res.status(200).json('Category deleted successfully ⌫');
  } catch (error) {
    return next('Category not found 🥴', error);
  }
};

const uploadCategoryImg = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const originalCategory = await Category.findById(id);
     
      if (originalCategory.image) {
        deleteImgCloudinary(originalCategory.image);
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: { image: req.file.path } },
        { new: true }
      );
      
      return res.status(200).json(updatedCategory);
        // return res.json(updatedCategory);
    }
  } catch (error) {
    return next('Error uploading image 👺', error);
  }
};



module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadCategoryImg  
};
