import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Shield,
  Zap as Lightning,
} from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-6"
        >
          <Sparkles size={48} className="text-white mx-auto" />
        </motion.div>
        
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
          Ready to Discover Amazing Movies?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join our community of movie enthusiasts and start exploring the world of cinema. 
          Get personalized recommendations, detailed insights, and discover your next favorite film.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="flex items-center gap-3 bg-white text-purple-600 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/25 transition-all duration-300"
            >
              <Play size={24} />
              Start Exploring
              <ArrowRight size={24} />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="flex items-center gap-2 border-2 border-white text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-400" />
            <span>Free to join</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-400" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-2">
            <Lightning size={16} className="text-green-400" />
            <span>Instant access</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA; 