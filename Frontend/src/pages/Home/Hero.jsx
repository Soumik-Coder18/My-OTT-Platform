// import React, { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const Hero = ({ featured }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);
//   const [hovered, setHovered] = useState(false);

//   useEffect(() => {
//     if (!hovered) {
//       startAutoScroll();
//     }
//     return () => clearTimeout(timeoutRef.current);
//   }, [currentIndex, featured, hovered]);

//   const startAutoScroll = () => {
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prev) =>
//         prev === featured.length - 1 ? 0 : prev + 1
//       );
//     }, 6000);
//   };

//   if (!Array.isArray(featured) || featured.length === 0) return null;

//   const currentItem = featured[currentIndex];
//   const isMovie = currentItem.hasOwnProperty('title');
//   const detailPath = isMovie
//     ? `/movie/${currentItem.id}`
//     : `/series/${currentItem.id}`;

//   return (
//     <section
//       className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden mb-14 bg-[#111]"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentItem.id}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.6 }}
//           className="absolute inset-0 flex flex-col md:flex-row"
//         >
//           {/* Left Half */}
//           <div className="w-full md:w-2/3 relative">
//             <img
//               src={`https://image.tmdb.org/t/p/original${
//                 currentItem.backdrop_path || currentItem.poster_path
//               }`}
//               alt={currentItem.title || currentItem.name}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
//             <div className="absolute bottom-6 left-6 md:left-12 text-white">
//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-3xl md:text-5xl font-bold"
//               >
//                 {currentItem.title || currentItem.name}
//               </motion.h1>
//             </div>
//           </div>

