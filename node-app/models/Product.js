const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'], // Custom error message if not provided
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Product model
module.exports = mongoose.model('Product', productSchema);