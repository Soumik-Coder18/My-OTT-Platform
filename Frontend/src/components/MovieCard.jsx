import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';

const MovieCard = ({ media }) => {
  const navigate = useNavigate();

  // Guard clause: ensure media exists
  if (!media) return null;

  // Determine type and relevant fields
  const isTV = !!media?.first_air_date;
  const title = media?.title || media?.name || 'Untitled';
  const date = media?.release_date || media?.first_air_date || '—';
  const rating = media?.vote_average?.toFixed(1) || '—';
  const path = isTV ? `/series/${media.id}` : `/movie/${media.id}`;

  return (
    <motion.div
      onClick={() => navigate(path)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={
            media?.poster_path
              ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={title}
          className="w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">{rating}</span>
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-2 py-1">
          <span className="text-white text-xs font-medium">
            {isTV ? 'TV' : 'Movie'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h2 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
          {title}
        </h2>
        <div className="flex items-center justify-between text-gray-300 text-xs">
          <span>{date.slice(0, 4)}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;