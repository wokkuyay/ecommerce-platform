require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

const requestLogger = require('./middleware/requestLogger');
const authMiddleware = require('./middleware/authMiddleware');
const protectedRoutes = require('./routes/protectedRoutes');
const connectDB = require('./config/db');
const proxyRecommendations = require('./routes/proxyRecommendations');
// Register the error-handling middleware after all other middleware and routes
const errorHandler = require('./middleware/errorMiddleware');


// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS
app.use(morgan('dev')); // Logs requests to console
app.use(helmet()); // Adds security headers
app.use(requestLogger); // Applies to all routes
// For routes that require authentication, you can do:
app.use('/api/protected', authMiddleware, protectedRoutes);



// Import product routes
const productRoutes = require('./routes/productRoutes');

// Mount product routes at /api/products
app.use('/api/products', productRoutes);


app.use('/api/proxy-recommendations', proxyRecommendations);

// Test root route
app.get('/', (req, res) => {
    res.send('Welcome to our e-commerce API!');
});


app.use(errorHandler);

connectDB(); // Establish connection with MongoDB

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


