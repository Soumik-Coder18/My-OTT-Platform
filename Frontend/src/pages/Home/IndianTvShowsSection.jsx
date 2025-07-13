import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tv } from 'lucide-react';
import { getIndianTvShows } from '../../services/movieApi';
import { motion } from 'framer-motion';

const LANGUAGES = ['hi', 'ta', 'te', 'bn'];

const IndianTvShowsSection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchIndianTvShows = async () => {
      try {
        const responses = await Promise.all(
          LANGUAGES.map((lang) => getIndianTvShows(lang, 1))
        );
        const combined = responses.flatMap((res) => res.data.results);
        const unique = Array.from(new Map(combined.map((s) => [s.id, s])).values());
        const top16 = unique.sort((a, b) => b.popularity - a.popularity).slice(0, 16);

        setShows(top16);
      } catch (err) {
        console.error('Failed to fetch Indian TV shows:', err);
      }
    };

    fetchIndianTvShows();
  }, []);

  if (!shows.length) return null;

  return (
    <motion.section
      className="px-3 sm:px-4 md:px-10 py-8 sm:py-10 md:py-12 bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm border border-white/10 rounded-2xl mb-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header with Show More */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Popular Indian TV Shows</h2>
        </div>
        <Link
          to="/indian-show"
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs sm:text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          Show More
        </Link>
      </div>

      {/* TV Show Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
        {shows.map((show, index) => (
          <motion.div
            key={show.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Link
              to={`/series/${show.id}`}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow hover:shadow-lg hover:shadow-purple-500/25 hover:border-purple-500/30 transition-all duration-300"
            >
              <img
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={show.name}
                className="w-full h-[200px] sm:h-[240px] object-cover rounded-t-2xl"
              />
              <div className="p-2 text-white">
                <h3 className="text-sm font-semibold truncate">{show.name}</h3>
                <p className="text-xs text-gray-300">
                  {show.first_air_date?.slice(0, 4)} • ⭐ {show.vote_average}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default IndianTvShowsSection;