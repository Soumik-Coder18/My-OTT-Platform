// ==========================================
// 🏠 Home Page Component
// Displays: Hero, Movies, Series, Genres, Actors
// ==========================================

import React, { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries } from '../../services/movieApi';
import { useAuth } from '../../contexts/AuthContext';

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
import LandingPage from '../../components/LandingPage';
import { motion } from 'framer-motion';

const Home = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  // =============================
  // 🧠 State Management
  // =============================
  const [movies, setMovies] = useState([]);
  const [series, setseries] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // 📡 Fetch Popular Movies & Series (Only for authenticated users)
  // =============================
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

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
  }, [isAuthenticated]);

  // =============================
  // ⏳ Loading UI
  // =============================
  if (authLoading || loading) return <Loader message="Loading content..." />;

  // =============================
  // 🚫 Show Landing Page for Unauthenticated Users
  // =============================
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // =============================
  // ✅ Render Home Page Sections (Authenticated Users Only)
  // =============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -10, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-60 left-1/4 w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-18 h-18 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative z-10 p-6">
      
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
    </div>
  );
};

export default Home;