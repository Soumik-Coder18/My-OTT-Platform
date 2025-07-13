import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularMovies } from '../../services/movieApi';
import Loader from '../../components/Loader';
import FilterDropdown from '../../components/Filter&Sort/FilterDropdown';
import SortDropdown from '../../components/Filter&Sort/SortDropdown';
import { SearchX, Clapperboard, Film, Star, Play, ExternalLink } from 'lucide-react';
import MovieCard from '../../components/MovieCard';
import { motion, AnimatePresence } from 'framer-motion';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sort_by: '',
    language: '',
    duration: ''
  });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoviesWithFilters(page);
  }, [page, filters]);

  const fetchMoviesWithFilters = (pageNum = 1) => {
    setLoading(true);
    getPopularMovies(filters, pageNum)
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      })
      .catch((err) => console.error('Error fetching filtered movies:', err))
      .finally(() => setLoading(false));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader />;

  const pageNumbers = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Get featured movie for hero section
  const featuredMovie = movies[0];

  const handleWatchNow = () => {
    if (!featuredMovie) return;
    const searchQuery = encodeURIComponent(`${featuredMovie.title} movie streaming`);
    const justWatchUrl = `https://www.justwatch.com/us/search?q=${searchQuery}`;
    window.open(justWatchUrl, '_blank');
  };

  const handleMoreInfo = () => {
    if (!featuredMovie) return;
    navigate(`/movie/${featuredMovie.id}`);
  };

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
      {/* Header Section */}
      <motion.div 
        className="px-4 py-6 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            {/* Left Side - Heading */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Clapperboard className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 md:w-3 md:h-3 text-white fill-current" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                  Popular Movies
                </h1>
                <p className="text-gray-300 text-sm md:text-lg">
                  Discover the latest and greatest films
                </p>
              </div>
            </div>

            {/* Right Side - Filter and Sort */}
            <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
              <motion.button
                onClick={() => navigate('/indian-movies')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Film className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Indian Movies</span>
                <span className="sm:hidden">Indian</span>
              </motion.button>

              <FilterDropdown
                filters={filters}
                setFilters={applyFilters}
                onApply={() => {}}
              />
              <SortDropdown
                type="movie"
                sortOption={filters.sort_by}
                setSortOption={(sort_by) => applyFilters({ ...filters, sort_by })}
                onApply={() => {}}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section - Featured Movie Banner */}
      {featuredMovie && (
        <motion.section 
          className="relative w-full my-4 md:my-8 lg:my-12 px-3 md:px-6 lg:px-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative w-full aspect-[16/10] sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[16/6] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/10 group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Background Image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${
                  featuredMovie.backdrop_path || featuredMovie.poster_path
                }`}
                alt={featuredMovie.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Enhanced Gradient Overlays for Mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent md:from-slate-900/80 md:via-purple-900/40 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent md:from-slate-900 md:via-purple-900/20 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30 md:from-purple-600/20 md:via-transparent md:to-pink-600/20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-full md:max-w-2xl"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-purple-500/95 to-pink-500/95 backdrop-blur-sm text-white px-2.5 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs md:text-sm font-medium mb-2 md:mb-3 lg:mb-4 border border-white/20"
                >
                  <Play className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
                  <span className="hidden xs:inline">Featured Movie</span>
                  <span className="xs:hidden">Featured</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-2 md:mb-3 lg:mb-4 leading-tight"
                >
                  {featuredMovie.title}
                </motion.h2>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4 text-xs md:text-sm text-gray-200"
                >
                  <div className="flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                    <span>{featuredMovie.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{featuredMovie.release_date?.slice(0, 4) || 'N/A'}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1">
                    <span>{featuredMovie.vote_count?.toLocaleString() || '0'} votes</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 md:line-clamp-3 mb-3 md:mb-4 lg:mb-6 leading-relaxed max-w-full md:max-w-2xl"
                >
                  {featuredMovie.overview || 'No description available'}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-wrap gap-2 md:gap-3"
                >
                  <motion.button 
                    onClick={handleWatchNow}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg md:rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm lg:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    <span className="hidden sm:inline">Watch Now</span>
                    <span className="sm:hidden">Watch</span>
                    <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
                  </motion.button>
                  <motion.button 
                    onClick={handleMoreInfo}
                    className="bg-white/10 backdrop-blur-sm text-white px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg md:rounded-xl font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm lg:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden sm:inline">More Info</span>
                    <span className="sm:hidden">Info</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      )}

      {/* All Movies Section */}
      <div className="px-4 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">All Movies</h2>
          </motion.div>

          {/* Movies Grid */}
          <AnimatePresence mode="wait">
            {movies.length > 0 ? (
              <motion.div
                key={`page-${page}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
                  {movies.slice(0, 18).map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <MovieCard media={movie} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <motion.div 
                  className="flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-lg md:rounded-xl font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                      page === 1 
                        ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                    whileHover={page !== 1 ? { scale: 1.05 } : {}}
                    whileTap={page !== 1 ? { scale: 0.95 } : {}}
                  >
                    <span className="hidden sm:inline">← Previous</span>
                    <span className="sm:hidden">←</span>
                  </motion.button>

                  <div className="flex gap-1 md:gap-2">
                    {pageNumbers.map((num) => (
                      <motion.button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`px-3 py-2 md:px-4 md:py-2 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                          num === page 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-105'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-lg md:rounded-xl font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                      page === totalPages 
                        ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                    whileHover={page !== totalPages ? { scale: 1.05 } : {}}
                    whileTap={page !== totalPages ? { scale: 0.95 } : {}}
                  >
                    <span className="hidden sm:inline">Next →</span>
                    <span className="sm:hidden">→</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center mt-24 text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6">
                  <SearchX className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No Matches Found</h2>
                <p className="text-gray-300 text-lg">Try changing your filters to discover more movies</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Movies;