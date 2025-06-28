import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { Frown, XCircle, Clapperboard, Tv2 } from 'lucide-react'; // Lucide icons

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const movies = favorites.filter((item) => item.media_type === 'movie');
  const tvShows = favorites.filter((item) => item.media_type === 'tv');

  const renderSection = (items, title, Icon) => (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="text-[#555879]" size={24} />
        <h2 className="text-2xl font-bold text-[#555879]">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#DED3C4] rounded-xl overflow-hidden shadow-md relative group transition hover:shadow-xl"
          >
            <Link to={`/${item.media_type === 'tv' ? 'series' : 'movie'}/${item.id}`}>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={item.title || item.name}
                className="w-full h-[360px] object-cover"
              />
              <div className="p-3 text-[#555879]">
                <h3 className="text-lg font-semibold truncate">
                  {item.title || item.name}
                </h3>
              </div>
            </Link>

            <button
              onClick={() => removeFavorite(item.id)}
              className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100 transition"
              title="Remove from favorites"
            >
              <XCircle size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#888da8] px-4 text-center bg-[#F4EBD3]">
        <Frown size={72} className="text-[#555879] mb-4 animate-bounce" />
        <p className="text-2xl font-bold mb-2">No favorites yet!</p>
        <p className="text-sm">You haven’t added any movies or shows to your list yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-[#F4EBD3]">
      <h1 className="text-4xl font-bold text-[#555879] mb-12 text-center">
        Your Favorites
      </h1>

      {movies.length > 0 && renderSection(movies, 'Movies', Clapperboard)}
      {tvShows.length > 0 && renderSection(tvShows, 'TV Shows', Tv2)}
    </div>
  );
};

export default Favorites;
