const Product = require('../models/product-model');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return next('Products were not found 👺', error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);

    const createdProduct = await newProduct.save();
 
    return res.status(201).json(createdProduct);
   
  } catch (error) {
    return next('Error while creating Product 👺', error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const Product = await Product.findById(req.params.id);
    return res.status(200).json(Product);
  } catch (error) {
    return next('Product not found 👺', error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newProduct = new Product(req.body);

    // newProduct._id = id;

    // const originalProduct = await Product.findById(id);

    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
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

    // eraseProductCoverCloudinary(deletedProduct.cover);

    return res.status(200).json('Product deleted successfully');
  } catch (error) {
    return next('Product not found 👺', error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
