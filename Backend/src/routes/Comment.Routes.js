
import express from 'express';
import { Comment } from '../models/Comment.models.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST: Add a comment
router.post('/:mediaId', verifyToken, async (req, res) => {
  try {
    const newComment = new Comment({
      user: req.user.id,
      mediaId: req.params.mediaId,
      mediaType: req.body.mediaType,
      content: req.body.content,
    });
    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// GET: Get comments by media ID
router.get('/:mediaId', async (req, res) => {
  try {
    const comments = await Comment.find({ mediaId: req.params.mediaId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// DELETE: Delete comment
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;

// POST: Like a comment
router.post('/like/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    // Prevent double liking
    if (!comment.likes.includes(req.user.id)) {
      comment.likes.push(req.user.id);
      // Remove dislike if exists
      comment.dislikes = comment.dislikes.filter(userId => userId.toString() !== req.user.id);
      await comment.save();
    }

    res.status(200).json({ message: 'Comment liked', likes: comment.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like comment' });
  }
});

// POST: Dislike a comment
router.post('/dislike/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (!comment.dislikes.includes(req.user.id)) {
      comment.dislikes.push(req.user.id);
      // Remove like if exists
      comment.likes = comment.likes.filter(userId => userId.toString() !== req.user.id);
      await comment.save();
    }

    res.status(200).json({ message: 'Comment disliked', dislikes: comment.dislikes.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to dislike comment' });
  }
});