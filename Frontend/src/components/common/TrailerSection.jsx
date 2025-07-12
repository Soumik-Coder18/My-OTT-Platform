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
    <motion.section
      className="px-4 md:px-10 py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
            <Clapperboard className="w-5 h-5" />
            <span className="font-semibold">Official Trailer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Watch the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Trailer</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get a sneak peek into the world of this incredible story
          </p>
        </motion.div>

        {/* Trailer Container */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
          
          {/* Trailer Iframe */}
          <motion.div
            className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.02, 
              boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)',
              borderColor: 'rgba(168, 85, 247, 0.5)'
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-400 rounded-tl-lg opacity-60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-pink-400 rounded-tr-lg opacity-60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400 rounded-bl-lg opacity-60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400 rounded-br-lg opacity-60" />

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>

          {/* Info Bar */}
          <motion.div
            className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Official Trailer</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span>YouTube</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <span>HD Quality</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-20 w-12 h-12 opacity-20"
        >
          <div className="w-full h-full border-2 border-purple-400 rounded-full flex items-center justify-center">
            <Clapperboard size={16} className="text-purple-400" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -12, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 right-20 w-10 h-10 opacity-20"
        >
          <div className="w-full h-full border-2 border-pink-400 rounded-full flex items-center justify-center">
            <Clapperboard size={14} className="text-pink-400" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrailerSection;
