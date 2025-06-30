// ==========================================
// 🏠 Home Page Component
// Displays: Hero, Movies, Series, Genres, Actors
// ==========================================

import React, { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries } from '../../services/movieApi';

// 🔹 Sections
import Hero from './Hero';
import MovieSection from './MovieSection';
import HeroMiddle from './HeroMiddle';
import Actor from './ActorSection';
import SeriesSection from './SeriesSection';
import Trending from './Trending';
import GenreSection from './GenreSection';
import UpcomingReleases from './UpcomingReleases';
import IndianMoviesSection from './IndianMoviesSection';
import IndianTvShowsSection from './IndianTvShowsSection';

// 🔄 Loader & Animation
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';

const Home = () => {
  // =============================
  // 🧠 State Management
  // =============================
  const [movies, setMovies] = useState([]);
  const [series, setseries] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // 📡 Fetch Popular Movies & Series
  // =============================
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [movieRes, seriesRes] = await Promise.all([
          getPopularMovies(),
          getPopularSeries(),
        ]);

        setMovies(movieRes.data.results);
        setseries(seriesRes.data.results);

        // 🎯 Select top 3 movies + top 2 series for Hero banner
        const featuredItems = [
          ...movieRes.data.results.slice(0, 3),
          ...seriesRes.data.results.slice(0, 2),
        ];
        setFeatured(featuredItems);

      } catch (error) {
        console.error('❌ Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // =============================
  // ⏳ Loading UI
  // =============================
  if (loading) return <Loader message="Loading content..." />;

  // =============================
  // ✅ Render Home Page Sections
  // =============================
  return (
    <div className="min-h-screen bg-[#F4EBD3] p-6">
      
      {/* 🎬 Top Banner - Featured Movies + Series */}
      <Hero featured={featured} />

      {/* 🏷️ Genre Filter for Movies */}
      <GenreSection type="movie" />

      {/* 🍿 Popular Movies Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MovieSection movies={movies} />
      </motion.div>

      {/* 🇮🇳 Indian Movies Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <IndianMoviesSection />
      </motion.div>

      {/* 🧩 Middle Hero Banner (Movie/Series Highlight) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="my-10"
      >
        <HeroMiddle type="movie" /> {/* Change to type="series" as needed */}
      </motion.div>

      {/* 📺 Popular Series Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <SeriesSection series={series} />
      </motion.div>

      {/* 🇮🇳 Indian TV Shows Section */}  
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <IndianTvShowsSection />
      </motion.div>

      {/* 👥 Featured Actors Section */}
      <Actor />

      {/* 📣 Bottom Promotional or CTA Section */}
      <Trending />

      {/* 📅 Upcoming Releases Section */}
      <UpcomingReleases />
    </div>
  );
};

export default Home;