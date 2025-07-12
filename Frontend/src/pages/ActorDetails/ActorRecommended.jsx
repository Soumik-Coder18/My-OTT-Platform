import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRoundSearch, Sparkles, Star } from 'lucide-react';
import { motion, useAnimationFrame } from 'framer-motion';
import { getPopularPeople } from '../../services/movieApi';

const ActorRecommended = ({ setLoading }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const x = useRef(0);
  const speed = 0.5;

  const [popularActors, setPopularActors] = useState([]);

  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        const res = await getPopularPeople();
        setPopularActors(res.data.results || []);
      } catch (err) {
        console.error('Error fetching popular actors:', err);
      }
    };

    fetchPopularActors();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!trackRef.current || !containerRef.current) return;
    x.current -= speed * (delta / 16);
    const scrollWidth = trackRef.current.scrollWidth / 2;
    if (Math.abs(x.current) >= scrollWidth) {
      x.current = 0;
    }
    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  if (!popularActors.length) return null;

  const duplicated = [...popularActors, ...popularActors];

  return (
    <section className="px-4 md:px-10 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Discover More Talent</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Popular <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Actors</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore other talented actors you might enjoy
          </p>
        </motion.div>

        {/* Scrolling Actors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          ref={containerRef}
          className="overflow-hidden w-full relative"
        >
          <motion.div
            ref={trackRef}
            className="flex gap-6 w-max will-change-transform"
          >
            {duplicated.map((actor, index) => (
              <motion.div
                key={`${actor.id}-${index}`}
                onClick={() => {
                  setLoading?.(true);
                  navigate(`/actor/${actor.id}`);
                }}
                className="flex flex-col items-center cursor-pointer group"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Actor Image */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                          : '/no-avatar.png'
                      }
                      alt={actor.name}
                      loading="lazy"
                      className="w-32 h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    
                    {/* Popularity Badge */}
                    {actor.popularity && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400/30 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 text-white fill-current" />
                        <span className="text-xs text-white font-bold">
                          {actor.popularity.toFixed(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Known For Badge */}
                    {actor.known_for_department && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full">
                        <span className="text-xs text-white font-medium">
                          {actor.known_for_department}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actor Name */}
                <div className="mt-4 text-center max-w-32">
                  <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-200 transition-colors duration-300">
                    {actor.name}
                  </h3>
                  {actor.known_for && actor.known_for.length > 0 && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                      {actor.known_for[0].title || actor.known_for[0].name}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ActorRecommended;
