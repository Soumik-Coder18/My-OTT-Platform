
import express from 'express';
import {Comment} from '../models/Comment.models.js';
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