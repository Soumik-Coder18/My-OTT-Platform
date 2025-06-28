import React, { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries } from '../../services/movieApi';
import Hero from './Hero';
import MovieSection from './MovieSection';
import HeroMiddle from './HeroMiddle';
import Actor from './Actor';
import SeriesSection from './SeriesSection';
import HeroBottom from './HeroBottom';
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [series, setseries] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [movieRes, seriesRes] = await Promise.all([
          getPopularMovies(),
          getPopularSeries(),
        ]);

        setMovies(movieRes.data.results);
        setseries(seriesRes.data.results);

        const featuredItems = [
          ...movieRes.data.results.slice(0, 3),
          ...seriesRes.data.results.slice(0, 2),
        ];
        setFeatured(featuredItems);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <Loader message="Loading content..." />;

  return (
    <div className="min-h-screen bg-[#F4EBD3] p-6">
      <Hero featured={featured} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MovieSection movies={movies} />
      </motion.div>

      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="my-10"
    >
    <HeroMiddle type="movie" /> {/* or type="series" if you prefer */}
    </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <SeriesSection series={series} />
      </motion.div>

      <Actor />

      <HeroBottom />
    </div>
  );
};

export default Home;
