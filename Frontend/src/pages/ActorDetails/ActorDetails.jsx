import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Star, Calendar, MapPin, Users, Award } from 'lucide-react';
import ActorInfo from './ActorInfo';
import ActorMovies from './ActorMovies';
import ActorRecommended from './ActorRecommended';
import Loader from '../../components/Loader';
import { getPersonById } from '../../services/movieApi';

const ActorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const res = await getPersonById(id);
        setActor(res.data);
      } catch (error) {
        console.error('Failed to fetch actor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!actor) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white">
        <p className="text-xl">Actor not found.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Backdrop */}
      <motion.section 
        className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] overflow-hidden"
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
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                : 'https://via.placeholder.com/1920x1080?text=No+Image'
            }
            alt={actor.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-purple-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-end"
            >
              {/* Actor Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50" />
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : '/no-avatar.png'
                    }
                    alt={actor.name}
                    className="relative w-full h-auto rounded-2xl shadow-2xl border-4 border-white/20"
                  />
                </div>
              </motion.div>

              {/* Actor Info */}
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
                  className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 border border-white/20"
                >
                                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{actor.known_for_department || 'Actor'}</span>
                    <span className="sm:hidden">{actor.known_for_department === 'Acting' ? 'Actor' : actor.known_for_department || 'Actor'}</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight"
                >
                  {actor.name}
                </motion.h1>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm text-gray-200"
                >
                  {actor.birthday && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                      <span>{actor.birthday}</span>
                    </div>
                  )}
                  {actor.place_of_birth && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                      <span>{actor.place_of_birth}</span>
                    </div>
                  )}
                  {actor.popularity && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                      <span>{actor.popularity.toFixed(1)}</span>
                    </div>
                  )}
                  {actor.gender && (
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                      <span>{actor.gender === 1 ? 'Female' : actor.gender === 2 ? 'Male' : 'Other'}</span>
                    </div>
                  )}
                </motion.div>

                {/* Biography Preview */}
                {actor.biography && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl line-clamp-2 sm:line-clamp-3"
                  >
                    {actor.biography.length > 300 
                      ? `${actor.biography.substring(0, 300)}...` 
                      : actor.biography
                    }
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Actor Info Section */}
        <motion.section 
          className="px-4 md:px-10 py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto">
            <ActorInfo actor={actor} />
          </div>
        </motion.section>

        {/* Actor Movies Section */}
        <ActorMovies movies={[...(actor.movie_credits?.cast || []), ...(actor.tv_credits?.cast || [])]} />

        {/* Actor Recommended Section */}
        <ActorRecommended recommended={actor.combined_credits?.cast || []} setLoading={setLoading} />
      </div>
    </div>
  );
};

export default ActorDetails;
