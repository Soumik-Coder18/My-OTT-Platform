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
    <motion.section 
      className="px-4 md:px-10 py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
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
            <Film className="w-5 h-5" />
            <span className="font-semibold">Behind the Scenes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Scene <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Previews</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Take a closer look at the stunning visuals and cinematography
          </p>
        </motion.div>

        {/* Scene Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {backdrops.map((scene, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -8, scale: 1.05 }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w780${scene.file_path}`}
                    alt={`Scene ${idx + 1}`}
                    className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Scene Number Badge */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                    <span className="text-white text-xs font-bold">#{idx + 1}</span>
                  </div>
                  

                  
                  {/* Corner Decorations */}
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-purple-400 rounded-tr-lg opacity-60" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-pink-400 rounded-bl-lg opacity-60" />
                </div>
                
                {/* Scene Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-lg">Scene {idx + 1}</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-300">HD</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>Cinematography</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span>High Quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 px-6 py-3 rounded-full backdrop-blur-sm">
            <Film className="w-5 h-5" />
            <span className="font-medium">Explore {backdrops.length} stunning scenes</span>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-16 h-16 opacity-20"
        >
          <div className="w-full h-full border-2 border-purple-400 rounded-full flex items-center justify-center">
            <Film size={24} className="text-purple-400" />
          </div>
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-12 h-12 opacity-20"
        >
          <div className="w-full h-full border-2 border-pink-400 rounded-full flex items-center justify-center">
            <Film size={20} className="text-pink-400" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ScenePreviews;
