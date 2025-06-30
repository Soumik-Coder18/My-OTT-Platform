import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { getIndianMovies } from '../../services/movieApi';
import { motion } from 'framer-motion';

const LANGUAGES = ['hi', 'ta', 'te', 'bn'];

const IndianMoviesSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchIndianMovies = async () => {
      try {
        const responses = await Promise.all(
          LANGUAGES.map((lang) => getIndianMovies(lang, 1, 'IN'))
        );
        const combined = responses.flatMap((res) => res.data.results);
        const unique = Array.from(new Map(combined.map((m) => [m.id, m])).values());
        const top16 = unique.sort((a, b) => b.popularity - a.popularity).slice(0, 16);

        setMovies(top16);
      } catch (err) {
        console.error('Failed to fetch Indian movies:', err);
      }
    };

    fetchIndianMovies();
  }, []);

  if (!movies.length) return null;

  return (
    <motion.section
      className="px-4 md:px-10 py-12 bg-[#F4EBD3]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header with Show More */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-[#555879]" />
          <h2 className="text-2xl font-semibold text-[#555879]">Popular Indian Movies</h2>
        </div>
        <Link
          to="/indian-movies"
          className="px-4 py-2 bg-[#DED3C4] text-[#222] rounded-full text-sm font-medium hover:scale-105 transition-transform"
        >
          Show More
        </Link>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Link
              to={`/movie/${movie.id}`}
              className="bg-[#DED3C4] rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
                className="w-full h-[200px] sm:h-[240px] object-cover rounded-t-2xl"
              />
              <div className="p-2 text-[#555879]">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-xs text-[#888da8]">
                  {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default IndianMoviesSection;