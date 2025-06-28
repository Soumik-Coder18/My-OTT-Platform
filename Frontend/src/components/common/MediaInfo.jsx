// // File: components/common/MediaInfo.jsx

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PlayCircle, Download, Heart, HeartOff, Star } from 'lucide-react';

// const MediaInfo = ({ media, mediaType, isFavorite, handleToggleFavorite }) => {
//   const navigate = useNavigate();

//   const title = mediaType === 'movie' ? media.title : media.name;
//   const releaseYear =
//     mediaType === 'movie'
//       ? media.release_date?.slice(0, 4)
//       : media.first_air_date?.slice(0, 4);
//   const runtime =
//     mediaType === 'movie'
//       ? `${media.runtime} mins`
//       : `${media.episode_run_time?.[0] || '-'} mins`;
//   const genres = media.genres?.map((g) => g.name).join(', ');

//   return (
//     <div className="flex flex-col md:flex-row p-6 md:p-10 gap-10">
//       <div className="md:w-1/3 flex justify-center">
//         <img
//           src={
//             media.poster_path
//               ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
//               : 'https://via.placeholder.com/300x450?text=No+Image'
//           }
//           alt={title}
//           className="rounded-xl w-[300px] shadow-lg"
//         />
//       </div>

//       <div className="md:w-2/3">
//         <h1 className="text-4xl font-bold mb-2">{title}</h1>
//         <p className="text-lg mb-2 text-[#888da8]">
//           {releaseYear} • {runtime} • {genres}
//         </p>
//         <p className="text-lg mb-4 flex items-center gap-1">
//           <Star className="w-5 h-5 text-yellow-500" />
//           {media.vote_average?.toFixed(1)} / 10
//         </p>
//         <p className="text-base leading-relaxed">{media.overview}</p>

//         <div className="flex gap-3 mb-6 mt-4 flex-wrap">
//           <button
//             onClick={() => navigate('/login')}
//             className="flex items-center gap-2 px-4 py-2 bg-[#555879] text-[#F4EBD3] rounded hover:bg-[#3e4059] transition"
//           >
//             <PlayCircle className="w-5 h-5" /> Watch
//           </button>
//           <button
//             onClick={() => navigate('/login')}
//             className="flex items-center gap-2 px-4 py-2 bg-[#555879] text-[#F4EBD3] rounded hover:bg-[#3e4059] transition"
//           >
//             <Download className="w-5 h-5" /> Download
//           </button>
//           <button
//             onClick={handleToggleFavorite}
//             className={`flex items-center gap-2 px-4 py-2 rounded transition ${
//               isFavorite
//                 ? 'bg-red-500 text-white hover:bg-red-600'
//                 : 'bg-[#555879] text-[#F4EBD3] hover:bg-[#3e4059]'
//             }`}
//           >
//             {isFavorite ? (
//               <>
//                 <HeartOff className="w-5 h-5" /> Remove Favorite
//               </>
//             ) : (
//               <>
//                 <Heart className="w-5 h-5" /> Add to Favorites
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MediaInfo;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlayCircle,
  Download,
  Heart,
  HeartOff,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';

