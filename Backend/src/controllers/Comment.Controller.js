
import Comment from '../models/commentModel.js';
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
export const createComment = asyncHandler(async (req, res, next) => {
  const { mediaId, mediaType, text } = req.body;

  if (!mediaId || !mediaType || !text) {
    return next(new apiError('All fields are required', 400));
  }

  const comment = await Comment.create({
    user: req.user._id,
    mediaId,
    mediaType,
    text,
  });

  res.status(201).json(new apiResponse(201, comment, 'Comment added successfully'));
});

// @desc    Get comments by media ID
// @route   GET /api/comments/:mediaId
// @access  Public
export const getCommentsByMediaId = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ mediaId: req.params.mediaId })
    .populate('user', 'username email')
    .sort({ createdAt: -1 });

  res.status(200).json(new apiResponse(200, comments));
});

// @desc    Delete comment by ID
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new apiError('Comment not found', 404));
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    return next(new apiError('Not authorized to delete this comment', 403));
  }

  await comment.remove();
  res.status(200).json(new apiResponse(200, null, 'Comment deleted'));
});