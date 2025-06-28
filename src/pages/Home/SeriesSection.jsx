import React from 'react';
import { Link } from 'react-router-dom';

const SeriesSection = ({ series }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#555879] mb-4">📺 Popular Series</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {series.map((show) => (
          <Link to={`/series/${show.id}`} key={show.id} className="rounded overflow-hidden shadow hover:scale-105 transition">
            <img
              src={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={show.name}
              className="w-full h-90 object-cover"
            />
            <div className="p-2 text-sm text-[#555879]">{show.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SeriesSection;