//           {/* Right Content */}
//           <motion.div
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 100, opacity: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full md:w-1/3 bg-[#565878] text-white flex flex-col justify-center p-6 md:p-8 shadow-[inset_0_0_40px_#000]"
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w300${
//                 currentItem.poster_path || currentItem.backdrop_path
//               }`}
//               alt="Poster"
//               className="w-40 md:w-52 rounded-xl mb-4 self-center shadow-lg"
//             />
//             <p className="text-sm md:text-base text-gray-300 line-clamp-5 mb-6">
//               {currentItem.overview}
//             </p>
//             <Link
//               to={detailPath}
//               className="bg-[#DED3C4] text-[#222] font-medium px-5 py-2 rounded-xl text-center hover:scale-105 transition-transform"
//             >
//               View Details
//             </Link>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Dot Indicators */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
//         {featured.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
//               index === currentIndex
//                 ? 'bg-[#DED3C4]'
//                 : 'bg-[#DED3C4]/40 hover:bg-[#DED3C4]/60'
//             }`}
//             aria-label={`Slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Loader component
const Loader = () => (
  <StyledWrapper>
    <div className="container center">
      <div className="rope center">
        <div className="legs center">
          <div className="boot-l" />
          <div className="boot-r" />
        </div>
        <div className="costume center">
          <div className="spider">
            <div className="s1 center" />
            <div className="s2 center" />
            <div className="s3" />
            <div className="s4" />
          </div>
          <div className="belt center" />
          <div className="hand-r" />
          <div className="hand-l" />
          <div className="neck center" />
          <div className="mask center">
            <div className="eye-l" />
            <div className="eye-r" />
          </div>
          <div className="cover center" />
        </div>
      </div>
    </div>
  </StyledWrapper>
);

// Hero section
const Hero = ({ featured }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const startAutoScroll = () => {
    timeoutRef.current = setTimeout(() => {
      handleChangeSlide((currentIndex + 1) % featured.length);
    }, 6000);
  };

  const handleChangeSlide = (index) => {
    setShowLoader(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setShowLoader(false);
    }, 800); // show loader for 800ms
  };

  if (!Array.isArray(featured) || featured.length === 0) return null;

  const currentItem = featured[currentIndex];
  const isMovie = currentItem.hasOwnProperty('title');
  const detailPath = isMovie
    ? `/movie/${currentItem.id}`
    : `/series/${currentItem.id}`;

  return (
    <section className="relative w-full h-[620px] sm:h-[520px] md:h-[520px] rounded-3xl overflow-hidden mb-7 bg-[#111]">
  {showLoader ? (
    <div className="absolute inset-0 flex items-center justify-center bg-[#565878] z-10">
      <Loader />
    </div>
  ) : (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex flex-col md:flex-row"
      >
        {/* Left Half */}
        <div className="w-full md:w-2/3 relative h-1/2 md:h-full">
          <img
            src={`https://image.tmdb.org/t/p/original${
              currentItem.backdrop_path || currentItem.poster_path
            }`}
            alt={currentItem.title || currentItem.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-12 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold max-w-[90%] md:max-w-[70%]"
            >
              {currentItem.title || currentItem.name}
            </motion.h1>
          </div>
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/3 bg-[#565878] text-white flex flex-col justify-between p-4 sm:p-6 md:p-8 space-y-4"
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${
              currentItem.poster_path || currentItem.backdrop_path
            }`}
            alt="Poster"
            className="w-32 sm:w-40 md:w-48 rounded-xl self-center shadow-lg"
          />
          <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center sm:text-left flex-grow line-clamp-none max-h-[120px] overflow-y-auto">
            {currentItem.overview}
          </p>
          <Link
            to={detailPath}
            className="bg-[#DED3C4] text-[#222] font-medium text-sm sm:text-base px-4 py-2 rounded-xl text-center hover:scale-105 transition-transform self-center sm:self-start"
          >
            View Details
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )}

  {/* Dots */}
  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
    {featured.map((_, index) => (
      <button
        key={index}
        onClick={() => handleChangeSlide(index)}
        className={`h-2.5 w-2.5 rounded-full transition ${
          index === currentIndex
            ? 'bg-[#DED3C4]'
            : 'bg-[#DED3C4]/40 hover:bg-[#DED3C4]/70'
        }`}
      />
    ))}
  </div>
</section>

  );
};

export default Hero;

// Import or paste your full StyledWrapper for Loader here:
const StyledWrapper = styled.div`
  .center {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
  }

  .container {
    height: 31.25em;
    width: 21.87em;
    margin-top: -325px;
  }

  .rope {
    height: 13.62em;
    width: 0.15em;
    background-color: #ffffff;
    animation: swing 2s infinite;
  }

  @keyframes swing {
    50% {
      transform: translateY(-4em);
    }
  }

  .legs {
    height: 1.12em;
    width: 7.5em;
    background-color: transparent;
    box-shadow: 0 0 0 0.12em #140243, 0 0 0 1.06em #1b1676, 0 0 0 1.18em #140243;
    top: 12.5em;
    border-radius: 3.12em;
  }

  .boot-l,
  .boot-r {
    height: 1.25em;
    width: 2.5em;
    background-color: #e32832;
    position: absolute;
    border: 0.12em solid #140243;
    bottom: 1.12em;
  }

  .boot-l {
    left: 1em;
  }

  .boot-r {
    transform: rotateY(180deg);
    left: 3.81em;
  }

  .boot-l:before,
  .boot-r:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 1.12em solid #140243;
    border-left: 1.18em solid transparent;
    bottom: 1.31em;
    left: 1.46em;
  }

  .boot-l:after,
  .boot-r:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 1.12em solid #e32832;
    border-left: 1em solid transparent;
    right: 0;
    top: -0.93em;
  }

  .costume {
    height: 6.25em;
    width: 5.62em;
    background: linear-gradient(
      to right,
      #1b1676 20%,
      #e32832 20%,
      #e32832 80%,
      #1b1676 80%
    );
    border: 0.12em solid #140243;
    top: 14.68em;
  }

  .spider {
    height: 1.87em;
    width: 0.93em;
    background-color: #140243;
    border-radius: 45%;
    position: absolute;
    transform: translate(-50%, -50%);
    top: calc(50% + 0.93em);
    left: 50%;
  }

  .s1,
  .s3 {
    height: 7.5em;
    width: 2.5em;
    border-radius: 0 0 1.37em 1.37em;
    border-bottom: 0.12em solid #140243;
    position: absolute;
  }

  .s2,
  .s4 {
    height: 7.5em;
    width: 3.12em;
    border-radius: 0 0 1.56em 1.56em;
    border-bottom: 0.12em solid #140243;
    position: absolute;
  }

  .s1,
  .s2,
  .s3,
  .s4 {
    left: 50%;
  }

  .s1 {
    bottom: 1.43em;
  }

  .s2 {
    bottom: 0.93em;
  }

  .s3,
  .s4 {
    transform: translateX(-50%) rotateX(180deg);
  }

  .s3 {
    top: 1.43em;
  }

  .s4 {
    top: 0.93em;
  }

  .belt {
    height: 0.43em;
    width: 5.87em;
    background-color: #e32832;
    border: 0.12em solid #140243;
    top: -0.12em;
  }

  .hand-r,
  .hand-l {
    height: 8.12em;
    background: linear-gradient(
      #e32832 4.6em,
      #140243 4.6em,
      #140243 4.75em,
      #1b1676 4.75em,
      #1b1676 8.12em
    );
    width: 1.12em;
    border: 0.12em solid #140243;
    border-radius: 1.25em;
    position: absolute;
    transform-origin: bottom;
    bottom: -0.12em;
  }

  .hand-r {
    right: -0.75em;
    transform: rotate(-22deg);
  }

  .hand-l {
    left: -0.75em;
    transform: rotate(22deg);
  }

  .neck {
    height: 0.37em;
    width: 1.25em;
    background-color: #e32832;
    bottom: -0.62em;
    border: 0.12em solid #140243;
  }

  .mask {
    height: 4.65em;
    width: 4.06em;
    background-color: #e32832;
    border-radius: 50% 50% 50% 50% / 54% 54% 46% 46%;
    border: 0.12em solid #140243;
    top: 6.56em;
  }

  .eye-l,
  .eye-r {
    height: 0.68em;
    width: 1.37em;
    background-color: #ffffff;
    border-radius: 1.37em 1.37em 0 0;
    border: 0.12em solid #140243;
    position: absolute;
    top: 2.1em;
  }

  .eye-l {
    left: 0.3em;
  }

  .eye-r {
    right: 0.3em;
  }

  .cover {
    height: 3.12em;
    width: 0.15em;
    background-color: #ffffff;
    bottom: 8.12em;
  }

  @media screen and (min-width: 600px) {
    .container {
      font-size: 20px;
    }
  }`;


