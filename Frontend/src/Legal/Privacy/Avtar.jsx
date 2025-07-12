import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Avatar = () => {
  const [isBlind, setIsBlind] = useState(false);

  return (
    <motion.div 
      className="relative flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <input 
        type="checkbox" 
        id="blind-input" 
        className="hidden" 
        checked={isBlind}
        onChange={() => setIsBlind(!isBlind)}
      />
      
      <motion.label 
        htmlFor="blind-input" 
        className="w-[166px] h-[166px] min-w-[166px] max-w-[166px] min-h-[166px] max-h-[166px] border-2 border-purple-500/30 rounded-full overflow-hidden cursor-pointer relative flex justify-center items-center perspective-[80px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Monkey SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width={156} 
          height={156} 
          viewBox="0 0 64 64" 
          id="monkey"
          className={`absolute transition-all duration-200 ease-in ${isBlind ? '' : 'animate-[slick_3s_ease_infinite_1s]'}`}
          style={{
            transformOrigin: '50% 100%',
            '--center': 'rotateY(0deg)',
            '--left': 'rotateY(-4deg)',
            '--right': 'rotateY(4deg)',
          }}
        >
          <ellipse cx="53.7" cy={33} rx="8.3" ry="8.2" fill="#8b5cf6" />
          <ellipse cx="53.7" cy={33} rx="5.4" ry="5.4" fill="#ec4899" />
          <ellipse cx="10.2" cy={33} rx="8.2" ry="8.2" fill="#8b5cf6" />
          <ellipse cx="10.2" cy={33} rx="5.4" ry="5.4" fill="#ec4899" />
          <g fill="#8b5cf6">
            <path d="m43.4 10.8c1.1-.6 1.9-.9 1.9-.9-3.2-1.1-6-1.8-8.5-2.1 1.3-1 2.1-1.3 2.1-1.3-20.4-2.9-30.1 9-30.1 19.5h46.4c-.7-7.4-4.8-12.4-11.8-15.2" />
            <path d="m55.3 27.6c0-9.7-10.4-17.6-23.3-17.6s-23.3 7.9-23.3 17.6c0 2.3.6 4.4 1.6 6.4-1 2-1.6 4.2-1.6 6.4 0 9.7 10.4 17.6 23.3 17.6s23.3-7.9 23.3-17.6c0-2.3-.6-4.4-1.6-6.4 1-2 1.6-4.2 1.6-6.4" />
          </g>
          <path d="m52 28.2c0-16.9-20-6.1-20-6.1s-20-10.8-20 6.1c0 4.7 2.9 9 7.5 11.7-1.3 1.7-2.1 3.6-2.1 5.7 0 6.1 6.6 11 14.7 11s14.7-4.9 14.7-11c0-2.1-.8-4-2.1-5.7 4.4-2.7 7.3-7 7.3-11.7" fill="#a855f7" />
          <g fill="#374151" className="transition-all duration-200 ease">
            <path d="m35.1 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.6.1 1 1 1 2.1" />
            <path d="m30.9 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.5.1 1 1 1 2.1" />
            <ellipse 
              cx="40.7" 
              cy={isBlind ? "30" : "31.7"} 
              rx="3.5" 
              ry={isBlind ? "0.5" : "4.5"} 
              className={`monkey-eye-r ${!isBlind ? 'animate-[blink_10s_1s_infinite]' : ''}`}
            />
            <ellipse 
              cx="23.3" 
              cy={isBlind ? "30" : "31.7"} 
              rx="3.5" 
              ry={isBlind ? "0.5" : "4.5"} 
              className={`monkey-eye-l ${!isBlind ? 'animate-[blink_10s_1s_infinite]' : ''}`}
            />
          </g>
        </svg>

        {/* Monkey Hands SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width={156} 
          height={156} 
          viewBox="0 0 64 64" 
          id="monkey-hands"
          className="absolute z-[2] transition-all duration-200 ease"
          style={{
            transform: isBlind 
              ? 'translate3d(0, 0, 0) rotateX(0deg)' 
              : 'translateY(calc(166px / 1.25)) rotateX(-21deg)'
          }}
        >
          <path fill="#8b5cf6" d="M9.4,32.5L2.1,61.9H14c-1.6-7.7,4-21,4-21L9.4,32.5z" />
          <path fill="#ec4899" d="M15.8,24.8c0,0,4.9-4.5,9.5-3.9c2.3,0.3-7.1,7.6-7.1,7.6s9.7-8.2,11.7-5.6c1.8,2.3-8.9,9.8-8.9,9.8
            s10-8.1,9.6-4.6c-0.3,3.8-7.9,12.8-12.5,13.8C11.5,43.2,6.3,39,9.8,24.4C11.6,17,13.3,25.2,15.8,24.8" />
          <path fill="#8b5cf6" d="M54.8,32.5l7.3,29.4H50.2c1.6-7.7-4-21-4-21L54.8,32.5z" />
          <path fill="#ec4899" d="M48.4,24.8c0,0-4.9-4.5-9.5-3.9c-2.3,0.3,7.1,7.6,7.1,7.6s-9.7-8.2-11.7-5.6c-1.8,2.3,8.9,9.8,8.9,9.8
            s-10-8.1-9.7-4.6c0.4,3.8,8,12.8,12.6,13.8c6.6,1.3,11.8-2.9,8.3-17.5C52.6,17,50.9,25.2,48.4,24.8" />
        </svg>

        {/* Eyes closed/opened indicator */}
        <div 
          className={`absolute bottom-[20%] rounded-[45%] border-b border-purple-300 z-[3] transition-all duration-200 ease ${
            isBlind 
              ? 'w-[14px] h-0 rounded-full border-b-[16px]' 
              : 'w-[40px] h-[26.7px] border-b-[3.2px]'
          }`}
        ></div>
      </motion.label>

      <style jsx>{`
        @keyframes blink {
          0%, 2%, 4%, 26%, 28%, 71%, 73%, 100% {
            ry: 4.5;
            cy: 31.7;
          }
          1%, 3%, 27%, 72% {
            ry: 0.5;
            cy: 30;
          }
        }
        @keyframes slick {
          0%, 100% {
            transform: var(--center);
          }
          25% {
            transform: var(--left);
          }
          75% {
            transform: var(--right);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Avatar;