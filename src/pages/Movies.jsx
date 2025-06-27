import React from 'react';
import { Link } from 'react-router-dom';

const dummyMovies = [
  {
    id: 101,
    title: 'Digital Dreams',
    poster: 'https://via.placeholder.com/300x450?text=Digital+Dreams',
    genre: 'Sci-Fi',
    year: 2023,
    rating: 8.2,
  },
  {
    id: 102,
    title: 'Love & Code',
    poster: 'https://via.placeholder.com/300x450?text=Love+%26+Code',
    genre: 'Romance',
    year: 2022,
    rating: 7.8,
  },
  {
    id: 103,
    title: 'Skyfall Horizon',
    poster: 'https://via.placeholder.com/300x450?text=Skyfall+Horizon',
    genre: 'Action',
    year: 2021,
    rating: 8.5,
  },
  {
    id: 104,
    title: 'Beyond Silence',
    poster: 'https://via.placeholder.com/300x450?text=Beyond+Silence',
    genre: 'Drama',
    year: 2023,
    rating: 8.0,
  },
  {
    id: 105,
    title: 'Nightcode',
    poster: 'https://via.placeholder.com/300x450?text=Nightcode',
    genre: 'Thriller',
    year: 2020,
    rating: 7.9,
  },
  {
    id: 106,
    title: 'Virtual Empire',
    poster: 'https://via.placeholder.com/300x450?text=Virtual+Empire',
    genre: 'Fantasy',
    year: 2024,
    rating: 9.0,
  },
];

const Movies = () => {
  return (
    <div className="min-h-screen px-4 py-10 bg-[#F4EBD3]">
      <h1 className="text-3xl font-bold text-[#555879] mb-8 text-center">🎬 All Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {dummyMovies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-[#DED3C4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
              className="w-full h-64 object-cover"
            />
            <div className="p-3 text-[#555879]">
              <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
              <p className="text-sm text-[#888da8]">{movie.genre} • {movie.year}</p>
              <p className="text-sm mt-1">⭐ {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
