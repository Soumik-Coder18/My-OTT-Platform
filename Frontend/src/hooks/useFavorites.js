import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { favoritesApi } from '../services/favoritesApi';

const FAVORITES_KEY = 'favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const { showToast } = useToast();

  // Load favorites from backend if authenticated, otherwise from localStorage
  useEffect(() => {
    const loadFavorites = async () => {
      if (isAuthenticated && token) {
        try {
          setLoading(true);
          const backendFavorites = await favoritesApi.getFavorites();
          // Transform backend data to match frontend format
          const transformedFavorites = backendFavorites.map(fav => ({
            id: parseInt(fav.mediaId),
            media_type: fav.mediaType,
            title: fav.title,
            poster_path: fav.posterPath,
          }));
          setFavorites(transformedFavorites);
        } catch (error) {
          console.error('Failed to load favorites from backend:', error);
          showToast('Failed to load favorites from server. Using local storage.', 'error');
          // Fallback to localStorage if backend fails
          const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
          setFavorites(saved);
        } finally {
          setLoading(false);
        }
      } else {
        // Not authenticated, use localStorage
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
        setFavorites(saved);
      }
    };

    loadFavorites();
  }, [isAuthenticated, token]);

  const addFavorite = async (item) => {
    const updated = [...favorites, item];
    setFavorites(updated);

    if (isAuthenticated && token) {
      try {
        await favoritesApi.addFavorite(item);
        showToast('Added to favorites!', 'success');
      } catch (error) {
        console.error('Failed to add favorite to backend:', error);
        showToast('Failed to save to server. Saved locally.', 'error');
        // Revert local state if backend fails
        setFavorites(favorites);
        throw error;
      }
    } else {
      // Not authenticated, save to localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      showToast('Please log in to sync favorites across devices', 'info');
    }
  };

  const removeFavorite = async (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);

    if (isAuthenticated && token) {
      try {
        await favoritesApi.removeFavorite(id);
        showToast('Removed from favorites!', 'success');
      } catch (error) {
        console.error('Failed to remove favorite from backend:', error);
        showToast('Failed to remove from server. Removed locally.', 'error');
        // Revert local state if backend fails
        setFavorites(favorites);
        throw error;
      }
    } else {
      // Not authenticated, save to localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      showToast('Please log in to sync favorites across devices', 'info');
    }
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return { 
    favorites, 
    addFavorite, 
    removeFavorite, 
    isFavorite, 
    loading 
  };
};
