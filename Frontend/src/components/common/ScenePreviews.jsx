import React from 'react';
import { Film } from 'lucide-react';
import { motion } from 'framer-motion';

const ScenePreviews = ({ backdrops }) => {
  if (!backdrops?.length) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 30,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <div className="px-4 md:px-10 mt-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <Film className="w-6 h-6 text-[#555879]" />
        <h2 className="text-xl font-bold text-[#555879]">Scene Previews</h2>
      </div>

      {/* Animated Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {backdrops.map((scene, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-[#e5d7b8] p-4 rounded-xl shadow-lg flex flex-col"
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${scene.file_path}`}
              alt={`Scene ${idx + 1}`}
              className="w-full h-[200px] object-cover rounded-lg mb-3"
            />
            <p className="text-sm font-semibold text-[#555879] text-center">
              Scene {idx + 1}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScenePreviews;
