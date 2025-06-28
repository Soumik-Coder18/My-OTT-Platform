import React, { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries } from '../../services/movieApi';
import Hero from './Hero';
import MovieSection from './MovieSection';
import SeriesSection from './SeriesSection';
import Loader from '../../components/Loader'; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
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
        setSeries(seriesRes.data.results);

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
      <MovieSection movies={movies} />
      <SeriesSection series={series} />
    </div>
  );
};

export default Home;
