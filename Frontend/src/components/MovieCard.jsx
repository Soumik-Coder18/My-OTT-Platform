import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer rounded-xl shadow-md hover:scale-105 transition-transform duration-200 overflow-hidden bg-[#DED3C4]"
    >
      <img
        src={
          media?.poster_path
            ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image'
        }
        alt={title}
        className="w-full h-[340px] object-cover rounded-t-xl"
      />
      <div className="px-3 pt-2 pb-4 text-[#555879]">
        <h2 className="text-base font-bold truncate">{title}</h2>
        <p className="text-sm text-[#98A1BC]">
          {date.slice(0, 4)} • <span className="text-yellow-600">⭐</span> {rating}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;