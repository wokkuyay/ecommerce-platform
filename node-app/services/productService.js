// services/productService.js
const Product = require('../models/Product');

/**
 * Retrieves all products from the database.
 * Can include additional business logic such as filtering, sorting, or caching.
 */
const getAllProducts = async () => {
  // Business logic could be added here (e.g., sorting or filtering)
  return await Product.find();
};

/**
 * Retrieves a single product by its ID.
 * Throws an error if the product is not found.
 *
 * @param {string} id - The ID of the product.
 * @returns {Object} The product document.
 */
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }
  return product;
};

/**
 * Creates a new product in the database.
 * Validates or processes productData before creation if necessary.
 *
 * @param {Object} productData - The data for the new product.
 * @returns {Object} The newly created product document.
 */
const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
