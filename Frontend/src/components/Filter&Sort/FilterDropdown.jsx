import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X, Filter, Sparkles, Calendar, Star, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterDropdown = ({ filters, setFilters, onApply }) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync localFilters with incoming filters when dropdown opens or filters change externally
  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [filters, open]);

  const toggleDropdown = () => setOpen(!open);

  const handleApply = () => {
    setFilters(localFilters);
    onApply?.();
    setOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      genre: '',
      rating: '',
      year: '',
      language: '',
      duration: ''
    };
    setLocalFilters(resetFilters);
  };

  const hasActiveFilters = () => {
    return localFilters.genre || localFilters.rating || localFilters.year || localFilters.language || localFilters.duration;
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.genre) count++;
    if (localFilters.rating) count++;
    if (localFilters.year) count++;
    if (localFilters.language) count++;
    if (localFilters.duration) count++;
    return count;
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleDropdown}
        className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-2.5 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium hidden sm:inline">Filters</span>
        <span className="font-medium sm:hidden">Filter</span>
        {hasActiveFilters() && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {getActiveFilterCount()}
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            
            {/* Mobile Full Screen Modal */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 backdrop-blur-xl border-t border-purple-500/30 rounded-t-3xl shadow-2xl z-50 overflow-hidden sm:hidden"
            >
              {/* Mobile Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <SlidersHorizontal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Filters</h3>
                      <p className="text-purple-300 text-sm">Refine your search</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Genre Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Film className="w-5 h-5 text-purple-400" />
                    Genre
                  </label>
                  <select
                    value={localFilters.genre}
                    onChange={(e) => setLocalFilters({ ...localFilters, genre: e.target.value })}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  >
                    <option value="">All Genres</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Science Fiction</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Minimum Rating
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={localFilters.rating}
                      onChange={(e) => setLocalFilters({ ...localFilters, rating: e.target.value })}
                      placeholder="0.0 - 10.0"
                      className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">★</span>
                  </div>
                </div>

                {/* Year Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    Release Year
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={localFilters.year}
                    onChange={(e) => setLocalFilters({ ...localFilters, year: e.target.value })}
                    placeholder={`1900 - ${new Date().getFullYear()}`}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  />
                </div>

                {/* Language Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    Language
                  </label>
                  <select
                    value={localFilters.language}
                    onChange={(e) => setLocalFilters({ ...localFilters, language: e.target.value })}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  >
                    <option value="">All Languages</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                    <option value="ml">Malayalam</option>
                    <option value="kn">Kannada</option>
                    <option value="bn">Bengali</option>
                    <option value="mr">Marathi</option>
                    <option value="gu">Gujarati</option>
                    <option value="pa">Punjabi</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                {/* Duration Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Film className="w-5 h-5 text-orange-400" />
                    Duration (minutes)
                  </label>
                  <select
                    value={localFilters.duration}
                    onChange={(e) => setLocalFilters({ ...localFilters, duration: e.target.value })}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  >
                    <option value="">Any Duration</option>
                    <option value="short">Short (Under 90 min)</option>
                    <option value="medium">Medium (90-120 min)</option>
                    <option value="long">Long (Over 120 min)</option>
                  </select>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex gap-3 pt-4 pb-6">
                  <motion.button
                    onClick={handleReset}
                    className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-4 rounded-xl transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 focus:outline-none focus:ring-2 focus:ring-gray-500 text-base font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={handleApply}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Desktop Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 mt-3 w-80 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden hidden sm:block"
            >
              {/* Desktop Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <SlidersHorizontal className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Filters</h3>
                      <p className="text-purple-300 text-sm">Refine your search</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Desktop Content */}
              <div className="p-4 space-y-4">
                {/* Genre Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Film className="w-4 h-4 text-purple-400" />
                    Genre
                  </label>
                  <select
                    value={localFilters.genre}
                    onChange={(e) => setLocalFilters({ ...localFilters, genre: e.target.value })}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">All Genres</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Science Fiction</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Minimum Rating
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={localFilters.rating}
                      onChange={(e) => setLocalFilters({ ...localFilters, rating: e.target.value })}
                      placeholder="0.0 - 10.0"
                      className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">★</span>
                  </div>
                </div>

                {/* Year Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Release Year
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={localFilters.year}
                    onChange={(e) => setLocalFilters({ ...localFilters, year: e.target.value })}
                    placeholder={`1900 - ${new Date().getFullYear()}`}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Language Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    Language
                  </label>
                  <select
                    value={localFilters.language}
                    onChange={(e) => setLocalFilters({ ...localFilters, language: e.target.value })}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">All Languages</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                    <option value="ml">Malayalam</option>
                    <option value="kn">Kannada</option>
                    <option value="bn">Bengali</option>
                    <option value="mr">Marathi</option>
                    <option value="gu">Gujarati</option>
                    <option value="pa">Punjabi</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                {/* Duration Filter */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Film className="w-4 h-4 text-orange-400" />
                    Duration (minutes)
                  </label>
                  <select
                    value={localFilters.duration}
                    onChange={(e) => setLocalFilters({ ...localFilters, duration: e.target.value })}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Any Duration</option>
                    <option value="short">Short (Under 90 min)</option>
                    <option value="medium">Medium (90-120 min)</option>
                    <option value="long">Long (Over 120 min)</option>
                  </select>
                </div>

                {/* Desktop Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    onClick={handleReset}
                    className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2.5 rounded-xl transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={handleApply}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
