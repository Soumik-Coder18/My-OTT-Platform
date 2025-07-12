import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrending } from '../../services/movieApi';
import {
  Film,
  Video,
  Star,
  Play,
  ArrowRight,
  Sparkles,
  Eye,
} from 'lucide-react';

const Hero = () => {
  const [trending, setTrending] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trendingRes = await getTrending();
        setTrending(trendingRes.data.results.slice(0, 4));
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    };

    fetchTrending();
  }, []);

  // Auto-rotate featured content
  useEffect(() => {
    if (trending.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % trending.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [trending.length]);

  return (
    <>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90"></div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-16 h-16 opacity-10"
        >
          <div className="w-full h-full border-2 border-purple-400 rounded-full flex items-center justify-center">
            <Film size={24} className="text-purple-400" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-32 w-12 h-12 opacity-10"
        >
          <div className="w-full h-full border-2 border-pink-400 rounded-full flex items-center justify-center">
            <Video size={20} className="text-pink-400" />
          </div>
        </motion.div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #a855f7 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-8 backdrop-blur-sm"
              >
                <Sparkles size={20} className="text-pink-400" />
                <span className="font-semibold">🎬 Your Ultimate Movie Experience</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Amazing
                </span>
                <br />
                <span className="text-white">Movies</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Your curated guide to the world's best films and TV series. 
                <span className="text-purple-300 font-semibold"> Get personalized recommendations</span>, explore detailed insights, and discover your next favorite.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="group flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <Play size={24} className="group-hover:scale-110 transition-transform" />
                    Start Exploring
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <Eye size={24} className="group-hover:scale-110 transition-transform" />
                    Sign In
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Movie Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              {trending.length > 0 && (
                <div className="relative h-[600px] rounded-3xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="relative h-full">
                        <img
                          src={`https://image.tmdb.org/t/p/original${trending[currentSlide]?.backdrop_path || trending[currentSlide]?.poster_path}`}
                          alt={trending[currentSlide]?.title || trending[currentSlide]?.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                              <Star size={14} fill="currentColor" />
                              {trending[currentSlide]?.vote_average?.toFixed(1) || 'N/A'}
                            </div>
                            <div className="text-white/80 text-sm">
                              {trending[currentSlide]?.release_date?.split('-')[0] || trending[currentSlide]?.first_air_date?.split('-')[0] || 'N/A'}
                            </div>
                          </div>
                          
                          <h3 className="text-3xl font-bold text-white mb-4">
                            {trending[currentSlide]?.title || trending[currentSlide]?.name}
                          </h3>
                          
                          <p className="text-gray-300 text-lg line-clamp-3 mb-6">
                            {trending[currentSlide]?.overview}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {trending.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? 'bg-purple-500 w-8'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero; 