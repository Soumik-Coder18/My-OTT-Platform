// // components/GenreSection.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getGenres } from '../../services/movieApi';
// import { motion } from 'framer-motion';
// import { Cctv } from 'lucide-react';

// const GenreSection = ({ type = 'movie' }) => {
//   const [genres, setGenres] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const res = await getGenres(type);
//         setGenres(res.data.genres || []);
//       } catch (err) {
//         console.error('Error fetching genres:', err);
//       }
//     };
//     fetchGenres();
//   }, [type]);

//   if (!genres.length) return null;

//   return (
//     <section className="px-6 md:px-10 py-14 bg-[#f4ecd9]">
//       <motion.div
//         className="flex justify-center items-center gap-3 mb-10"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         <Cctv className="w-6 h-6 text-[#555879]" />
//         <h2 className="text-3xl md:text-4xl font-bold text-[#555879] text-center">
//           Browse by Genre
//         </h2>
//       </motion.div>

//       <motion.div
//         className="flex flex-wrap justify-center gap-4"
//         initial="hidden"
//         whileInView="visible"
//         variants={{
//           visible: {
//             transition: {
//               staggerChildren: 0.07,
//             },
//           },
//         }}
//         viewport={{ once: true }}
//       >
//         {genres.map((genre) => (
//           <motion.button
//             key={genre.id}
//             onClick={() => navigate(`/genre/${genre.id}`)}
//             whileHover={{ scale: 1.15, rotate: 1 }}
//             whileTap={{ scale: 0.92 }}
//             variants={{
//               hidden: { opacity: 0, y: 20 },
//               visible: { opacity: 1, y: 0 },
//             }}
//             className="bg-[#e4d6bb] hover:bg-[#d9c8aa] text-[#3a3a3a] px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300"
//           >
//             {genre.name}
//           </motion.button>
//         ))}
//       </motion.div>
//     </section>
//   );
// };

// export default GenreSection;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGenres } from '../../services/movieApi';
import { motion } from 'framer-motion';
import {
  Clapperboard, Flame, Smile, Ghost, BookOpenCheck, HandMetal,
  Wand2, Landmark, Rocket, Palette, Megaphone, Swords, Library,
  Laugh, Sparkle
} from 'lucide-react';

const colorPalette = [
  'from-purple-500 to-pink-500',
  'from-pink-500 to-purple-600',
  'from-purple-600 to-pink-600',
  'from-pink-600 to-purple-700',
  'from-purple-700 to-pink-700',
  'from-pink-700 to-purple-800'
];

const genreIcons = {
  Action: Flame,
  Adventure: Rocket,
  Animation: Wand2,
  Comedy: Smile,
  Crime: Landmark,
  Documentary: BookOpenCheck,
  Drama: Megaphone,
  Family: Library,
  Fantasy: Sparkle,
  History: Landmark,
  Horror: Ghost,
  Music: Palette,
  Mystery: Ghost,
  Romance: Laugh,
  'Science Fiction': Rocket,
  'TV Movie': Clapperboard,
  Thriller: Swords,
  War: HandMetal,
  Western: Landmark,
};

const GenreSection = ({ type = 'movie' }) => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getGenres(type);
        setGenres(res.data.genres || []);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    fetchGenres();
  }, [type]);

  if (!genres.length) return null;

  const rows = [genres.slice(0, 8), genres.slice(8, 16)];

  return (
    <section className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-14 bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm border border-white/10 rounded-2xl mb-8">
      <motion.div
        className="flex justify-center items-center gap-3 mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Clapperboard className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
          Browse Genres
        </h2>
      </motion.div>

      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {row.map((genre, i) => {
            const Icon = genreIcons[genre.name] || Clapperboard;
            const gradientClass = colorPalette[(i + rowIndex * 9) % colorPalette.length];

            return (
              <motion.button
                key={genre.id}
                onClick={() => navigate(`/genre/${genre.id}`)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`min-w-[120px] sm:min-w-[140px] px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${gradientClass} text-white border border-white/20 hover:border-white/40`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
                {genre.name}
              </motion.button>
            );
          })}
        </motion.div>
      ))}
    </section>
  );
};

export default GenreSection;