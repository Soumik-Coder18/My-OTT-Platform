import React, { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { Frown, XCircle, Clapperboard, Tv2, Heart, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

const Favorites = () => {
  const { favorites, removeFavorite, addFavorite, loading } = useFavorites();
  const [recentlyRemoved, setRecentlyRemoved] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);
  const [showAll, setShowAll] = useState({ movie: false, tv: false });

  const movies = favorites.filter((item) => item.media_type === 'movie');
  const tvShows = favorites.filter((item) => item.media_type === 'tv');

  const handleRemove = async (item) => {
    try {
      await removeFavorite(item.id);
      setRecentlyRemoved(item);
      if (undoTimer) clearTimeout(undoTimer);
      const timer = setTimeout(() => setRecentlyRemoved(null), 5000);
      setUndoTimer(timer);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const renderSection = (items, title, Icon, type) => {
    const displayItems = showAll[type] ? items : items.slice(0, 6);
    return (
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
              <Icon className="text-purple-300" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-300">
              {items.length} items
            </span>
          </div>
          {items.length > 6 && (
            <motion.button
              onClick={() => setShowAll((prev) => ({ ...prev, [type]: !prev[type] }))}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll[type] ? 'Show Less' : 'Show More'}
            </motion.button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 gap-y-12">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: idx * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -12, scale: 1.05 }}
              className="h-[450px] w-full flex flex-col group"
            >
              <div className="flex-1 relative">
                <Link to={`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 h-full shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                              : 'https://via.placeholder.com/300x450?text=No+Image'
                          }
                          alt={item.title || item.name}
                          className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full">
                          <span className="text-xs text-white font-medium">
                            {item.media_type === 'tv' ? 'TV' : 'Movie'}
                          </span>
                        </div>
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400/30 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 text-white fill-current" />
                          <span className="text-xs text-white font-bold">
                            {item.vote_average?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        {/* Title and Info */}
                        <div>
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 leading-tight group-hover:text-purple-200 transition-colors duration-300">
                            {item.title || item.name}
                          </h3>
                          
                          {/* Release Date */}
                          {item.release_date && (
                            <p className="text-gray-400 text-sm mb-2">
                              {item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || 'N/A'}
                            </p>
                          )}
                          
                          {/* Genres */}
                          {item.genre_ids && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.genre_ids.slice(0, 2).map((genreId) => (
                                <span
                                  key={genreId}
                                  className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 text-purple-200 rounded-full text-xs"
                                >
                                  {genreId}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Bottom Section */}
                        <div className="flex items-center justify-between">
                          {/* Popularity */}
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span>Popular</span>
                          </div>
                          
                          {/* Action Indicator */}
                          <div className="text-purple-300 text-xs font-medium">
                            Click to view
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Remove Button */}
                <motion.button
                  onClick={() => handleRemove(item)}
                  className="absolute -top-2 -right-2 bg-red-500/90 backdrop-blur-sm text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100 border-2 border-white/20"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Remove from favorites"
                >
                  <XCircle size={16} />
                </motion.button>
                
                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400 rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-pink-400 rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col items-center justify-center px-4 text-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-xl"
            animate={{
              y: [0, -10, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-60 left-1/4 w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/3 w-18 h-18 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl"
            animate={{
              y: [0, -15, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-8 backdrop-blur-sm"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Frown size={48} className="text-purple-300" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">No favorites yet!</h2>
          <p className="text-xl text-gray-300 max-w-md">
            You haven't added any movies or shows to your favorites list yet.
          </p>
          
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Explore Content
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -10, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-60 left-1/4 w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-18 h-18 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-14 h-14 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <div className="relative z-10">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 md:px-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Your Personal Collection</span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Favorites</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              All your favorite movies and TV shows in one place
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section 
        className="px-4 md:px-10 pb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          {movies.length > 0 && renderSection(movies, 'Movies', Clapperboard, 'movie')}
          {tvShows.length > 0 && renderSection(tvShows, 'TV Shows', Tv2, 'tv')}
        </div>
      </motion.section>

      {/* Undo Notification */}
      {recentlyRemoved && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-4 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
        >
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <span>
              Removed <strong>{recentlyRemoved.title || recentlyRemoved.name}</strong>
            </span>
          </div>
          <motion.button
            onClick={async () => {
              try {
                await addFavorite(recentlyRemoved);
                setRecentlyRemoved(null);
                clearTimeout(undoTimer);
              } catch (error) {
                // Error handling is done in the hook
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Undo
          </motion.button>
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default Favorites;
