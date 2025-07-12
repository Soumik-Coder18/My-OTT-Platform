import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500/90 to-emerald-500/90',
          border: 'border-green-400/30',
          icon: 'text-green-300',
          glow: 'shadow-green-500/25',
          accent: 'from-green-400 to-emerald-400'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500/90 to-pink-500/90',
          border: 'border-red-400/30',
          icon: 'text-red-300',
          glow: 'shadow-red-500/25',
          accent: 'from-red-400 to-pink-400'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90',
          border: 'border-yellow-400/30',
          icon: 'text-yellow-300',
          glow: 'shadow-yellow-500/25',
          accent: 'from-yellow-400 to-orange-400'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-purple-500/90 to-pink-500/90',
          border: 'border-purple-400/30',
          icon: 'text-purple-300',
          glow: 'shadow-purple-500/25',
          accent: 'from-purple-400 to-pink-400'
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3, x: 100 }}
        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.5, x: 100, transition: { duration: 0.2 } }}
        className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${colors.glow} backdrop-blur-sm border ${colors.border} ${colors.bg} text-white`}
        style={{ pointerEvents: 'auto' }}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.accent} rounded-2xl blur-xl opacity-20`} />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Icon Container */}
          <div className={`p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full ${colors.icon}`}>
            {getIcon()}
          </div>
          
          {/* Message */}
          <div className="flex-1">
            <span className="font-semibold text-white">{message}</span>
          </div>
          
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-white"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
        
        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-2xl"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast; 