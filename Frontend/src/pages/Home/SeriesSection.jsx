// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Tv } from 'lucide-react';

// const seriesSection = ({ series }) => {
//   return (
//     <section className="mb-10">
//       <div className="flex items-center gap-2 mb-4">
//         <Tv className="w-6 h-6 text-[#555879]" />
//         <h2 className="text-2xl font-semibold text-[#555879]">Popular series</h2>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {series.map((show) => (
//           <Link
//             to={`/series/${show.id}`}
//             key={show.id}
//             className="bg-[#DED3C4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
//           >
//             <img
//               src={
//                 show.poster_path
//                   ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
//                   : 'https://via.placeholder.com/300x450?text=No+Image'
//               }
//               alt={show.name}
//               className="w-full h-90 object-cover"
//             />
//             <div className="p-2 text-sm font-medium text-[#555879] truncate">
//               {show.name}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default seriesSection;

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tv } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const seriesSection = ({ series }) => {
  const visibleseries = series.slice(0, 10); // top 10
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // triggers when near viewport

  return (
    <section className="mb-10" ref={ref}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Popular shows</h2>
        </div>
        <Link
          to="/series"
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          Show More
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
          hidden: {},
        }}
      >
        {visibleseries.map((show) => (
          <motion.div
            key={show.id}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              hidden: { opacity: 0, y: 40 },
            }}
          >
            <Link to={`/series/${show.id}`}>
              <div className="rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 transform hover:scale-105 hover:border-purple-500/30 shadow-md hover:shadow-xl hover:shadow-purple-500/25">
                <img
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={show.name}
                  className="w-full h-90 object-cover"
                />
                <div className="p-2 text-sm font-medium text-white truncate">
                  {show.name}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default seriesSection;
