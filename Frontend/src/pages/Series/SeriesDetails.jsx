import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Loader from '../../components/Loader';
import FanComments from '../../components/common/FanComments';
import TrailerSection from '../../components/common/TrailerSection';
import ScenePreviews from '../../components/common/ScenePreviews';
import YouMightAlsoLike from '../../components/common/YouMightAlsoLike';
import MediaInfo from '../../components/common/MediaInfo';
import Cast from '../../components/common/Cast'; // ✅ NEW IMPORT

// Hooks
import { useFavorites } from '../../hooks/useFavorites';

const seriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setseries] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [backdrops, setBackdrops] = useState([]);

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(
    (item) => item.id === parseInt(id) && item.media_type === 'tv'
  );

  useEffect(() => {
    const fetchseries = async () => {
      try {
        setLoading(true);
        const headers = {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        };

        const [detailsRes, videosRes, recRes, imagesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=credits`, headers), // ✅ updated
          axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, headers),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, headers),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/images`, headers),
        ]);

        setseries(detailsRes.data);
        setRecommended(recRes.data.results.slice(0, 30));
        setBackdrops(imagesRes.data.backdrops.slice(0, 8));

        const trailer = videosRes.data.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error('Error fetching series:', err);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchseries();
  }, [id, navigate]);

  if (loading) return <Loader />;

  const handleToggleFavorite = () => {
    if (!series) return;
    isFavorite
      ? removeFavorite(series.id)
      : addFavorite({ ...series, media_type: 'tv' });
  };

  return (
    <div className="bg-[#F4EBD3] text-[#555879] min-h-screen">
      <MediaInfo
        media={series}
        mediaType="tv"
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />

      {/* ✅ Add Cast */}
      <Cast mediaType="tv" id={id} />

      <TrailerSection trailerKey={trailerKey} />
      <ScenePreviews backdrops={backdrops} />
      <YouMightAlsoLike recommended={recommended} setLoading={setLoading} type="series" />

      <div className="px-6 md:px-10 mt-12 pb-16">
        <FanComments title={series.name} />
      </div>
    </div>
  );
};

export default seriesDetails;
