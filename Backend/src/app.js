import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import userRoutes from './routes/User.Routes.js';
import commentRoutes from './routes/Comment.Routes.js';
import favoriteRoutes from './routes/Favourite.Routes.js';
import contactRoutes from './routes/Contact.Routes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Root route (GET instead of POST for better semantics)
app.post('/', (req, res) => {
  res.send('🎬 My-OTT-Platform API is running');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/contact', contactRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // If it's an apiError, use its properties
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: null
    });
  }
  
  // For other errors, return a generic error
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errors: [],
    data: null
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: '❌ API endpoint not found' });
});

// Export the configured app
export default app;