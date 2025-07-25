import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {Favorite} from '../models/Favorite.models.js';

const router = express.Router();

// Get all favorites of a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add to favorites
router.post('/', verifyToken, async (req, res) => {
  const { mediaId, title, mediaType, poster_path } = req.body;

  try {
    const exists = await Favorite.findOne({ user: req.user._id, mediaId });
    if (exists) return res.status(400).json({ message: 'Already in favorites' });

    const favorite = new Favorite({
      user: req.user._id,
      mediaId,
      mediaType,
      title,
      posterPath: poster_path,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove from favorites
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ user: req.user._id, mediaId: req.params.id });
    res.status(200).json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;