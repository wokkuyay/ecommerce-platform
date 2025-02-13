// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();

// Example protected route: a dashboard endpoint
router.get('/dashboard', (req, res) => {
  res.send('Welcome to the protected dashboard!');
});

// You can add more protected routes here as needed

module.exports = router;
