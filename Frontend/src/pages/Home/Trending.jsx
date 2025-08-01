import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const Trending = () => {
  const [topRow, setTopRow] = useState([]);
  const [bottomRow, setBottomRow] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${API_BASE}/trending/all/week`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          params: { language: 'en-US' },
        });
        const data = res.data.results.slice(0, 12);
        setTopRow(data.slice(0, 6));
        setBottomRow(data.slice(6));
      } catch (err) {
        console.error('Failed to fetch trending:', err);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopRow((prev) => {
        const rotated = [...prev];
        const first = rotated.shift();
        rotated.push(first);
        return rotated;
      });
      setBottomRow((prev) => {
        const rotated = [...prev];
        const last = rotated.pop();
        rotated.unshift(last);
        return rotated;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 120,
      rotateX: 30,
      scale: 0.85,
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 22,
        duration: 0.7,
      },
    },
    exit: {
      opacity: 0,
      y: -60,
      rotateX: -15,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  const renderRow = (row) =>
    row.map((item) => (
      <motion.div
        key={`${item.id}-${item.media_type}`}
        layout
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover={{
          scale: 1.12,
          rotateY: 6,
          zIndex: 5,
          transition: { type: 'spring', stiffness: 150 },
        }}
        onClick={() =>
          navigate(`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`)
        }
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 hover:border-purple-500/30 cursor-pointer transform-gpu"
      >
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          alt={item.title || item.name}
          className="w-full h-[250px] object-cover"
        />
                  <div className="p-2 text-sm font-semibold text-center text-white truncate">
            {item.title || item.name}
          </div>
      </motion.div>
    ));

  return (
    <section className="w-full bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 py-8 sm:py-12 md:py-14 px-3 sm:px-4 md:px-10 rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex justify-center items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-wide">
          Trending Picks This Week
        </h2>
      </div>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-7 max-w-7xl mx-auto mb-8 sm:mb-10"
        >
          {renderRow(topRow)}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-7 max-w-7xl mx-auto"
        >
          {renderRow(bottomRow)}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Trending;