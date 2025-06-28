import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const HeroBottom = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${API_BASE}/trending/all/week`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          params: { language: 'en-US' },
        });
        setItems(res.data.results.slice(0, 12));
      } catch (err) {
        console.error('Failed to fetch trending:', err);
      }
    };

    fetchTrending();
  }, []);

  // Auto shuffle every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) => shuffleArray(prevItems));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 3 },
    },
  };

  return (
    <section className="w-full bg-[#ded3c4] py-12 px-4 md:px-10 rounded-3xl shadow-inner">
      <div className="flex justify-center items-center gap-3 mb-8">
        <Sparkles className="w-7 h-7 text-[#565878]" />
        <h2 className="text-3xl font-bold text-[#565878] text-center">
          Trending Picks This Week
        </h2>
      </div>

      <motion.div
  layout
  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 max-w-7xl mx-auto"
  transition={{ layout: { duration: 0.8, ease: 'easeInOut' } }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      layout
      layoutId={item.id.toString()}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="bg-[#f7efe3] rounded-xl overflow-hidden shadow-lg transition cursor-pointer"
      onClick={() =>
        navigate(`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`)
      }
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
      <div className="p-2 text-sm font-semibold text-center text-[#444] truncate">
        {item.title || item.name}
      </div>
    </motion.div>
  ))}
</motion.div>


    </section>
  );
};

export default HeroBottom;
