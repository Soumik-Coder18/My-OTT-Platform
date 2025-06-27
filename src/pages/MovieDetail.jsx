import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy movie data (same as in Movies.jsx)
const dummyMovies = [
  {
    id: '101',
    title: 'Digital Dreams',
    poster: 'https://via.placeholder.com/300x450?text=Digital+Dreams',
    genre: 'Sci-Fi',
    year: 2023,
    rating: 8.2,
    description: 'In a future ruled by AI, one hacker dares to dream differently.',
  },
  {
    id: '102',
    title: 'Love & Code',
    poster: 'https://via.placeholder.com/300x450?text=Love+%26+Code',
    genre: 'Romance',
    year: 2022,
    rating: 7.8,
    description: 'A quirky romance between two software developers.',
  },
  {
    id: '103',
    title: 'Skyfall Horizon',
    poster: 'https://via.placeholder.com/300x450?text=Skyfall+Horizon',
    genre: 'Action',
    year: 2021,
    rating: 8.5,
    description: 'Sky-high stunts and non-stop action above the clouds.',
  },
  {
    id: '104',
    title: 'Beyond Silence',
    poster: 'https://via.placeholder.com/300x450?text=Beyond+Silence',
    genre: 'Drama',
    year: 2023,
    rating: 8.0,
    description: 'A journey through grief, music, and finding one’s voice again.',
  },
  {
    id: '105',
    title: 'Nightcode',
    poster: 'https://via.placeholder.com/300x450?text=Nightcode',
    genre: 'Thriller',
    year: 2020,
    rating: 7.9,
    description: 'A mysterious series of crimes linked to midnight code drops.',
  },
  {
    id: '106',
    title: 'Virtual Empire',
    poster: 'https://via.placeholder.com/300x450?text=Virtual+Empire',
    genre: 'Fantasy',
    year: 2024,
    rating: 9.0,
    description: 'A hidden realm inside a VR game turns into a real battlefield.',
  },
];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = dummyMovies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EBD3] text-[#555879] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Movie Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-[#555879] text-[#F4EBD3] rounded hover:bg-[#3e4059]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6 bg-[#F4EBD3] text-[#555879]">
      {/* Poster */}
      <div className="md:w-1/3 w-full flex justify-center mb-6 md:mb-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="rounded-lg w-[300px] h-auto shadow-lg"
        />
      </div>

      {/* Details */}
      <div className="md:w-2/3 md:pl-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-lg text-[#888da8] mb-2">
          {movie.genre} • {movie.year}
        </p>
        <p className="text-lg mb-4">⭐ {movie.rating}</p>
        <p className="text-base leading-relaxed">{movie.description}</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 self-start px-4 py-2 bg-[#555879] text-[#F4EBD3] rounded hover:bg-[#3e4059] transition"
        >
          ← Back to Movies
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