const MediaInfo = ({ media, mediaType, isFavorite, handleToggleFavorite }) => {
  const navigate = useNavigate();

  const title = mediaType === 'movie' ? media.title : media.name;
  const releaseYear = (mediaType === 'movie' ? media.release_date : media.first_air_date)?.slice(0, 4) || '-';
  const runtime = `${(mediaType === 'movie' ? media.runtime : media.episode_run_time?.[0]) || '-'} mins`;
  const genres = media.genres?.map((g) => g.name).join(', ') || '-';
  const status = media.status || '';
  const tagline = media.tagline || '';
  const seasons = mediaType === 'series' ? media.number_of_seasons : null;
  const episodes = mediaType === 'series' ? media.number_of_episodes : null;
  const voteAverage = media.vote_average?.toFixed(1) || '-';
  const overview = media.overview || 'No overview available.';
  const budget = mediaType === 'movie' && media.budget ? `$${(media.budget / 1_000_000).toFixed(1)}M` : null;
  const revenue = mediaType === 'movie' && media.revenue ? `$${(media.revenue / 1_000_000).toFixed(1)}M` : null;

  const productionCompanies = media.production_companies || [];
  const spokenLanguages = media.spoken_languages?.map((lang) => lang.english_name).join(', ') || '';
  const homepage = media.homepage || '';
  const downloadUrl = media.download_url || '';

  const creators = mediaType === 'series' ? media.created_by?.map((c) => c.name).join(', ') : '';
  const networks = mediaType === 'series' ? media.networks || [] : [];

  const cast = media.credits?.cast?.slice(0, 8) || [];
  const directors = media.credits?.crew?.filter((person) => person.job === 'Director') || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row p-6 md:p-10 gap-10"
    >
      {/* Poster */}
      <div className="md:w-1/3 flex justify-center">
        <img
          src={
            media.poster_path
              ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          alt={title}
          className="rounded-xl w-[300px] shadow-lg"
        />
      </div>

      {/* Info */}
      <div className="md:w-2/3">
        <h1 className="text-4xl font-bold mb-2 text-[#555879]">{title}</h1>

        {tagline && <p className="italic text-[#888da8] mb-2">"{tagline}"</p>}

        {status && (
          <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold rounded-full bg-[#555879] text-[#F4EBD3]">
            {status}
          </span>
        )}

        <p className="text-lg mb-2 text-[#888da8]">
          {releaseYear} • {runtime} • {genres}
          {seasons !== null && ` • ${seasons} season${seasons !== 1 ? 's' : ''}`}
          {episodes !== null && ` • ${episodes} episode${episodes !== 1 ? 's' : ''}`}
        </p>

        <p className="text-lg mb-4 flex items-center gap-1 text-[#555879]">
          <Star className="w-5 h-5 text-yellow-500" />
          {voteAverage} / 10
        </p>

        <p className="text-base leading-relaxed mb-4 text-[#555879]">{overview}</p>

        {(budget || revenue) && (
          <p className="text-sm mb-4 text-[#888da8]">
            {budget && <>Budget: {budget}</>}
            {budget && revenue && ' • '}
            {revenue && <>Revenue: {revenue}</>}
          </p>
        )}

        {directors.length > 0 && (
          <p className="text-sm mb-4 text-[#888da8]">
            <strong>Director{directors.length > 1 ? 's' : ''}:</strong>{' '}
            {directors.map((dir, idx) => (
              <span key={dir.id}>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(dir.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555879] hover:underline"
                >
                  {dir.name}
                </a>
                {idx < directors.length - 1 && ', '}
              </span>
            ))}
          </p>
        )}

        {productionCompanies.length > 0 && (
          <div className="mb-4">
            <h3 className="text-[#555879] font-semibold mb-1">Production Companies:</h3>
            <div className="flex flex-wrap gap-3">
              {productionCompanies.map((company) => (
                <div key={company.id} className="flex items-center gap-2 bg-[#DED3C4] px-3 py-1 rounded shadow-sm">
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                      alt={company.name}
                      className="h-6 object-contain"
                    />
                  )}
                  <span className="text-sm text-[#555879]">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {spokenLanguages && (
          <p className="text-sm mb-4 text-[#888da8]">
            <strong>Languages:</strong> {spokenLanguages}
          </p>
        )}

        {creators && (
          <p className="text-sm mb-4 text-[#888da8]">
            <strong>Created by:</strong> {creators}
          </p>
        )}

        {networks.length > 0 && (
          <div className="mb-4">
            <h3 className="text-[#555879] font-semibold mb-1">Networks:</h3>
            <div className="flex flex-wrap gap-3">
              {networks.map((network) => (
                <div key={network.id} className="flex items-center gap-2 bg-[#DED3C4] px-3 py-1 rounded shadow-sm">
                  {network.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                      alt={network.name}
                      className="h-6 object-contain"
                    />
                  )}
                  <span className="text-sm text-[#555879]">{network.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => homepage && window.open(homepage, '_blank')}
            disabled={!homepage}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              homepage
                ? 'bg-[#555879] text-[#F4EBD3] hover:bg-[#3e4059]'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
          >
            <PlayCircle className="w-5 h-5" /> Watch
          </button>

          <button
            onClick={() => downloadUrl && window.open(downloadUrl, '_blank')}
            disabled={!downloadUrl}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              downloadUrl
                ? 'bg-[#555879] text-[#F4EBD3] hover:bg-[#3e4059]'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
          >
            <Download className="w-5 h-5" /> Download
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              isFavorite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-[#555879] text-[#F4EBD3] hover:bg-[#3e4059]'
            }`}
          >
            {isFavorite ? (
              <>
                <HeartOff className="w-5 h-5" /> Remove Favorite
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" /> Add to Favorites
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaInfo;
