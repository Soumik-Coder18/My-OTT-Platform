import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { motion, useAnimationFrame } from 'framer-motion';

const YouMightAlsoLike = ({ recommended, setLoading, type = 'movie' }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const x = useRef(0);

  const speed = 0.5; // adjust this to control scroll speed

  useAnimationFrame((_, delta) => {
    if (!trackRef.current || !containerRef.current) return;

    x.current -= speed * (delta / 16); // smooth per frame

    const scrollWidth = trackRef.current.scrollWidth / 2;

    // Reset loop
    if (Math.abs(x.current) >= scrollWidth) {
      x.current = 0;
    }

    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  if (!recommended?.length) return null;

  // Duplicate items for seamless scroll
  const duplicated = [...recommended, ...recommended];

  return (
    <motion.section 
      className="px-4 md:px-10 py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">You Might Also Like</h2>
        </motion.div>

        {/* Scrolling Container */}
        <div
          ref={containerRef}
          className="relative overflow-x-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm py-6"
        >
          <div
            ref={trackRef}
            className="flex gap-6 min-w-max transition-transform duration-300"
            style={{ willChange: 'transform' }}
          >
            {duplicated.map((item, idx) => (
              <motion.div
                key={idx}
                className="w-48 flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                onClick={() => navigate(`/${type === 'series' ? 'series' : 'movie'}/${item.id}`)}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                    }
                    alt={item.title || item.name}
                    className="w-full h-64 object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-3 text-center">
                  <p className="text-white font-semibold truncate text-sm">
                    {item.title || item.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default YouMightAlsoLike;
