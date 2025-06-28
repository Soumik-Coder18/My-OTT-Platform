import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    setFavorites(saved);
  }, []);

  const addFavorite = (item) => {
    const updated = [...favorites, item];
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
