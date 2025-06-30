import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIndianMovies } from '../../services/movieApi';
import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';
import Loader from '../../components/Loader';
import MovieCard from '../../components/MovieCard'; // ✅ Import MovieCard

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

  const fetchMovies = async (langCode, currentPage) => {
    setLoading(true);
    try {
      const res = await getIndianMovies(langCode, currentPage, 'IN');
      setMovies(res.data.results || []);
      setTotalPages(res.data.total_pages || 1);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(activeLang, page);
  }, [activeLang, page]);

  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
    setPage(1); // reset page when language changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader />;

  return (
    <section className="px-4 md:px-10 py-10 bg-[#F4EBD3] min-h-screen">
      {/* Heading */}
      <motion.h2
        className="text-4xl font-extrabold text-[#555879] mb-10 text-center flex justify-center items-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Clapperboard className="w-7 h-7" /> Popular Indian Movies
      </motion.h2>

      {/* Language Selector */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={`px-4 py-2 rounded-full font-semibold transition-all border
              ${
                activeLang === code
                  ? 'bg-[#555879] text-[#F4EBD3]'
                  : 'bg-transparent text-[#555879] hover:bg-[#555879] hover:text-[#F4EBD3]'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, idx) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.4 }}
          >
            <MovieCard media={movie} />
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-10 text-[#555879]">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded border ${
            page === 1
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
          }`}
        >
          Previous
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = Math.max(1, page - 2) + i;
          if (pageNum > totalPages) return null;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded border ${
                pageNum === page
                  ? 'bg-[#555879] text-[#F4EBD3]'
                  : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded border ${
            page === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default IndianMovie;