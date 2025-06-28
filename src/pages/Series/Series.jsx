import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularSeries } from '../../services/movieApi';
import Loader from '../../components/Loader';

const Series = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await getPopularSeries();
        setSeriesList(res.data.results);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) return <Loader message="Loading series..." />;

  return (
    <div className="min-h-screen bg-[#F4EBD3] text-[#555879] p-6">
      <h1 className="text-3xl font-bold mb-6">📺 Popular Series</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {seriesList.map((series) => (
          <div
            key={series.id}
            onClick={() => navigate(`/series/${series.id}`)}
            className="cursor-pointer rounded-lg shadow-md hover:scale-105 transition-transform duration-200 overflow-hidden"
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
            <h2 className="mt-2 text-base font-semibold truncate px-1">{series.name}</h2>
            <p className="text-sm text-[#888da8] px-1 mb-2">
              {series.first_air_date?.slice(0, 4)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;
