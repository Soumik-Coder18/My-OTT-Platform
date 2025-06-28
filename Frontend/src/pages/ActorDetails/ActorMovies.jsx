import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Film, Clapperboard } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ActorMovies = () => {
  const { id } = useParams(); // actor ID from URL
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/person/${id}/combined_credits`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'en-US',
            },
          }
        );
        const sortedCredits = (res.data.cast || []).sort((a, b) =>
          (b.popularity || 0) - (a.popularity || 0)
        );
        setCredits(sortedCredits);
      } catch (err) {
        console.error('Failed to fetch actor credits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-[#555879]">Loading...</div>;
  }

  if (credits.length === 0) {
    return (
      <div className="text-center py-20 text-[#555879]">
        <Clapperboard className="w-10 h-10 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">No credits found</h2>
      </div>
    );
  }

  return (
    <section className="px-6 md:px-10 py-10 bg-[#F4EBD3] min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Film className="w-6 h-6 text-[#555879]" />
        <h2 className="text-2xl font-bold text-[#555879]">Filmography</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {credits.map((item) => (
          <Link
  key={item.id}
  to={`/${item.media_type === 'movie' ? 'movie' : 'series'}/${item.id}`}
  className="bg-[#DED3C4] rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 overflow-hidden"
>
  <img
    src={
      item.poster_path
        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
        : '/no-poster.png'
    }
    alt={item.title || item.name}
    className="w-full h-80 object-cover"
  />
  <div className="p-3 text-[#555879] text-center text-sm">
    <p className="font-semibold truncate">{item.title || item.name}</p>
    <p className="italic text-xs">
      {item.media_type === 'movie' ? 'MOVIE' : 'SHOWS'}
    </p>
  </div>
</Link>

        ))}
      </div>
    </section>
  );
};

export default ActorMovies;
