import React from 'react';
import { Link } from 'react-router-dom';

const dummyTrending = [
  {
    id: 1,
    title: 'The Silent Echo',
    poster: 'https://via.placeholder.com/300x450?text=The+Silent+Echo',
    rating: 8.4,
  },
  {
    id: 2,
    title: 'Edge of Tomorrow',
    poster: 'https://via.placeholder.com/300x450?text=Edge+of+Tomorrow',
    rating: 7.9,
  },
  {
    id: 3,
    title: 'Crimson Moon',
    poster: 'https://via.placeholder.com/300x450?text=Crimson+Moon',
    rating: 8.2,
  },
  {
    id: 4,
    title: 'Lost Horizon',
    poster: 'https://via.placeholder.com/300x450?text=Lost+Horizon',
    rating: 7.6,
  },
  {
    id: 5,
    title: 'Digital Dreams',
    poster: 'https://via.placeholder.com/300x450?text=Digital+Dreams',
    rating: 8.1,
  },
];

const dummyTopRated = [
  {
    id: 6,
    title: 'Midnight Shadows',
    poster: 'https://via.placeholder.com/300x450?text=Midnight+Shadows',
    rating: 9.0,
  },
  {
    id: 7,
    title: 'Echoes of Time',
    poster: 'https://via.placeholder.com/300x450?text=Echoes+of+Time',
    rating: 8.7,
  },
  {
    id: 8,
    title: 'Galaxy Wars',
    poster: 'https://via.placeholder.com/300x450?text=Galaxy+Wars',
    rating: 8.9,
  },
  {
    id: 9,
    title: 'Haunted Hearts',
    poster: 'https://via.placeholder.com/300x450?text=Haunted+Hearts',
    rating: 8.5,
  },
  {
    id: 10,
    title: 'Infinite Loop',
    poster: 'https://via.placeholder.com/300x450?text=Infinite+Loop',
    rating: 9.1,
  },
];

const Home = () => {
  const renderMovieCard = (movie) => (
    <Link
      to={`/details/${movie.id}`}
      key={movie.id}
      className="bg-[#DED3C4] rounded-lg overflow-hidden shadow hover:scale-105 transition"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3 text-[#555879]">
        <h3 className="text-md font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-[#888da8] mt-1">⭐ {movie.rating}</p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#F4EBD3] px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#555879] mb-4">
          Welcome to WhisperFrame 🎬
        </h1>
        <p className="text-lg text-[#888da8]">
          Dive into a world of movies and series tailored just for you.
        </p>
      </section>

      {/* Trending */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#555879] mb-4">🔥 Trending Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {dummyTrending.map(renderMovieCard)}
        </div>
      </section>

      {/* Top Rated */}
      <section>
        <h2 className="text-2xl font-semibold text-[#555879] mb-4">⭐ Top Rated</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {dummyTopRated.map(renderMovieCard)}
        </div>
      </section>
    </div>
  );
};

export default Home;
