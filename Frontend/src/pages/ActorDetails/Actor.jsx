import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { UserRound, SearchX } from 'lucide-react';
import { getPopularPeople } from '../../services/movieApi';

const Actor = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchActors(page);
  }, [page]);

  const fetchActors = (pageNum = 1) => {
    setLoading(true);
    getPopularPeople(pageNum)
      .then((res) => {
        setActors(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      })
      .catch((err) => console.error('Error fetching actors:', err))
      .finally(() => setLoading(false));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  if (loading) return <Loader />;

  // Filter by known_for_department
  const maleActors = actors.filter((a) => a.gender === 2 && a.known_for_department === 'Acting');
  const femaleActors = actors.filter((a) => a.gender === 1 && a.known_for_department === 'Acting');

  const renderSection = (title, list) => (
    list.length > 0 && (
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-[#555879] mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {list.map((actor) => (
            <Link
              to={`/actor/${actor.id}`}
              key={actor.id}
              className="bg-[#DED3C4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : '/no-avatar.png'
                }
                alt={actor.name}
                className="w-full h-80 object-cover"
              />
              <div className="p-3 text-[#555879] text-center font-semibold truncate">
                {actor.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen px-4 py-10 bg-[#F4EBD3]">
      <div className="flex items-center gap-2 mb-8">
        <UserRound className="w-8 h-8 text-[#555879]" />
        <h1 className="text-3xl font-bold text-[#555879]">Popular Actors</h1>
      </div>

      {actors.length > 0 ? (
        <>
          {renderSection('Male Actors', maleActors)}
          {renderSection('Female Actors', femaleActors)}

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
          <h2 className="text-xl font-bold">No Actors Found</h2>
        </div>
      )}
    </div>
  );
};

export default Actor;
