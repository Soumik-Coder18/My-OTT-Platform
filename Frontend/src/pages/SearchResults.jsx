import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="min-h-screen bg-[#F4EBD3] p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#555879]">Search Results</h2>
      {results.length === 0 ? (
        <p className="text-[#888da8]">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {results.map((item) => (
            <Link
              key={item.id}
              to={item.media_type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`}
              className="bg-[#DED3C4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
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
                <h3 className="text-md font-semibold truncate">{item.title || item.name}</h3>
                <p className="text-sm text-[#888da8] capitalize">{item.media_type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
