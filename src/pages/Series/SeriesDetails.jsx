import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader';
import {
  PlayCircle,
  Download,
  Heart,
  HeartOff,
  Star,
} from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

const SeriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [backdrops, setBackdrops] = useState([]);

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(
    (item) => item.id === parseInt(id) && item.media_type === 'tv'
  );

  // Fan comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
  const stored = localStorage.getItem(`comments-${id}`);
  if (stored) {
    setComments(JSON.parse(stored));
  } else {
    setComments([]);
  }
}, [id]);


  const handleAddComment = () => {
  if (newComment.trim() === '') return;

  const newEntry = {
    text: newComment.trim(),
    date: new Date().toISOString(),
  };

  const updatedComments = [newEntry, ...comments];
  setComments(updatedComments);
  setNewComment('');

  localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
};


  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const headers = {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        };

        const [detailsRes, videosRes, recRes, imagesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, headers),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, headers),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, headers),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/images`, headers),
        ]);

        setSeries(detailsRes.data);
        setRecommended(recRes.data.results.slice(0, 10));
        setBackdrops(imagesRes.data.backdrops.slice(0, 10));

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

    fetchSeries();
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
      {/* Series Info */}
      <div className="flex flex-col md:flex-row p-6 md:p-10 gap-10">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={
              series.poster_path
                ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={series.name}
            className="rounded-xl w-[300px] shadow-lg"
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{series.name}</h1>
          <p className="text-lg mb-2 text-[#888da8]">
            {series.first_air_date?.slice(0, 4)} •{' '}
            {series.episode_run_time?.[0] || '-'} mins •{' '}
            {series.genres?.map((g) => g.name).join(', ')}
          </p>
          <p className="text-lg mb-4 flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-500" />
            {series.vote_average?.toFixed(1)} / 10
          </p>
          <p className="text-base leading-relaxed">{series.overview}</p>

          <div className="flex gap-3 mb-6 mt-4 flex-wrap">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 bg-[#555879] text-[#F4EBD3] rounded hover:bg-[#3e4059] transition"
            >
              <PlayCircle className="w-5 h-5" /> Watch
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 bg-[#555879] text-[#F4EBD3] rounded hover:bg-[#3e4059] transition"
            >
              <Download className="w-5 h-5" /> Download
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-[#555879] text-[#F4EBD3] hover:bg-[#3e4059]'
              }`}
            >
              {isFavorite ? (
                <>
                  <HeartOff className="w-5 h-5" /> Remove Favorite
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" /> Add to Favorites
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {trailerKey && (
        <div className="px-6 md:px-10 mt-8">
          <h2 className="text-xl font-bold mb-4">📽 Trailer</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Scene Previews */}
        {backdrops.length > 0 && (
        <div className="px-4 md:px-10 mt-12 max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center">🎞 Scene Previews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {backdrops.map((scene, idx) => (
                <div
                key={idx}
                className="bg-[#e5d7b8] p-4 rounded-xl shadow-lg flex flex-col"
                >
                <img
                    src={`https://image.tmdb.org/t/p/w780${scene.file_path}`}
                    alt={`Scene ${idx + 1}`}
                    className="w-full h-[200px] object-cover rounded-lg mb-3"
                />
                <p className="text-sm font-semibold text-[#555879] text-center">
                    Scene {idx + 1}
                </p>
                </div>
            ))}
            </div>
        </div>
        )}



      {/* Recommendations */}
      {recommended.length > 0 && (
        <div className="px-6 md:px-10 pb-12 mt-12">
          <h2 className="text-xl font-bold mb-4">🎬 You Might Also Like</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {recommended.map((rec) => (
              <div
                key={rec.id}
                onClick={() => {
                  setLoading(true);
                  navigate(`/series/${rec.id}`);
                }}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={
                    rec.poster_path
                      ? `https://image.tmdb.org/t/p/w200${rec.poster_path}`
                      : 'https://via.placeholder.com/90x135?text=No+Image'
                  }
                  alt={rec.name}
                  className="w-[90px] h-[135px] object-cover rounded-md shadow-md"
                />
                <p className="text-xs text-center mt-2 w-[90px] truncate">{rec.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fan Comments */}
      <div className="px-6 md:px-10 mt-12 pb-16">
        <h2 className="text-xl font-bold mb-4">💬 Fan Comments</h2>
        <div className="space-y-4 max-w-2xl">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring"
            rows={3}
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-[#555879] text-[#F4EBD3] rounded hover:bg-[#3e4059] transition"
          >
            Post Comment
          </button>

          <div className="mt-6 space-y-3">
            {comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
            ) : (
              comments.map((comment, i) => (
                <div
                  key={i}
                  className="bg-[#e5d7b8] p-3 rounded shadow text-sm"
                >
                  <p>{comment.text}</p>
                  <p className="text-xs text-right text-gray-600">
                    {new Date(comment.date).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
