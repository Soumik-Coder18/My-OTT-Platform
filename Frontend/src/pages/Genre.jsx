import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../services/movieApi';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Film, Star, Sparkles, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Loader from '../components/Loader';

const Genre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [heroItems, setHeroItems] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const itemsPerPage = 18; // 3 rows × 6 columns

  useEffect(() => {
    const fetchGenreAndMovies = async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoading(true);

      try {
        const genresRes = await getGenres();
        const allGenresData = genresRes.data.genres || [];
        setAllGenres(allGenresData);

        const genre = allGenresData.find((g) => String(g.id) === String(id));
        setGenreName(genre ? genre.name : 'Unknown Genre');

        const moviesRes = await getMoviesByGenre(id, page);
        const fetchedMovies = moviesRes.data.results || [];
        // Limit to 18 items (3 rows × 6 columns)
        const limitedMovies = fetchedMovies.slice(0, itemsPerPage);
        setMovies(limitedMovies);
        setHeroItems(fetchedMovies.slice(0, 3));
        setTotalPages(Math.ceil((moviesRes.data.total_results || 0) / itemsPerPage));
      } catch (err) {
        setGenreName('Unknown Genre');
        setMovies([]);
      }

      setLoading(false);
    };

    fetchGenreAndMovies();
  }, [id, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (loading) return <Loader />;

  return (
    <section className="px-4 md:px-10 py-16 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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
            <span className="font-semibold">Genre Collection</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {genreName} <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Movies</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the best {genreName.toLowerCase()} movies and TV shows
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <motion.button
              onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
              className="px-8 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 text-white rounded-xl font-semibold hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlidersHorizontal size={20} />
              Filter by Genre
            </motion.button>

            {genreDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 bg-gray-800/90 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-4 text-center">Select Genre</h4>
                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {allGenres.map((genre) => (
                      <motion.button
                        key={genre.id}
                        onClick={() => {
                          navigate(`/genre/${genre.id}`);
                          setGenreDropdownOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                          String(genre.id) === String(id)
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {genre.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Hero Section */}
        {heroItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Highlights</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {heroItems.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  onClick={() =>
                    navigate(`/${movie.media_type === 'tv' ? 'series' : 'movie'}/${movie.id}`)
                  }
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img
                          src={
                            movie.backdrop_path
                              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                              : 'https://via.placeholder.com/500x280?text=No+Image'
                          }
                          alt={movie.title || movie.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Rating Badge */}
                        {movie.vote_average && (
                          <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400/30 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 text-white fill-current" />
                            <span className="text-xs text-white font-bold">
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </div>
                        )}
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                              <Play className="w-6 h-6 text-white fill-current" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors duration-300">
                          {movie.title || movie.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'N/A'}
                        </p>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {movie.overview || 'No description available.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Movie Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            All <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{genreName}</span> Movies
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 gap-y-8">
            {movies.map((movie, idx) => (
              <motion.div
                key={movie.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: idx * 0.05, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.05 }}
                onClick={() =>
                  navigate(`/${movie.media_type === 'tv' ? 'series' : 'movie'}/${movie.id}`)
                }
              >
                                 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 h-[400px] shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=No+Image'
                        }
                        alt={movie.title || movie.name}
                                                 className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Rating Badge */}
                      {movie.vote_average && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400/30 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 text-white fill-current" />
                          <span className="text-xs text-white font-bold">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      )}
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 leading-tight group-hover:text-purple-200 transition-colors duration-300">
                          {movie.title || movie.name}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-2">
                          {movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'N/A'}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span>Popular</span>
                        </div>
                        
                        <div className="text-purple-300 text-xs font-medium">
                          Click to view
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Movies */}
        {!movies.length && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm">
              <Film className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">No movies available for this genre at the moment.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center items-center gap-3 mt-16"
          >
            <motion.button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                page === 1
                  ? 'cursor-not-allowed opacity-50 border-gray-600 text-gray-500'
                  : 'border-purple-500/30 text-white hover:bg-purple-500/20 hover:border-purple-500/50'
              }`}
              whileHover={page !== 1 ? { scale: 1.05 } : {}}
              whileTap={page !== 1 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>

            <div className="flex gap-2">
              {renderPageNumbers().map((num) => (
                <motion.button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                    num === page
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg'
                      : 'border-purple-500/30 text-white hover:bg-purple-500/20 hover:border-purple-500/50'
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
              className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                page === totalPages
                  ? 'cursor-not-allowed opacity-50 border-gray-600 text-gray-500'
                  : 'border-purple-500/30 text-white hover:bg-purple-500/20 hover:border-purple-500/50'
              }`}
              whileHover={page !== totalPages ? { scale: 1.05 } : {}}
              whileTap={page !== totalPages ? { scale: 0.95 } : {}}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Genre;