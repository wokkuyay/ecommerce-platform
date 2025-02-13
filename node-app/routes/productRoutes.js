const express = require('express');
const router = express.Router();

// Importing controller functions (to be defined later)
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', getProducts);

// GET /api/products/:id - Get a product by its ID
router.get('/:id', getProductById);

// POST /api/products - Create a new product
router.post('/', createProduct);

// Export the router to use in our main server file
module.exports = router;