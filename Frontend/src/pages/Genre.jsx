import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../services/movieApi';
import { motion } from 'framer-motion';
import { Sparkles, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import Loader from '../components/Loader';

const Genre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [heroItems, setHeroItems] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [recommendedGenres, setRecommendedGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenreAndMovies = async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoading(true);

      try {
        const genresRes = await getGenres();
        const allGenres = genresRes.data.genres || [];
        const genre = allGenres.find((g) => String(g.id) === String(id));
        setGenreName(genre ? genre.name : 'Unknown Genre');

        const randomGenres = allGenres
          .filter((g) => g.id !== Number(id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setRecommendedGenres(randomGenres);

        const moviesRes = await getMoviesByGenre(id, page);
        const fetchedMovies = moviesRes.data.results || [];
        setMovies(fetchedMovies);
        setHeroItems(fetchedMovies.slice(0, 3));
        setTotalPages(moviesRes.data.total_pages || 1);
      } catch (err) {
        setGenreName('Unknown Genre');
        setMovies([]);
        setRecommendedGenres([]);
      }

      setLoading(false);
    };

    fetchGenreAndMovies();
  }, [id, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (loading) return <Loader />;

  return (
    <section className="px-4 md:px-10 py-10 bg-[#F4EBD3] min-h-screen">
      <motion.h2
        className="text-4xl font-extrabold text-[#555879] mb-10 text-center flex justify-center items-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Film className="w-7 h-7 text-[#555879]" /> {genreName}
      </motion.h2>

      {/* Hero Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14">
        {heroItems.map((movie, index) => (
          <motion.div
            key={movie.id}
            className="rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-[#DED3C4] hover:scale-[1.02] transition-transform duration-300"
            onClick={() =>
              navigate(`/${movie.media_type === 'tv' ? 'series' : 'movie'}/${movie.id}`)
            }
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
          >
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                  : 'https://via.placeholder.com/500x280?text=No+Image'
              }
              alt={movie.title || movie.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-[#555879] truncate">
                {movie.title || movie.name}
              </h3>
              <p className="text-sm text-[#98A1BC]">
                {movie.release_date || movie.first_air_date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Movie Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="bg-[#DED3C4] p-2 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            onClick={() =>
              navigate(`/${movie.media_type === 'tv' ? 'series' : 'movie'}/${movie.id}`)
            }
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Image'
              }
              alt={movie.title || movie.name}
              className="w-full h-[260px] object-cover rounded-md"
            />
            <div className="p-2 text-[#555879]">
              <h3 className="text-md font-semibold truncate">
                {movie.title || movie.name}
              </h3>
              <p className="text-sm text-[#98A1BC]">
                {movie.release_date || movie.first_air_date}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Movies */}
      {!movies.length && (
        <div className="text-center text-gray-500 mt-10">
          No movies found for this genre.
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12 mb-20 text-[#555879]">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded border ${
            page === 1
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
          }`}
        >
          Previous
        </button>

        {renderPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 rounded border ${
              num === page
                ? 'bg-[#555879] text-[#F4EBD3]'
                : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded border ${
            page === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
          }`}
        >
          Next
        </button>
      </div>

      {/* Recommended Genres */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold text-[#555879] mb-6 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-[#555879]" /> Recommended Genres
        </h3>
        <div className="flex justify-center flex-wrap gap-4">
          {recommendedGenres.map((g) => (
            <button
              key={g.id}
              onClick={() => navigate(`/genre/${g.id}`)}
              className="bg-[#DED3C4] hover:bg-[#e4d6bb] text-[#555879] px-5 py-2 rounded-full shadow transition-all font-medium"
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genre;