import React, { useState, useEffect } from 'react';
import { ArrowUpDown, X, TrendingUp, Calendar, Star, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SortDropdown = ({ sortOption, setSortOption, onApply, type = 'movie' }) => {
  const [open, setOpen] = useState(false);
  const [localSortOption, setLocalSortOption] = useState(sortOption);

  const toggleDropdown = () => setOpen(!open);

  // Sync local state with prop when dropdown opens or sortOption changes externally
  useEffect(() => {
    if (open) {
      setLocalSortOption(sortOption);
    }
  }, [open, sortOption]);

  // Options based on type
  const options = type === 'series'
    ? [
        { value: '', label: 'Default', icon: Zap, color: 'text-blue-400' },
        { value: 'popularity.desc', label: 'Most Popular', icon: TrendingUp, color: 'text-green-400' },
        { value: 'popularity.asc', label: 'Least Popular', icon: TrendingUp, color: 'text-green-400' },
        { value: 'first_air_date.desc', label: 'Newest First', icon: Calendar, color: 'text-purple-400' },
        { value: 'first_air_date.asc', label: 'Oldest First', icon: Calendar, color: 'text-purple-400' },
        { value: 'vote_average.desc', label: 'Highest Rated', icon: Star, color: 'text-yellow-400' },
        { value: 'vote_average.asc', label: 'Lowest Rated', icon: Star, color: 'text-yellow-400' },
      ]
    : [
        { value: '', label: 'Default', icon: Zap, color: 'text-blue-400' },
        { value: 'popularity.desc', label: 'Most Popular', icon: TrendingUp, color: 'text-green-400' },
        { value: 'popularity.asc', label: 'Least Popular', icon: TrendingUp, color: 'text-green-400' },
        { value: 'release_date.desc', label: 'Newest First', icon: Calendar, color: 'text-purple-400' },
        { value: 'release_date.asc', label: 'Oldest First', icon: Calendar, color: 'text-purple-400' },
        { value: 'vote_average.desc', label: 'Highest Rated', icon: Star, color: 'text-yellow-400' },
        { value: 'vote_average.asc', label: 'Lowest Rated', icon: Star, color: 'text-yellow-400' },
      ];

  const handleApply = () => {
    setSortOption(localSortOption);
    onApply?.();
    setOpen(false);
  };

  const handleReset = () => {
    setLocalSortOption('');
  };

  const getCurrentSortLabel = () => {
    const currentOption = options.find(option => option.value === localSortOption);
    return currentOption ? currentOption.label : 'Sort By';
  };

  const getCurrentSortIcon = () => {
    const currentOption = options.find(option => option.value === localSortOption);
    return currentOption ? currentOption.icon : ArrowUpDown;
  };

  const getCurrentSortColor = () => {
    const currentOption = options.find(option => option.value === localSortOption);
    return currentOption ? currentOption.color : 'text-gray-400';
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleDropdown}
        className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-2.5 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {React.createElement(getCurrentSortIcon(), { className: `w-4 h-4 ${getCurrentSortColor()}` })}
        <span className="font-medium hidden sm:inline">{getCurrentSortLabel()}</span>
        <span className="font-medium sm:hidden">Sort</span>
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
                      <ArrowUpDown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Sort Options</h3>
                      <p className="text-purple-300 text-sm">Organize your content</p>
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
                {/* Sort Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-white font-medium">
                    <Clock className="w-5 h-5 text-purple-400" />
                    Sort By
                  </label>
                  
                  <div className="space-y-2">
                    {options.map(({ value, label, icon: Icon, color }) => (
                      <motion.button
                        key={value}
                        onClick={() => setLocalSortOption(value)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                          localSortOption === value
                            ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 text-white shadow-lg'
                            : 'bg-gray-800/30 hover:bg-gray-700/50 border border-transparent hover:border-purple-500/30 text-gray-300 hover:text-white'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="font-medium text-base">{label}</span>
                        {localSortOption === value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mobile Quick Sort Presets */}
                <div className="pt-4 border-t border-purple-500/20">
                  <h4 className="text-white font-medium mb-4 text-base">Quick Presets</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => setLocalSortOption('popularity.desc')}
                      className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30 flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="font-medium">Trending</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setLocalSortOption('vote_average.desc')}
                      className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30 flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">Top Rated</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setLocalSortOption('release_date.desc')}
                      className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30 flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <span className="font-medium">Latest</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setLocalSortOption('')}
                      className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30 flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">Default</span>
                    </motion.button>
                  </div>
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
                    Apply Sort
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
              className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden hidden sm:block"
            >
              {/* Desktop Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <ArrowUpDown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Sort Options</h3>
                      <p className="text-purple-300 text-sm">Organize your content</p>
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
              <div className="p-4 space-y-3">
                {/* Sort Options */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    <Clock className="w-4 h-4 text-purple-400" />
                    Sort By
                  </label>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {options.map(({ value, label, icon: Icon, color }) => (
                      <motion.button
                        key={value}
                        onClick={() => setLocalSortOption(value)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                          localSortOption === value
                            ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 text-white shadow-lg'
                            : 'bg-gray-800/30 hover:bg-gray-700/50 border border-transparent hover:border-purple-500/30 text-gray-300 hover:text-white'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="font-medium">{label}</span>
                        {localSortOption === value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Desktop Quick Sort Presets */}
                <div className="pt-2 border-t border-purple-500/20">
                  <h4 className="text-white font-medium mb-3 text-sm">Quick Presets</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      onClick={() => setLocalSortOption('popularity.desc')}
                      className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TrendingUp className="w-3 h-3 text-green-400 mx-auto mb-1" />
                      Trending
                    </motion.button>
                    <motion.button
                      onClick={() => setLocalSortOption('vote_average.desc')}
                      className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Star className="w-3 h-3 text-yellow-400 mx-auto mb-1" />
                      Top Rated
                    </motion.button>
                    <motion.button
                      onClick={() => setLocalSortOption('release_date.desc')}
                      className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Calendar className="w-3 h-3 text-purple-400 mx-auto mb-1" />
                      Latest
                    </motion.button>
                    <motion.button
                      onClick={() => setLocalSortOption('')}
                      className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200 border border-transparent hover:border-purple-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="w-3 h-3 text-blue-400 mx-auto mb-1" />
                      Default
                    </motion.button>
                  </div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="flex gap-3 pt-3 border-t border-purple-500/20">
                  <motion.button
                    onClick={handleReset}
                    className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2.5 rounded-xl transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={handleApply}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Sort
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(107, 114, 128, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
};

export default SortDropdown;
