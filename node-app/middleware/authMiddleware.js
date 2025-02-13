// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const err = new Error('No token provided');
        err.status = 401;
        return next(err);
    }
    
    const token = authHeader.split(' ')[1];
    // Token verification logic here (e.g., using jsonwebtoken)
    if (token) {
        req.user = { id: '123', name: 'John Doe' }; // Example user
        next();
    } else {
        const err = new Error('Invalid token');
        err.status = 401;
        next(err);
    }
};

module.exports = authMiddleware;
  