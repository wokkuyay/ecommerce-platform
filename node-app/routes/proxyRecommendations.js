const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../services/recommendationProxy');

// Endpoint to proxy recommendation requests
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const recommendations = await getRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
