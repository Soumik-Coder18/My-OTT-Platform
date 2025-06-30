import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularMovies } from '../../services/movieApi';
import Loader from '../../components/Loader';
import FilterDropdown from '../../components/Filter&Sort/FilterDropdown';
import SortDropdown from '../../components/Filter&Sort/SortDropdown';
import { SearchX, Clapperboard } from 'lucide-react';
import MovieCard from '../../components/MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    sort_by: '',
  });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoviesWithFilters(page);
  }, [page, filters]);

  const fetchMoviesWithFilters = (pageNum = 1) => {
    setLoading(true);
    getPopularMovies(filters, pageNum)
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      })
      .catch((err) => console.error('Error fetching filtered movies:', err))
      .finally(() => setLoading(false));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader />;

  const pageNumbers = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-[#F4EBD3]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-8 h-8 text-[#555879]" />
          <h1 className="text-3xl font-bold text-[#555879]">Popular Movies</h1>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Styled like Filter/Sort buttons */}
          <button
            onClick={() => navigate('/indian-movies')}
            className="bg-[#555879] text-[#F4EBD3] px-4 py-2 rounded hover:bg-[#3e4059] transition flex items-center gap-2
              focus:outline-none focus:ring-2 focus:ring-[#555879]"
          >
            Indian Movies
          </button>

          <FilterDropdown
            filters={filters}
            setFilters={applyFilters}
            onApply={() => {}}
          />
          <SortDropdown
            type="movie"
            sortOption={filters.sort_by}
            setSortOption={(sort_by) => applyFilters({ ...filters, sort_by })}
            onApply={() => {}}
          />
        </div>
      </div>

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} media={movie} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-8 text-[#555879]">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded border ${
                page === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
              }`}
            >
              Previous
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-1 rounded border ${
                  num === page ? 'bg-[#555879] text-[#F4EBD3]' : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded border ${
                page === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#555879] hover:text-[#F4EBD3]'
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-24 text-[#555879] animate-fade-in">
          <SearchX className="w-16 h-16 text-[#888da8] animate-bounce mb-4" />
          <h2 className="text-xl font-bold">No Matches Found</h2>
          <p className="text-sm text-[#888da8] mt-2">Try changing your filters</p>
        </div>
      )}
    </div>
  );
};

export default Movies;