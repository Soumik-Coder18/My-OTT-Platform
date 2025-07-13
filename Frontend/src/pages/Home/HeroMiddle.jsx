import React, { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries } from '../../services/movieApi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Calendar, Users, Info, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const HeroMiddle = ({ type = 'movie' }) => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(null);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = type === 'movie' ? await getPopularMovies() : await getPopularSeries();
        setItems(response.data.results || []);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };
    fetchItems();
  }, [type]);

  useEffect(() => {
    const fetchVideoKey = async () => {
      if (!items[currentIndex]) return;

      setVideoKey(null);
      setVideoAvailable(true);

      try {
        const endpoint =
          type === 'movie'
            ? `/movie/${items[currentIndex].id}/videos`
            : `/tv/${items[currentIndex].id}/videos`;

        const res = await axios.get(`${API_BASE}${endpoint}`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          params: { language: 'en-US' },
        });

        const trailers = res.data.results.filter(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        );

        if (trailers.length) {
          setVideoKey(trailers[0].key);
        } else {
          setVideoAvailable(false);
        }
      } catch (err) {
        console.error('Video fetch failed:', err);
        setVideoAvailable(false);
      }
    };

    if (items.length) fetchVideoKey();
  }, [items, currentIndex, type]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % items.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [items]);

  const currentItem = items[currentIndex];
  if (!items.length || !currentItem) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  // Navigation functions
  const handleWatchNow = async () => {
    try {
      // Fetch watch providers for this item
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${currentItem.id}/watch/providers`,
        {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }
      );

      const usProviders = response.data.results?.US;
      const streamingPlatforms = usProviders?.flatrate || [];

      if (streamingPlatforms.length > 0) {
        // If streaming platforms are available, open the first one
        const platform = streamingPlatforms[0];
        const platformUrls = {
          8: 'https://www.netflix.com', // Netflix
          119: 'https://www.primevideo.com', // Amazon Prime
          350: 'https://www.appletv.com', // Apple TV+
          220: 'https://www.hulu.com', // Hulu
          192: 'https://www.hbo.com', // HBO
          118: 'https://www.disneyplus.com', // Disney+
        };
        
        const url = platformUrls[platform.provider_id] || 
          `https://www.justwatch.com/us/search?q=${encodeURIComponent(currentItem.title || currentItem.name)}`;
        
        window.open(url, '_blank');
      } else {
        // Fallback to JustWatch if no streaming platforms found
        const title = currentItem.title || currentItem.name;
        const searchQuery = encodeURIComponent(`${title} ${type === 'movie' ? 'movie' : 'tv show'} streaming`);
        const justWatchUrl = `https://www.justwatch.com/us/search?q=${searchQuery}`;
        window.open(justWatchUrl, '_blank');
      }
    } catch (error) {
      console.error('Error fetching watch providers:', error);
      // Fallback to JustWatch
      const title = currentItem.title || currentItem.name;
      const searchQuery = encodeURIComponent(`${title} ${type === 'movie' ? 'movie' : 'tv show'} streaming`);
      const justWatchUrl = `https://www.justwatch.com/us/search?q=${searchQuery}`;
      window.open(justWatchUrl, '_blank');
    }
  };

  const handleMoreInfo = () => {
    const detailPath = type === 'movie' 
      ? `/movie/${currentItem.id}` 
      : `/series/${currentItem.id}`;
    navigate(detailPath);
  };

  return (
    <section className="relative w-full my-8 sm:my-12 md:my-16 px-3 sm:px-4 md:px-10">
      <motion.div 
        className="relative w-full aspect-[16/9] sm:aspect-[16/6] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/10 group"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Background Video/Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {videoKey && videoAvailable ? (
              <iframe
                title={currentItem.title || currentItem.name}
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}&controls=0&modestbranding=1&showinfo=0&rel=0&disablekb=1`}
                className="w-full h-full pointer-events-none"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/original${
                  currentItem.backdrop_path || currentItem.poster_path
                }`}
                alt={currentItem.title || currentItem.name}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-purple-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />

                {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl w-full"
          >
                        {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 border border-white/20"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{type === 'movie' ? 'Featured Movie' : 'Featured Series'}</span>
              <span className="sm:hidden">{type === 'movie' ? 'Movie' : 'Series'}</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight"
            >
              {currentItem.title || currentItem.name}
            </motion.h2>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm text-gray-200"
            >
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                <span>{currentItem.vote_average?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                <span>{formatDate(currentItem.release_date || currentItem.first_air_date)}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-pink-300" />
                <span>{currentItem.vote_count?.toLocaleString() || '0'} votes</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 md:mb-6 leading-relaxed"
            >
              {currentItem.overview || 'No description available'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              <motion.button 
                onClick={handleWatchNow}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg sm:rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Watch Now</span>
                <span className="sm:hidden">Watch</span>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              </motion.button>
              <motion.button 
                onClick={handleMoreInfo}
                className="bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Info className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">More Info</span>
                <span className="sm:hidden">Info</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-6 right-6 hidden md:block">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-white/10"
          />
        </div>

        <div className="absolute bottom-6 left-6 hidden md:block">
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/10"
          />
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.slice(0, 5).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroMiddle;