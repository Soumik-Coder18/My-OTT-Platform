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
        className="px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left Side - Heading */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Clapperboard className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Popular Movies
                </h1>
                <p className="text-gray-300 text-lg">
                  Discover the latest and greatest films
                </p>
              </div>
            </div>

            {/* Right Side - Filter and Sort */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate('/indian-movies')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Film className="w-5 h-5" />
                Indian Movies
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
          className="relative w-full my-12 px-4 md:px-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative w-full aspect-[16/9] sm:aspect-[16/6] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/10 group"
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

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-purple-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/20"
                >
                  <Play className="w-4 h-4" />
                  Featured Movie
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                >
                  {featuredMovie.title}
                </motion.h2>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-200"
                >
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{featuredMovie.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{featuredMovie.release_date?.slice(0, 4) || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{featuredMovie.vote_count?.toLocaleString() || '0'} votes</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-sm sm:text-base text-gray-200 line-clamp-3 mb-6 leading-relaxed"
                >
                  {featuredMovie.overview || 'No description available'}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  <motion.button 
                    onClick={handleWatchNow}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    Watch Now
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                  <motion.button 
                    onClick={handleMoreInfo}
                    className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    More Info
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      )}

      {/* All Movies Section */}
      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">All Movies</h2>
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
                  className="flex justify-center items-center gap-3 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      page === 1 
                        ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                    whileHover={page !== 1 ? { scale: 1.05 } : {}}
                    whileTap={page !== 1 ? { scale: 0.95 } : {}}
                  >
                    ← Previous
                  </motion.button>

                  <div className="flex gap-2">
                    {pageNumbers.map((num) => (
                      <motion.button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
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
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      page === totalPages 
                        ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                    whileHover={page !== totalPages ? { scale: 1.05 } : {}}
                    whileTap={page !== totalPages ? { scale: 0.95 } : {}}
                  >
                    Next →
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