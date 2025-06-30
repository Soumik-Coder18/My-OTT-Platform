import React, { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries } from '../../services/movieApi';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const HeroMiddle = ({ type = 'movie' }) => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(null);
  const [videoAvailable, setVideoAvailable] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = type === 'movie' ? await getPopularMovies() : await getPopularSeries();
        setItems(response.data.results || []);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };
    fetchItems();
  }, [type]);

  useEffect(() => {
    const fetchVideoKey = async () => {
      if (!items[currentIndex]) return;

      setVideoKey(null);
      setVideoAvailable(true);

      try {
        const endpoint =
          type === 'movie'
            ? `/movie/${items[currentIndex].id}/videos`
            : `/tv/${items[currentIndex].id}/videos`;

        const res = await axios.get(`${API_BASE}${endpoint}`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          params: { language: 'en-US' },
        });

        const trailers = res.data.results.filter(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        );

        if (trailers.length) {
          setVideoKey(trailers[0].key);
        } else {
          setVideoAvailable(false);
        }
      } catch (err) {
        console.error('Video fetch failed:', err);
        setVideoAvailable(false);
      }
    };

    if (items.length) fetchVideoKey();
  }, [items, currentIndex, type]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % items.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [items]);

  const currentItem = items[currentIndex];
  if (!items.length || !currentItem) return null;

  return (
    <section className="relative w-full my-12 px-4 md:px-10">
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/6] rounded-3xl overflow-hidden shadow-2xl bg-black animate-fade-in-slow">
        {videoKey && videoAvailable ? (
          <iframe
            title={currentItem.title || currentItem.name}
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}&controls=0&modestbranding=1&showinfo=0&rel=0&disablekb=1`}
            className="w-full h-full pointer-events-none"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${
              currentItem.backdrop_path || currentItem.poster_path
            }`}
            alt={currentItem.title || currentItem.name}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay Info (hidden on mobile) */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 sm:p-6 text-white hidden sm:block">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold line-clamp-2">
            {currentItem.title || currentItem.name}
          </h2>
          <p className="text-xs sm:text-sm md:text-base mt-1 md:mt-2 line-clamp-3">
            {currentItem.overview}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroMiddle;