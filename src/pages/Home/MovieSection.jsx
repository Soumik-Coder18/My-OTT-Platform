import React from 'react';
import { Link } from 'react-router-dom';

const MovieSection = ({ movies }) => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-[#555879] mb-4">🎬 Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="rounded overflow-hidden shadow hover:scale-105 transition">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.title}
              className="w-full h-90 object-cover"
            />
            <div className="p-2 text-sm text-[#555879]">{movie.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
