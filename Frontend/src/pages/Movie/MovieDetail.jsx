import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Loader from '../../components/Loader';
import FanComments from '../../components/common/FanComments';
import TrailerSection from '../../components/common/TrailerSection';
import ScenePreviews from '../../components/common/ScenePreviews';
import MediaInfo from '../../components/common/MediaInfo';
import YouMightAlsoLike from '../../components/common/YouMightAlsoLike';
import Cast from '../../components/common/Cast'; // Import Cast component

// Hooks
import { useFavorites } from '../../hooks/useFavorites';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [backdrops, setBackdrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(
    (item) => item.id === parseInt(id) && item.media_type === 'movie'
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        };

        const [movieRes, videoRes, recRes, imagesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { headers }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, { headers }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, { headers }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, { headers }),
        ]);

        setMovie(movieRes.data);

        const trailer = videoRes.data.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);

        setRecommended(recRes.data.results.slice(0, 30));
        setBackdrops(imagesRes.data.backdrops.slice(0, 8));
      } catch (err) {
        console.error('Error fetching movie details:', err);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  if (loading) return <Loader />;

  const handleToggleFavorite = () => {
    if (!movie) return;
    isFavorite
      ? removeFavorite(movie.id)
      : addFavorite({ ...movie, media_type: 'movie' });
  };

  return (
    <div className="bg-[#F4EBD3] text-[#555879] min-h-screen">
      {/* Shared Media Info */}
      <MediaInfo
        media={movie}
        mediaType="movie"
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />

      {/* Cast */}
      <Cast mediaType="movie" id={id} />

      {/* Trailer */}
      <TrailerSection trailerKey={trailerKey} />

      {/* Scene Previews */}
      <ScenePreviews backdrops={backdrops} />

      {/* Recommendations */}
      <YouMightAlsoLike recommended={recommended} setLoading={setLoading} type="movie" />

      {/* Fan Comments */}
      <div className="px-6 md:px-10 mt-12 pb-16">
        <FanComments title={movie.title} />
      </div>
    </div>
  );
};

export default MovieDetails;
