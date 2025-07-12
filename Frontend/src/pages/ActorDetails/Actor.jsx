import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { UserRound, SearchX, Star, Award, Users, Sparkles } from 'lucide-react';
import { getPopularPeople, getIndianActorsFromMovies } from '../../services/movieApi';
import { motion, AnimatePresence } from 'framer-motion';

const Actor = () => {
  const [actors, setActors] = useState([]);
  const [indianActors, setIndianActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchActors(page);
    fetchIndianActors(page); // pass current page
  }, [page]);

  const fetchActors = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await getPopularPeople(pageNum);
      setActors(res.data.results);
      setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
    } catch (err) {
      console.error('Error fetching actors:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchIndianActors = async (pageNum = 1) => {
    try {
      const results = await getIndianActorsFromMovies('hi', pageNum); // use pageNum
      setIndianActors(results);
    } catch (err) {
      console.error('Error fetching Indian actors:', err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  if (loading) return <Loader />;

  const maleActors = actors.filter(a => a.gender === 2 && a.known_for_department === 'Acting');
  const femaleActors = actors.filter(a => a.gender === 1 && a.known_for_department === 'Acting');

  const indianMaleActors = indianActors.filter(a => a.gender === 2 && a.known_for_department === 'Acting');
  const indianFemaleActors = indianActors.filter(a => a.gender === 1 && a.known_for_department === 'Acting');

  // Get featured actors for hero section - always show 6 actors
  const featuredActors = actors.slice(0, 6).filter(actor => actor.profile_path);

  const renderSection = (title, list, icon) =>
    list.length > 0 && (
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {list.map((actor, index) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                to={`/actor/${actor.id}`}
                className="group block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : '/no-avatar.png'
                }
                alt={actor.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Popularity Badge */}
                  {actor.popularity > 50 && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Hot
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-center truncate group-hover:text-purple-300 transition-colors">
                {actor.name}
                  </h3>
                  {actor.known_for && actor.known_for.length > 0 && (
                    <p className="text-gray-300 text-xs text-center mt-1 truncate">
                      {actor.known_for[0]?.title || actor.known_for[0]?.name}
                    </p>
                  )}
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );

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
        <motion.div
          className="absolute top-1/3 right-1/4 w-14 h-14 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <div className="relative z-10">
      {/* Header Section */}
      <motion.div 
        className="px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <UserRound className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Popular Actors
              </h1>
              <p className="text-gray-300 text-lg">
                Discover talented performers from around the world
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section - Featured Actors Showcase */}
      {featuredActors.length > 0 && (
        <motion.section 
          className="relative w-full my-12 px-4 md:px-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Hero Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">Featured Performers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Stars</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Discover the most popular and talented actors from around the world, 
                bringing stories to life on screen
              </p>
            </motion.div>

            {/* Featured Actors Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredActors.map((actor, index) => (
                  <motion.div
                    key={actor.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.6 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative"
                  >
                    <Link to={`/actor/${actor.id}`}>
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 backdrop-blur-sm">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, #a855f7 1px, transparent 0)`,
                            backgroundSize: '20px 20px'
                          }} />
                        </div>

                        {/* Actor Image */}
                        <div className="relative p-6">
                          <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <img
                              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                              alt={actor.name}
                              className="relative w-full h-full object-cover rounded-full border-4 border-white/20 group-hover:border-purple-300/40 transition-all duration-300"
                            />
                            {/* Popularity Badge */}
                            {actor.popularity > 50 && (
                              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                <Star className="w-3 h-3 fill-current" />
                                Hot
                              </div>
                            )}
                          </div>

                          {/* Actor Info */}
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                              {actor.name}
                            </h3>
                            {actor.known_for && actor.known_for.length > 0 && (
                              <p className="text-gray-300 text-sm mb-3">
                                Known for: {actor.known_for[0]?.title || actor.known_for[0]?.name}
                              </p>
                            )}
                            
                            {/* Stats */}
                            <div className="flex justify-center items-center gap-4 text-sm text-gray-300">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span>{actor.popularity?.toFixed(0) || 'N/A'}</span>
                              </div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full" />
                              <div className="flex items-center gap-1">
                                <span>{actor.known_for?.length || 0} works</span>
                              </div>
                            </div>
                          </div>

                                                     {/* Hover Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-4">
                             <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                               View →
                             </div>
                           </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
      </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-10 -left-10 w-20 h-20 opacity-20"
              >
                <div className="w-full h-full border-2 border-purple-400 rounded-full flex items-center justify-center">
                  <Star size={24} className="text-purple-400" />
                </div>
              </motion.div>
              
              <motion.div
                animate={{
                  x: [0, -15, 0],
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-8 -right-8 w-16 h-16 opacity-20"
              >
                <div className="w-full h-full border-2 border-pink-400 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-pink-400" />
                </div>
              </motion.div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 px-6 py-3 rounded-full backdrop-blur-sm">
                <Users className="w-5 h-5" />
                <span className="font-medium">Explore {actors.length}+ talented performers</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Content Section */}
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
      {(actors.length > 0 || indianActors.length > 0) ? (
              <motion.div
                key={`page-${page}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                                {renderSection('Male Actors', maleActors, <Users className="w-5 h-5 text-white" />)}
                {renderSection('Female Actors', femaleActors, <Award className="w-5 h-5 text-white" />)}
                {renderSection('Indian Male Actors', indianMaleActors, <Star className="w-5 h-5 text-white" />)}
                {renderSection('Indian Female Actors', indianFemaleActors, <Sparkles className="w-5 h-5 text-white" />)}

          {/* Pagination */}
                <motion.div 
                  className="flex justify-center items-center gap-3 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      page === 1 
                        ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                    whileHover={page !== 1 ? { scale: 1.05 } : {}}
                    whileTap={page !== 1 ? { scale: 0.95 } : {}}
                  >
                    ← Previous
                  </motion.button>

                  <div className="flex gap-2">
            {pageNumbers.map((num) => (
                      <motion.button
                key={num}
                onClick={() => handlePageChange(num)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          num === page 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-105'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
              >
                {num}
                      </motion.button>
            ))}
                  </div>

                  <motion.button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      page === totalPages 
                        ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                    whileHover={page !== totalPages ? { scale: 1.05 } : {}}
                    whileTap={page !== totalPages ? { scale: 0.95 } : {}}
                  >
                    Next →
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center mt-24 text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6">
                  <SearchX className="w-12 h-12 text-purple-400" />
          </div>
                <h2 className="text-2xl font-bold mb-2">No Actors Found</h2>
                <p className="text-gray-300 text-lg">Try refreshing the page or check back later</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Actor;