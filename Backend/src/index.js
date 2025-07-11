import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    // Retry after 2 seconds
    setTimeout(connectDB, 2000);
  }
};

// Start server only after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🚀 Server running on port ${PORT}`);
  });
});