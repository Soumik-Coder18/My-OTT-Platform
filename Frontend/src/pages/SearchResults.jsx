import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Film, Tv, Star, Play, Filter, Grid, List, X, Calendar, Clock } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const searchQuery = location.state?.query || '';
  
  const [filteredResults, setFilteredResults] = useState(results);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'rating', 'date'
  const [mediaFilter, setMediaFilter] = useState('all'); // 'all', 'movie', 'tv'
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Navigate to NotFound page if no results are found
    if (results.length === 0) {
      navigate('/404');
    }
  }, [results, navigate]);

  // Filter and sort results
  useEffect(() => {
    let filtered = [...results];

    // Filter by media type
    if (mediaFilter !== 'all') {
      filtered = filtered.filter(item => {
        const isTV = !!item?.first_air_date;
        return mediaFilter === 'tv' ? isTV : !isTV;
      });
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        break;
      case 'date':
        filtered.sort((a, b) => {
          const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
          const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
          return dateB - dateA;
        });
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredResults(filtered);
  }, [results, sortBy, mediaFilter]);

  // If no results, don't render anything (will navigate to NotFound)
  if (results.length === 0) {
    return null;
  }

  const MovieCard = ({ item, index }) => {
    const isTV = !!item?.first_air_date;
    const title = item?.title || item?.name || 'Untitled';
    const date = item?.release_date || item?.first_air_date || '—';
    const rating = item?.vote_average?.toFixed(1) || '—';
    const path = isTV ? `/series/${item.id}` : `/movie/${item.id}`;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        className="group cursor-pointer"
      >
        <Link to={path}>
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 rounded-xl overflow-hidden">
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={title}
                className="w-full h-[180px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Play className="w-6 h-6 text-white fill-current" />
                </div>
              </div>
              
              {/* Rating Badge */}
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs font-medium">{rating}</span>
              </div>
              
              {/* Type Badge */}
              <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-2 py-1 flex items-center gap-1">
                {isTV ? (
                  <Tv className="w-3 h-3 text-white" />
                ) : (
                  <Film className="w-3 h-3 text-white" />
                )}
                <span className="text-white text-xs font-medium">
                  {isTV ? 'TV' : 'Movie'}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-2 md:p-3">
              <h3 className="text-white font-bold text-xs md:text-sm mb-1 md:mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                {title}
              </h3>
              <div className="flex items-center justify-between text-gray-300 text-[10px] md:text-xs">
                <span>{date.slice(0, 4)}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{rating}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const ListCard = ({ item, index }) => {
    const isTV = !!item?.first_air_date;
    const title = item?.title || item?.name || 'Untitled';
    const date = item?.release_date || item?.first_air_date || '—';
    const rating = item?.vote_average?.toFixed(1) || '—';
    const path = isTV ? `/series/${item.id}` : `/movie/${item.id}`;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        className="group cursor-pointer"
      >
        <Link to={path}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-2 md:p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 rounded-xl">
            {/* Image */}
            <div className="relative w-14 h-20 md:w-16 md:h-24 flex-shrink-0">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-1 left-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-1 py-0.5">
                <span className="text-white text-xs font-medium">
                  {isTV ? 'TV' : 'Movie'}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2 group-hover:text-purple-300 transition-colors duration-300 truncate">
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-300 text-xs md:text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{date.slice(0, 4)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{isTV ? 'TV Series' : 'Movie'}</span>
                </div>
              </div>
            </div>
            
            {/* Play Button */}
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 md:mt-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-current" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="relative z-10 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Search Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Search Results
              </h1>
              {searchQuery && (
                <p className="text-xl text-gray-300 mb-2">
                  Results for "<span className="text-purple-300 font-semibold">{searchQuery}</span>"
                </p>
              )}
              <p className="text-gray-400">
                Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} 
                {filteredResults.length !== results.length && ` (filtered from ${results.length} total)`}
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between mb-6 md:mb-8 p-2 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2 md:gap-4 w-full md:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-4"
                  >
                    <select
                      value={mediaFilter}
                      onChange={(e) => setMediaFilter(e.target.value)}
                      className="px-2 py-1 md:px-3 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-purple-500"
                    >
                      <option value="all">All Media</option>
                      <option value="movie">Movies Only</option>
                      <option value="tv">TV Shows Only</option>
                    </select>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-2 py-1 md:px-3 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-purple-500"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="date">Sort by Date</option>
                    </select>
                  </motion.div>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 md:p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Grid className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 md:p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <List className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <div className="p-4 md:p-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6"
              >
                {filteredResults.map((item, index) => (
                  <MovieCard key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2 md:space-y-4"
              >
                {filteredResults.map((item, index) => (
                  <ListCard key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results Message */}
          {filteredResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setMediaFilter('all');
                  setSortBy('relevance');
                  setShowFilters(false);
                }}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchResults;
