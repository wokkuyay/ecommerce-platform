// controllers/productController.js (refactored version)
const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    // Delegate data fetching to the service layer
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productService.createProduct(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
