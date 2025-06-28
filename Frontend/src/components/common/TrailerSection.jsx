import React from 'react';
import { Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

const TrailerSection = ({ trailerKey }) => {
  if (!trailerKey) return null;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className="px-6 md:px-10 mt-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <Clapperboard className="w-6 h-6 text-[#555879]" />
        <h2 className="text-xl font-bold text-[#555879]">Trailer</h2>
      </div>

      {/* Trailer Iframe */}
      <motion.div
        className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl border border-[#e5d7b8]"
        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,0,0,0.15)' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allowFullScreen
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default TrailerSection;
