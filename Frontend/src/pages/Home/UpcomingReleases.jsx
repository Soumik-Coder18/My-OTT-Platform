import React, { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../services/movieApi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { CalendarClock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const UpcomingReleases = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await getUpcomingMovies();
        setUpcoming(res.data.results || []);
      } catch (err) {
        console.error('Failed to fetch upcoming movies:', err);
        setUpcoming([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.section
      className="px-6 md:px-10 py-14"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-10 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <CalendarClock className="w-6 h-6 text-white" />
        </div>
        Upcoming Releases
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {upcoming.slice(0, 9).map((movie) => (
          <motion.div
            key={movie.id}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-md hover:shadow-xl hover:shadow-purple-500/25 overflow-hidden hover:scale-[1.02] hover:border-purple-500/30 transition-all duration-300 cursor-pointer flex flex-col"
            onClick={() => navigate(`/movie/${movie.id}`)}
            variants={cardVariants}
            initial="hidden"
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                  : movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/780x439?text=No+Image'
              }
              alt={movie.title}
              className="w-full h-[180px] object-cover"
            />
            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold truncate mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-300">{movie.release_date}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {!upcoming.length && (
        <motion.div
          className="text-center text-gray-400 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No upcoming releases found.
        </motion.div>
      )}
    </motion.section>
  );
};

export default UpcomingReleases;