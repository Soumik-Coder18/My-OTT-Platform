
import express from 'express';
import { Comment } from '../models/Comment.models.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST: Add a comment
router.post('/:mediaId', verifyToken, async (req, res) => {
  try {
    const newComment = new Comment({
      userId: req.user.id,
      mediaId: req.params.mediaId,
      mediaType: req.body.mediaType,
      message: req.body.message,
    });
    const saved = await newComment.save();
    const populatedComment = await Comment.findById(saved._id).populate('userId', 'username');
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// GET: Get comments by media ID
router.get('/:mediaId', async (req, res) => {
  try {
    const comments = await Comment.find({ mediaId: req.params.mediaId })
      .populate('userId', 'username')
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
    if (comment.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// POST: Like a comment
router.post('/like/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userId = req.user.id;
    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
      // Remove like (withdraw)
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
      // Add like
      comment.likes.push(userId);
      // Remove dislike if exists
      comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
    }

    await comment.save();
    res.status(200).json({ 
      message: hasLiked ? 'Like withdrawn' : 'Comment liked', 
      likes: comment.likes.length,
      dislikes: comment.dislikes.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like comment' });
  }
});

// POST: Dislike a comment
router.post('/dislike/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userId = req.user.id;
    const hasDisliked = comment.dislikes.includes(userId);

    if (hasDisliked) {
      // Remove dislike (withdraw)
      comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
    } else {
      // Add dislike
      comment.dislikes.push(userId);
      // Remove like if exists
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    }

    await comment.save();
    res.status(200).json({ 
      message: hasDisliked ? 'Dislike withdrawn' : 'Comment disliked', 
      likes: comment.likes.length,
      dislikes: comment.dislikes.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to dislike comment' });
  }
});

export default router;