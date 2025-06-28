import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = ({ featured }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, featured]);

  const startAutoScroll = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featured.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  if (!Array.isArray(featured) || featured.length === 0) return null;

  const currentItem = featured[currentIndex];

  // Determine type: movie or series
  const isMovie = currentItem.hasOwnProperty('title');
  const detailPath = isMovie
    ? `/movie/${currentItem.id}`
    : `/series/${currentItem.id}`;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden mb-12 rounded-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Link to={detailPath}>
            <img
              src={`https://image.tmdb.org/t/p/original${
                currentItem.backdrop_path || currentItem.poster_path
              }`}
              alt={currentItem.title || currentItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-8 flex flex-col justify-end">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {currentItem.title || currentItem.name}
              </h2>
              <p className="text-sm md:text-base text-gray-200 max-w-2xl line-clamp-3">
                {currentItem.overview}
              </p>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featured.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
