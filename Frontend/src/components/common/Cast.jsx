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
    <section className="px-6 md:px-10 pb-12 mt-10">
      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <UsersRound className="w-6 h-6 text-[#555879]" />
        <h2 className="text-2xl font-bold text-[#555879]">Cast</h2>
      </div>

      {/* Cast Row */}
      <div
        ref={containerRef}
        className={`w-full relative overflow-hidden ${cast.length < 12 ? 'flex justify-center gap-4 flex-wrap' : ''}`}
      >
        <motion.div
          ref={trackRef}
          className={`flex gap-4 w-max ${cast.length < 12 ? '' : 'whitespace-nowrap'}`}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {displayCast.map((member, index) => (
            <motion.div
              key={`${member.id}-${index}`}
              className="flex-shrink-0 w-[100px] cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to={`/actor/${member.id}`}>
                <div className="rounded-lg overflow-hidden bg-[#DED3C4] shadow-md">
                  <img
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                        : 'https://via.placeholder.com/185x278?text=No+Image'
                    }
                    alt={member.name}
                    className="w-[100px] h-[150px] object-cover"
                  />
                  <div className="p-2 text-center text-xs text-[#555879]">
                    <p className="font-semibold truncate">{member.name}</p>
                    <p className="italic truncate">{member.character}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Cast;
