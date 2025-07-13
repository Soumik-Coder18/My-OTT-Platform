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

// CORS setup supporting multiple origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Root route and health check
app.get('/', (req, res) => {
  res.json({
    message: '🎬 WhisperFrame API is running',
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'WhisperFrame Backend'
  });
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