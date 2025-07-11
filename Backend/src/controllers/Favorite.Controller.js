
import Favorite from '../models/favoriteModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import apiError from '../utils/apiError.js';

// Add to favorites
export const addFavorite = asyncHandler(async (req, res) => {
  const { mediaId, mediaType, title, poster_path } = req.body;
  const userId = req.user._id;

  const existing = await Favorite.findOne({ user: userId, mediaId });

  if (existing) {
    throw new apiError(400, 'Already in favorites');
  }

  const favorite = await Favorite.create({
    user: userId,
    mediaId,
    mediaType,
    title,
    poster_path,
  });

  return res.status(201).json(new apiResponse(201, favorite, 'Added to favorites'));
});

// Get all favorites for a user
export const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const favorites = await Favorite.find({ user: userId });

  return res.status(200).json(new apiResponse(200, favorites));
});

// Remove from favorites
export const removeFavorite = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const removed = await Favorite.findOneAndDelete({ user: userId, mediaId: id });

  if (!removed) {
    throw new apiError(404, 'Favorite not found');
  }

  return res.status(200).json(new apiResponse(200, removed, 'Removed from favorites'));
});