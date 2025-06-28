// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Clapperboard } from 'lucide-react';

// const MovieSection = ({ movies }) => {
//   return (
//     <section className="mb-10">
//       <div className="flex items-center gap-2 mb-4">
//         <Clapperboard className="w-6 h-6 text-[#555879]" />
//         <h2 className="text-2xl font-semibold text-[#555879]">Popular Movies</h2>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {movies.map((movie) => (
//           <Link
//             to={`/movie/${movie.id}`}
//             key={movie.id}
//             className="bg-[#DED3C4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
//           >
//             <img
//               src={
//                 movie.poster_path
//                   ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//                   : 'https://via.placeholder.com/300x450?text=No+Image'
//               }
//               alt={movie.title}
//               className="w-full h-90 object-cover"
//             />
//             <div className="p-2 text-sm font-medium text-[#555879] truncate">
//               {movie.title}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MovieSection;

import React from 'react';
import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieSection = ({ movies }) => {
  const visibleMovies = movies.slice(0, 10); // Show top 10

  return (
    <section className="mb-10">
      {/* Header with Show More */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-[#555879]" />
          <h2 className="text-2xl font-semibold text-[#555879]">Popular Movies</h2>
        </div>
        <Link
          to="/movies"
          className="px-4 py-2 bg-[#DED3C4] text-[#222] rounded-full text-sm font-medium hover:scale-105 transition-transform"
        >
          Show More
        </Link>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleMovies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 1 }}
          >
            <Link to={`/movie/${movie.id}`}>
              <div className="rounded-lg overflow-hidden bg-[#DED3C4] transition-transform duration-300 transform hover:scale-105 shadow-md hover:shadow-xl">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                  className="w-full h-90 object-cover"
                />
                <div className="p-2 text-sm font-medium text-[#555879] truncate">
                  {movie.title}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
