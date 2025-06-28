import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/movieApi';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader'; // ✅ Import Loader component

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Track loading state

  useEffect(() => {
    getPopularMovies()
      .then((res) => {
        console.log('API Response:', res.data);
        setMovies(res.data.results);
      })
      .catch((err) => console.error('Error fetching movies:', err))
      .finally(() => setLoading(false)); // ✅ End loading
  }, []);

  if (loading) return <Loader message="Loading movies..." />; // ✅ Use Loader

  return (
    <div className="min-h-screen px-4 py-10 bg-[#F4EBD3]">
      <h1 className="text-3xl font-bold text-[#555879] mb-8 text-center">
        🎬 Popular Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-[#DED3C4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.title}
              className="w-full h-90 object-cover"
            />
            <div className="p-3 text-[#555879]">
              <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
              <p className="text-sm text-[#888da8]">
                {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
