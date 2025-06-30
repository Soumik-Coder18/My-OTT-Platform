import React, { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { Frown, XCircle, Clapperboard, Tv2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Favorites = () => {
  const { favorites, removeFavorite, addFavorite } = useFavorites();
  const [recentlyRemoved, setRecentlyRemoved] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);
  const [showAll, setShowAll] = useState({ movie: false, tv: false });

  const movies = favorites.filter((item) => item.media_type === 'movie');
  const tvShows = favorites.filter((item) => item.media_type === 'tv');

  const handleRemove = (item) => {
    removeFavorite(item.id);
    setRecentlyRemoved(item);
    if (undoTimer) clearTimeout(undoTimer);
    const timer = setTimeout(() => setRecentlyRemoved(null), 5000);
    setUndoTimer(timer);
  };

  const renderSection = (items, title, Icon, type) => {
    const displayItems = showAll[type] ? items : items.slice(0, 5);
    return (
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon className="text-[#555879]" size={24} />
            <h2 className="text-2xl font-bold text-[#555879]">{title}</h2>
          </div>
          {items.length > 5 && (
            <button
              onClick={() => setShowAll((prev) => ({ ...prev, [type]: !prev[type] }))}
              className="px-4 py-1 text-sm font-medium rounded-full bg-[#555879] text-[#F4EBD3] hover:bg-[#3e4059] transition"
            >
              {showAll[type] ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
            >
              <div className="bg-[#DED3C4] rounded-xl overflow-hidden shadow-md relative group transition hover:shadow-xl">
                <Link to={`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`}>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                    }
                    alt={item.title || item.name}
                    className="w-full h-[360px] object-cover"
                  />
                  <div className="p-3 text-[#555879]">
                    <h3 className="text-lg font-semibold truncate">
                      {item.title || item.name}
                    </h3>
                  </div>
                </Link>
                <button
                  onClick={() => handleRemove(item)}
                  className="absolute top-2 right-2 bg-[#f4ebd3] text-red-500 rounded-full p-1 shadow hover:bg-red-100 transition"
                  title="Remove from favorites"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#888da8] px-4 text-center bg-[#F4EBD3]">
        <Frown size={72} className="text-[#555879] mb-4 animate-bounce" />
        <p className="text-2xl font-bold mb-2">No favorites yet!</p>
        <p className="text-sm">You haven’t added any movies or shows to your list yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-[#F4EBD3]">
      {recentlyRemoved && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#DED3C4] text-[#222] px-4 py-2 rounded shadow flex items-center gap-3 z-50">
          <span>
            Removed <strong>{recentlyRemoved.title || recentlyRemoved.name}</strong>
          </span>
          <button
            onClick={() => {
              addFavorite(recentlyRemoved);
              setRecentlyRemoved(null);
              clearTimeout(undoTimer);
            }}
            className="text-[#565878] hover:underline"
          >
            Undo
          </button>
        </div>
      )}
      <motion.h1
        className="text-4xl font-bold text-[#555879] mb-12 text-center flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heart className="w-7 h-7 text-[#555879]" />
        Your Favorites
      </motion.h1>

      {movies.length > 0 && renderSection(movies, 'Movies', Clapperboard, 'movie')}
      {tvShows.length > 0 && renderSection(tvShows, 'TV Shows', Tv2, 'tv')}
    </div>
  );
};

export default Favorites;
