import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularSeries } from '../../services/movieApi';
import Loader from '../../components/Loader';
import FilterDropdown from '../../components/Filter&Sort/FilterDropdown';
import SortDropdown from '../../components/Filter&Sort/SortDropdown';
import { SearchX, Tv } from 'lucide-react';

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);
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

  // Fetch series whenever page or filters change
  useEffect(() => {
    fetchSeriesWithFilters(page);
  }, [page, filters]);

  const fetchSeriesWithFilters = (pageNum = 1) => {
    setLoading(true);
    getPopularSeries(filters, pageNum)
      .then((res) => {
        setSeriesList(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages); // cap 500 pages
      })
      .catch((err) => console.error('Error fetching series:', err))
      .finally(() => setLoading(false));
  };

  // Handle page change with scroll to top
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply new filters and reset page to 1 with scroll
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader message="Loading series..." />;

  // Pagination buttons - current page ± 2 pages
  const pageNumbers = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-[#F4EBD3] text-[#555879] p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Tv className="w-8 h-8 text-[#555879]" />
          <h1 className="text-3xl font-bold text-[#555879]">Popular Shows</h1>
        </div>

        <div className="flex gap-4">
          <FilterDropdown
            filters={filters}
            setFilters={applyFilters}
            onApply={() => {}}
          />
          <SortDropdown
            type="series"
            sortOption={filters.sort_by}
            setSortOption={(sort_by) => applyFilters({ ...filters, sort_by })}
            onApply={() => {}}
          />
        </div>
      </div>

      {seriesList.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {seriesList.map(series => (
              <div
                key={series.id}
                onClick={() => navigate(`/series/${series.id}`)}
                className="cursor-pointer rounded-lg shadow-md hover:scale-105 transition-transform duration-200 overflow-hidden bg-[#DED3C4]"
              >
                <img
                  src={
                    series.poster_path
                      ? `https://image.tmdb.org/t/p/w300${series.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={series.name}
                  className="w-full h-[340px] object-cover rounded-md"
                />
                <h2 className="mt-2 text-base font-semibold truncate px-2">{series.name}</h2>
                <p className="text-sm text-[#888da8] px-2 mb-2">
                  {series.first_air_date?.slice(0, 4)}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
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

            {pageNumbers.map(num => (
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

export default Series;
