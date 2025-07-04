import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import commentRoutes from './routes/comment.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('🎬 My-OTT-Platform API is running');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: '❌ API endpoint not found' });
});

// MongoDB connection
// Add a small delay before connecting to MongoDB (useful for containerized environments)
setTimeout(() => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }).catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
}, 500); // 500ms delay