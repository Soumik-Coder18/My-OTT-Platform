import API from './api';

export const commentsApi = {
  // Get comments for a specific media
  getComments: async (mediaId) => {
    const response = await API.get(`/comments/${mediaId}`);
    return response.data;
  },

  // Add a new comment
  addComment: async (mediaId, mediaType, message) => {
    const response = await API.post(`/comments/${mediaId}`, {
      mediaType,
      message,
    });
    return response.data;
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    const response = await API.delete(`/comments/${commentId}`);
    return response.data;
  },

  // Like a comment
  likeComment: async (commentId) => {
    const response = await API.post(`/comments/like/${commentId}`);
    return response.data;
  },

  // Dislike a comment
  dislikeComment: async (commentId) => {
    const response = await API.post(`/comments/dislike/${commentId}`);
    return response.data;
  },
}; 