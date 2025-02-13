// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    // Invalid ID format handling
    if (err.name === 'CastError') {
        err.status = 400;
        err.message = 'Invalid ID format';
    }
    
    // Log the error (could be enhanced with a logging service)
    console.error(err.stack);
  
    // Set the status code. If the error doesn't have a status, default to 500 (Internal Server Error)
    const statusCode = err.status || 500;

    res.status(statusCode);
  
    // Send a JSON response with error details.
    // In production, you might not want to expose the stack trace.
    res.json({
      message: err.message || 'An unexpected error occurred.',
      // Only include stack trace in non-production environments for debugging
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = errorHandler;
  