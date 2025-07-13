import API from './api';

export const favoritesApi = {
  // Get all favorites for the authenticated user
  getFavorites: async () => {
    try {
      const response = await API.get('/api/favorites');
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  // Add a movie/show to favorites
  addFavorite: async (favoriteData) => {
    try {
      const response = await API.post('/api/favorites', {
        mediaId: favoriteData.id.toString(),
        title: favoriteData.title || favoriteData.name,
        mediaType: favoriteData.media_type,
        poster_path: favoriteData.poster_path,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  // Remove a movie/show from favorites
  removeFavorite: async (mediaId) => {
    try {
      const response = await API.delete(`/api/favorites/${mediaId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },
}; 