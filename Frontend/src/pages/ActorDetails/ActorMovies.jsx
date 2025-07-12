import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Film, Clapperboard, Star, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollToTop from '../../components/ScrollToTop'; 

const ActorMovies = () => {
  const { id } = useParams();
  const [credits, setCredits] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/person/${id}/combined_credits`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'en-US',
            },
          }
        );
        const sortedCredits = (res.data.cast || []).sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0)
        );
        setCredits(sortedCredits);
      } catch (err) {
        console.error('Failed to fetch actor credits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [id]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
    setShowScrollToTop(false);
  };

  const handleShowLess = () => {
    setVisibleCount(12);
    setShowScrollToTop(true);
  };

  const visibleCredits = credits.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="px-4 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-10 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-lg">Loading filmography...</p>
          </div>
        </div>
      </div>
    );
  }

  if (credits.length === 0) {
    return (
      <div className="px-4 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20 text-white">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clapperboard className="w-8 h-8 text-purple-300" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">No credits found</h2>
            <p className="text-gray-400">This actor doesn't have any filmography yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-10 py-16">
      {showScrollToTop && <ScrollToTop />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Complete Filmography</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Filmography <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Collection</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore all movies and TV shows featuring this actor
          </p>
        </motion.div>

        {/* Credits Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 gap-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {visibleCredits.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: idx * 0.05, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="h-[420px] w-full flex flex-col group"
            >
              <Link
                to={`/${item.media_type === 'movie' ? 'movie' : 'series'}/${item.id}`}
                className="flex-1 relative"
              >
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
                            : '/no-poster.png'
                        }
                        alt={item.title || item.name}
                        className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Top Badge */}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full">
                        <span className="text-xs text-white font-medium">
                          {item.media_type === 'movie' ? 'MOVIE' : 'TV'}
                        </span>
                      </div>
                      
                      {/* Rating Badge */}
                      {item.vote_average && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400/30 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 text-white fill-current" />
                          <span className="text-xs text-white font-bold">
                            {item.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                      
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
                        
                        {/* Character Name */}
                        {item.character && (
                          <p className="text-purple-300 text-sm font-medium mb-2">
                            as {item.character}
                          </p>
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
              
              {/* Corner Decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400 rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-pink-400 rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Show More / Show Less Buttons */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {visibleCount < credits.length && (
              <motion.button
                onClick={handleShowMore}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 mt-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More ({credits.length - visibleCount} more)
              </motion.button>
            )}
            {visibleCount > 12 && (
              <motion.button
                onClick={handleShowLess}
                className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 mt-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show Less
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ActorMovies;