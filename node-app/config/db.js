const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the MONGO_URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;