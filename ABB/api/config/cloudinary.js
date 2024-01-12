const cloudinary = require('cloudinary').v2;
require("dotenv").config();

// Configure Cloudinary with your credentials
exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.SECRET_KEY,
    });
    console.log('Cloudinary connected successfully!');
  } catch (error) {
    console.error('Error connecting to Cloudinary:', error);
    // Handle the error as needed (logging, notifying, etc.)
  }
};
