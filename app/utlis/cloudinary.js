import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add these to your .env.local file
  api_key: 954381955639637,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
