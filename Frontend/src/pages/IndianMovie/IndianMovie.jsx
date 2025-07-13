import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIndianMovies } from '../../services/movieApi';
import { motion } from 'framer-motion';
import { Clapperboard, Star, Filter, Sparkles, ChevronDown } from 'lucide-react';
import Loader from '../../components/Loader';
import MovieCard from '../../components/MovieCard';
import { createPortal } from 'react-dom';

const LANGUAGES = [
  { code: 'hi', label: 'Hindi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'kn', label: 'Kannada' },
  { code: 'bn', label: 'Bengali' },
  { code: 'mr', label: 'Marathi' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'pa', label: 'Punjabi' },
];

const IndianMovie = () => {
  const [activeLang, setActiveLang] = useState('hi');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownBtnRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const fetchMovies = async (langCode, currentPage) => {
    setLoading(true);
    try {
      const res = await getIndianMovies(langCode, currentPage, 'IN');
      // Limit to exactly 18 items (3 rows of 6 items)
      setMovies((res.data.results || []).slice(0, 18));
      setTotalPages(res.data.total_pages || 1);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(activeLang, page);
  }, [activeLang, page]);

  // Update dropdown position when opened
  useEffect(() => {
    if (isDropdownOpen && dropdownBtnRef.current) {
      const rect = dropdownBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownBtnRef.current &&
        !dropdownBtnRef.current.contains(event.target) &&
        !document.getElementById('mobile-lang-dropdown-portal')?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
    setPage(1);
    setIsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader />;

  const mobileDropdown = isDropdownOpen && createPortal(
    <motion.div
      id="mobile-lang-dropdown-portal"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto overscroll-contain fixed"
      style={{
        top: dropdownPos.top,
        left: dropdownPos.left,
        width: dropdownPos.width,
      }}
    >
      {LANGUAGES.map(({ code, label }) => (
        <motion.button
          key={code}
          onClick={() => handleLanguageChange(code)}
          className={`w-full text-left px-4 py-4 text-base font-medium transition-all duration-300 ${
            activeLang === code
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'text-white hover:bg-white/10'
          } ${code === LANGUAGES[0].code ? 'rounded-t-lg' : ''} ${code === LANGUAGES[LANGUAGES.length - 1].code ? 'rounded-b-lg' : ''}`}
          whileHover={{ backgroundColor: activeLang === code ? undefined : 'rgba(255, 255, 255, 0.1)' }}
        >
          {label}
        </motion.button>
      ))}
    </motion.div>,
    document.body
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <motion.section 
        className="relative py-12 md:py-16 lg:py-20 px-3 md:px-6 lg:px-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 md:w-40 md:h-40 bg-pink-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-60 md:h-60 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8 md:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Bollywood & Regional Cinema</span>
            </motion.div>
            
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Indian <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Movies</span>
            </motion.h1>
            
            <motion.p
              className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover the best of Indian cinema across all languages and genres
            </motion.p>
          </motion.div>

          {/* Language Filter */}
          <motion.div
            className="mb-8 md:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Filter className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
              <span className="text-purple-300 font-medium text-sm md:text-base">Filter by Language</span>
            </div>
            
            {/* Mobile Dropdown */}
            <div className="md:hidden flex justify-center px-4">
              <div className="relative w-full max-w-xs dropdown-container">
                <motion.button
                  ref={dropdownBtnRef}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-between hover:bg-white/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{LANGUAGES.find(lang => lang.code === activeLang)?.label}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </motion.button>
                {mobileDropdown}
              </div>
            </div>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex justify-center gap-3 flex-wrap px-4">
              {LANGUAGES.map(({ code, label }) => (
                <motion.button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-base ${
                    activeLang === code
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:scale-105'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Movies Grid Section */}
      <motion.section 
        className="px-3 md:px-6 lg:px-10 pb-12 md:pb-16 lg:pb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Clapperboard className="w-5 h-5 md:w-6 md:h-6 text-purple-300" />
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {LANGUAGES.find(lang => lang.code === activeLang)?.label} Movies
              </h2>
            </div>
            <div className="text-gray-300 text-sm md:text-base">
              Page {page} of {totalPages}
            </div>
          </motion.div>

          {/* Movies Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6 gap-y-8 md:gap-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {movies.map((movie, idx) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.1 * idx, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="h-[420px] w-full flex flex-col"
              >
                <div className="flex-1">
                  <MovieCard media={movie} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Show message if no movies */}
          {movies.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-gray-400 text-xl">No movies found for this language</div>
            </motion.div>
          )}

          {/* Enhanced Pagination */}
          <motion.div
            className="flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                page === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:scale-105'
              }`}
              whileHover={page !== 1 ? { scale: 1.05 } : {}}
              whileTap={page !== 1 ? { scale: 0.95 } : {}}
            >
              <span className="hidden sm:inline">← Previous</span>
              <span className="sm:hidden">←</span>
            </motion.button>

            <div className="flex gap-1 md:gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, page - 2) + i;
                if (pageNum > totalPages) return null;
                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                      pageNum === page
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 md:gap-2 text-sm md:text-base ${
                page === totalPages
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:scale-105'
              }`}
              whileHover={page !== totalPages ? { scale: 1.05 } : {}}
              whileTap={page !== totalPages ? { scale: 0.95 } : {}}
            >
              <span className="hidden sm:inline">Next →</span>
              <span className="sm:hidden">→</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default IndianMovie;