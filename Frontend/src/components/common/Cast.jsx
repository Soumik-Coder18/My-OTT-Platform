// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { UsersRound } from 'lucide-react';
// import { motion, useAnimationFrame } from 'framer-motion';
// // import Loaders from '../Loader';

// const Cast = ({ mediaType, id }) => {
//   const [cast, setCast] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const containerRef = useRef(null);
//   const trackRef = useRef(null);
//   const x = useRef(0);

//   const scrollSpeed = 0.4; // Adjust speed as needed

//   // Scroll only if 12 or more cast members
//   useAnimationFrame((_, delta) => {
//     if (!trackRef.current || !containerRef.current) return;
//     if (cast.length < 12) return; // NO scroll if less than 12

//     x.current -= scrollSpeed * (delta / 16); // Smooth scroll per frame

//     const scrollWidth = trackRef.current.scrollWidth / 2;

//     if (Math.abs(x.current) >= scrollWidth) {
//       x.current = 0;
//     }

//     trackRef.current.style.transform = `translateX(${x.current}px)`;
//   });

//   useEffect(() => {
//     if (!mediaType || !id) return;

//     const fetchCast = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.themoviedb.org/3/${mediaType}/${id}/credits`,
//           {
//             params: {
//               api_key: import.meta.env.VITE_TMDB_API_KEY,
//               language: 'en-US',
//             },
//           }
//         );
//         setCast(res.data.cast || []);
//       } catch (err) {
//         console.error('Failed to fetch cast:', err);
//         setCast([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCast();
//   }, [mediaType, id]);

//   // Don't render anything if cast is empty or still loading
//   if (loading || cast.length === 0) return null;

//   // Duplicate cast only if 12 or more for infinite scroll
//   const displayCast = cast.length >= 12 ? [...cast, ...cast] : cast;

//   return (
//     <section className="px-6 md:px-10 pb-12 mt-10">
//       {/* Header */}
//       <div className="flex justify-center items-center gap-2 mb-6">
//         <UsersRound className="w-6 h-6 text-[#555879]" />
//         <h2 className="text-2xl font-bold text-[#555879]">Cast</h2>
//       </div>

//       {/* Cast Row */}
//       <div
//         ref={containerRef}
//         className={`w-full relative overflow-hidden ${cast.length < 12 ? 'flex justify-center gap-4 flex-wrap' : ''}`}
//       >
//         <motion.div
//           ref={trackRef}
//           className={`flex gap-4 w-max ${cast.length < 12 ? '' : 'whitespace-nowrap'}`}
//           initial="hidden"
//           animate="visible"
//           variants={{
//             visible: {
//               transition: {
//                 staggerChildren: 0.08,
//               },
//             },
//           }}
//         >
//           {displayCast.map((member, index) => (
//             <motion.div
//               key={`${member.id}-${index}`}
//               className="flex-shrink-0 w-[100px] cursor-pointer"
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               onClick={() =>
//                 window.open(`https://www.google.com/search?q=${encodeURIComponent(member.name)}`, '_blank')
//               }
//             >
//               <div className="rounded-lg overflow-hidden bg-[#DED3C4] shadow-md">
//                 <img
//                   src={
//                     member.profile_path
//                       ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
//                       : 'https://via.placeholder.com/185x278?text=No+Image'
//                   }
//                   alt={member.name}
//                   className="w-[100px] h-[150px] object-cover"
//                 />
//                 <div className="p-2 text-center text-xs text-[#555879]">
//                   <p className="font-semibold truncate">{member.name}</p>
//                   <p className="italic truncate">{member.character}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Cast;


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { UsersRound } from 'lucide-react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cast = ({ mediaType, id }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const x = useRef(0);

  const scrollSpeed = 0.4;

  useAnimationFrame((_, delta) => {
    if (!trackRef.current || !containerRef.current) return;
    if (cast.length < 12) return;

    x.current -= scrollSpeed * (delta / 16);
    const scrollWidth = trackRef.current.scrollWidth / 2;

    if (Math.abs(x.current) >= scrollWidth) {
      x.current = 0;
    }

    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  useEffect(() => {
    if (!mediaType || !id) return;

    const fetchCast = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${id}/credits`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'en-US',
            },
          }
        );
        setCast(res.data.cast || []);
      } catch (err) {
        console.error('Failed to fetch cast:', err);
        setCast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [mediaType, id]);

  if (loading || cast.length === 0) return null;

  const displayCast = cast.length >= 12 ? [...cast, ...cast] : cast;

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
            <UsersRound className="w-5 h-5" />
            <span className="font-semibold">Meet the Cast</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Stars</span> Behind the Magic
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the talented performers who bring these characters to life
          </p>
        </motion.div>

        {/* Cast Grid */}
        <div
          ref={containerRef}
          className={`w-full relative overflow-hidden ${cast.length < 12 ? 'flex justify-center gap-6 flex-wrap' : ''}`}
        >
          <motion.div
            ref={trackRef}
            className={`flex gap-6 w-max ${cast.length < 12 ? '' : 'whitespace-nowrap'}`}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {displayCast.map((member, index) => (
              <motion.div
                key={`${member.id}-${index}`}
                className="flex-shrink-0 w-[140px] cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <Link to={`/actor/${member.id}`}>
                  <div className="group relative">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    
                    {/* Main Card */}
                    <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                      <div className="relative overflow-hidden">
                        <img
                          src={
                            member.profile_path
                              ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                              : 'https://via.placeholder.com/185x278?text=No+Image'
                          }
                          alt={member.name}
                          className="w-[140px] h-[200px] object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Character Name Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-xs font-medium bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                            {member.character}
                          </p>
                        </div>
                      </div>
                      
                      {/* Actor Info */}
                      <div className="p-4 text-center">
                        <p className="font-bold truncate text-white text-sm mb-1">{member.name}</p>
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          <span>Featured Role</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

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
            <UsersRound size={20} className="text-purple-400" />
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
            <UsersRound size={16} className="text-pink-400" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Cast;
