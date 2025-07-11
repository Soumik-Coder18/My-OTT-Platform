

import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ['movie', 'tv'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Favorite = mongoose.model('Favorite', favoriteSchema);