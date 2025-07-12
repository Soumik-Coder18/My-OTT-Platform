import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Heart, Download, ArrowLeft, Sparkles } from 'lucide-react';

// Components
import Loader from '../../components/Loader';
import FanComments from '../../components/common/FanComments';
import TrailerSection from '../../components/common/TrailerSection';
import ScenePreviews from '../../components/common/ScenePreviews';
import YouMightAlsoLike from '../../components/common/YouMightAlsoLike';
import Cast from '../../components/common/Cast';

// Hooks
import { useFavorites } from '../../hooks/useFavorites';

const SeriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [backdrops, setBackdrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(
    (item) => item.id === parseInt(id) && item.media_type === 'tv'
  );

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        };

        const [seriesRes, videoRes, recRes, imagesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, { headers }),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, { headers }),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, { headers }),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/images`, { headers }),
        ]);

        setSeries(seriesRes.data);

        const trailer = videoRes.data.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);

        setRecommended(recRes.data.results.slice(0, 30));
        setBackdrops(imagesRes.data.backdrops.slice(0, 8));
      } catch (err) {
        console.error('Error fetching series details:', err);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id, navigate]);

  if (loading) return <Loader />;

  const handleToggleFavorite = async () => {
    if (!series) return;
    try {
      if (isFavorite) {
        await removeFavorite(series.id);
      } else {
        await addFavorite({ ...series, media_type: 'tv' });
      }
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Hero Section with Backdrop */}
      {series && (
        <motion.section 
          className="relative w-full h-[70vh] min-h-[500px] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${series.backdrop_path || series.poster_path}`}
              alt={series.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-purple-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end p-6 md:p-12">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col lg:flex-row gap-8 items-end"
              >
                {/* Poster */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <div className="relative w-48 md:w-64 lg:w-80">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50" />
                    <img
                      src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                      alt={series.name}
                      className="relative w-full h-auto rounded-2xl shadow-2xl border-4 border-white/20"
                    />
                  </div>
                </motion.div>

                {/* Series Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex-1 text-white"
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    Featured Series
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                  >
                    {series.name}
                  </motion.h1>

                  {/* Tagline */}
                  {series.tagline && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                      className="text-lg text-gray-300 italic mb-4"
                    >
                      "{series.tagline}"
                    </motion.p>
                  )}

                  {/* Stats Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-200"
                  >
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{series.vote_average?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{series.first_air_date?.slice(0, 4) || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{series.episode_run_time?.[0] || '-'} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{series.vote_count?.toLocaleString() || '0'} votes</span>
                    </div>
                  </motion.div>

                  {/* Genres */}
                  {series.genres && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="flex flex-wrap gap-2 mb-6"
                    >
                      {series.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    className="flex flex-wrap gap-3"
                  >
                    <motion.button 
                      onClick={async () => {
                        try {
                          const response = await axios.get(
                            `https://api.themoviedb.org/3/tv/${series.id}/watch/providers`,
                            {
                              headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
                              },
                            }
                          );

                          const usProviders = response.data.results?.US;
                          const streamingPlatforms = usProviders?.flatrate || [];

                          if (streamingPlatforms.length > 0) {
                            const platform = streamingPlatforms[0];
                            const platformUrls = {
                              8: 'https://www.netflix.com',
                              119: 'https://www.primevideo.com',
                              350: 'https://www.appletv.com',
                              220: 'https://www.hulu.com',
                              192: 'https://www.hbo.com',
                              118: 'https://www.disneyplus.com',
                            };
                            
                            const url = platformUrls[platform.provider_id] || 
                              `https://www.justwatch.com/us/search?q=${encodeURIComponent(series.name)}`;
                            
                            window.open(url, '_blank');
                          } else {
                            const searchQuery = encodeURIComponent(`${series.name} tv show streaming`);
                            const justWatchUrl = `https://www.justwatch.com/us/search?q=${searchQuery}`;
                            window.open(justWatchUrl, '_blank');
                          }
                        } catch (error) {
                          console.error('Error fetching watch providers:', error);
                          const searchQuery = encodeURIComponent(`${series.name} tv show streaming`);
                          const justWatchUrl = `https://www.justwatch.com/us/search?q=${searchQuery}`;
                          window.open(justWatchUrl, '_blank');
                        }
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-5 h-5" />
                      Watch Now
                    </motion.button>

                    <motion.button 
                      onClick={() => navigate(`/download/${series.id}`)}
                      className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </motion.button>

                    <motion.button 
                      onClick={handleToggleFavorite}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                        isFavorite
                          ? 'bg-red-500 text-white hover:bg-red-600 hover:scale-105'
                          : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-105 border border-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isFavorite ? (
                        <>
                          <Heart className="w-5 h-5 fill-current" />
                          Favorited
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5" />
                          Add to Favorites
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Overview Section */}
        {series && (
          <motion.section 
            className="px-4 md:px-10 py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Overview */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{series.overview}</p>
                  
                  {/* Additional Info */}
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {series.status && (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <h3 className="text-purple-300 font-semibold mb-2">Status</h3>
                        <p className="text-white">{series.status}</p>
                      </div>
                    )}
                    {series.number_of_seasons && (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <h3 className="text-purple-300 font-semibold mb-2">Seasons</h3>
                        <p className="text-white">{series.number_of_seasons}</p>
                      </div>
                    )}
                    {series.number_of_episodes && (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <h3 className="text-purple-300 font-semibold mb-2">Episodes</h3>
                        <p className="text-white">{series.number_of_episodes}</p>
                      </div>
                    )}
                    {series.original_language && (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <h3 className="text-purple-300 font-semibold mb-2">Original Language</h3>
                        <p className="text-white uppercase">{series.original_language}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Networks */}
                {series.networks && series.networks.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Networks</h2>
                    <div className="space-y-4">
                      {series.networks.map((network) => (
                        <div key={network.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                          {network.logo_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                              alt={network.name}
                              className="h-8 object-contain mb-2"
                            />
                          )}
                          <p className="text-white font-medium">{network.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Cast Section */}
        <Cast mediaType="tv" id={id} />

        {/* Trailer Section */}
        <TrailerSection trailerKey={trailerKey} />

        {/* Scene Previews */}
        <ScenePreviews backdrops={backdrops} />

        {/* Recommendations */}
        <YouMightAlsoLike recommended={recommended} setLoading={setLoading} type="series" />

        {/* Fan Comments */}
        <div className="px-4 md:px-10 py-16">
          <div className="max-w-7xl mx-auto">
            <FanComments 
              mediaId={id} 
              mediaType="tv" 
              title={series?.name} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
