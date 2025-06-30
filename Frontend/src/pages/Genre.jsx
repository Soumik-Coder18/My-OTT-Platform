import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../services/movieApi';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Film } from 'lucide-react';
import Loader from '../components/Loader';

const Genre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [heroItems, setHeroItems] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchGenreAndMovies = async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoading(true);

      try {
        const genresRes = await getGenres();
        const allGenresData = genresRes.data.genres || [];
        setAllGenres(allGenresData);

        const genre = allGenresData.find((g) => String(g.id) === String(id));
        setGenreName(genre ? genre.name : 'Unknown Genre');

        const moviesRes = await getMoviesByGenre(id, page);
        const fetchedMovies = moviesRes.data.results || [];
        setMovies(fetchedMovies);
        setHeroItems(fetchedMovies.slice(0, 3));
        setTotalPages(moviesRes.data.total_pages || 1);
      } catch (err) {
        setGenreName('Unknown Genre');
        setMovies([]);
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
      {/* Header and Filter Button */}
      <div className="flex justify-between items-center mb-10 relative">
        <motion.h2
          className="text-4xl font-extrabold text-[#555879] flex items-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Film className="w-7 h-7 text-[#555879]" /> {genreName}
        </motion.h2>

        <div className="relative">
          <button
            onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
            className="bg-[#555879] text-[#F4EBD3] px-4 py-2 rounded hover:bg-[#3e4059] transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#555879]"
          >
            <SlidersHorizontal size={18} />
            Filter
          </button>

          {genreDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#DED3C4] p-3 rounded-xl shadow-lg z-10 text-[#555879]">
              <h4 className="font-semibold mb-2">Select Genre</h4>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {allGenres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => {
                      navigate(`/genre/${genre.id}`);
                      setGenreDropdownOpen(false);
                    }}
                    className={`text-left hover:bg-[#e4d6bb] p-2 rounded ${
                      String(genre.id) === String(id) ? 'bg-[#cbbca5] font-semibold' : ''
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
    </section>
  );
};

export default Genre;