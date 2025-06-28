import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#888da8] px-4 text-center bg-[#F4EBD3]">
        <Frown size={72} className="animate-bounce text-[#555879] mb-4" />
        <p className="text-2xl font-bold mb-2">No favorites yet!</p>
        <p className="text-sm">You haven’t loved anything yet... maybe start exploring?</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-[#F4EBD3]">
      <h1 className="text-3xl font-bold text-[#555879] mb-8 text-center">
        ❤️ Your Favorites
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-[#DED3C4] rounded-lg overflow-hidden shadow-md relative"
          >
            <Link to={`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`}>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={item.title || item.name}
                className="w-full h-90 object-cover"
              />
              <div className="p-3 text-[#555879]">
                <h3 className="text-lg font-semibold truncate">
                  {item.title || item.name}
                </h3>
              </div>
            </Link>
            <button
              onClick={() => removeFavorite(item.id)}
              className="absolute top-2 right-2 bg-white text-red-500 px-2 py-1 rounded-full text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
