import React from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieSection = ({ movies }) => {
  const visibleMovies = movies.slice(0, 10); // Show top 10

  return (
    <section className="mb-10">
      {/* Header with Show More */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Popular Movies</h2>
        </div>
        <Link
          to="/movies"
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs sm:text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          Show More
        </Link>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {visibleMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 1 }}
          >
            <Link to={`/movie/${movie.id}`}>
              <div className="rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 transform hover:scale-105 hover:border-purple-500/30 shadow-md hover:shadow-xl hover:shadow-purple-500/25">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                  className="w-full h-90 object-cover"
                />
                <div className="p-2 text-sm font-medium text-white truncate">
                  {movie.title}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
