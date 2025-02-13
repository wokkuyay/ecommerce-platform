const axios = require('axios');

/**
 * Fetch recommendations from the Python recommendation service.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - The recommendations data.
 */
async function getRecommendations(userId) {
  try {
    const response = await axios.get('http://localhost:5001/recommendations', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    throw error;
  }
}

module.exports = { getRecommendations };
