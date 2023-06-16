const Product = require('../models/product-model');
const { deleteImgCloudinary } = require('../../middlewares/uploadImg-middleware');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return next('Products were not found 👺', error);
  }
}

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);

    if (req.file) {
      newProduct.image = req.file.path;
    } else {
      newProduct.image = 'No image';
    }

    const createdProduct = await newProduct.save();

    return res.status(201).json(createdProduct);
  } catch (error) {
    return next('Error while creating Product 👺', error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return next('Product not found 👺', error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const newProduct = new Product(req.body);

    // newProduct._id = id;

    // const originalProduct = await Product.findById(id);

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return next('Error updating Product 👺', error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    deleteImgCloudinary(deletedProduct.image);

    return res.status(200).json('Product deleted successfully');
  } catch (error) {
    return next('Product not found 👺', error);
  }
};

const uploadProductImg = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const originalProduct = await Product.findById(id);
     
      if (originalProduct.image) {
        deleteImgCloudinary(originalProduct.image);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: { image: req.file.path } },
        { new: true }
      );
      
      return res.status(200).json(updatedProduct);
    }
  } catch (error) {
    return next('Error uploading image 👺', error);
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImg
};
