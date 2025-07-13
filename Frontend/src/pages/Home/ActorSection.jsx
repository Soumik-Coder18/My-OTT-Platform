import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const Actor = () => {
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchPopularPeople = async () => {
      try {
        const response = await axios.get(`${API_BASE}/person/popular`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            language: 'en-US',
            page: 1,
          },
        });
        setActors(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch actors:', error);
      }
    };

    fetchPopularPeople();
  }, []);

  return (
    <section className="mb-10" ref={ref}>
      <div className="flex items-center justify-between mb-4 px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <UserRound className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Popular Actors</h2>
        </div>
        <button
          onClick={() => navigate('/actor')}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs sm:text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          Show More
        </button>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 px-4 max-w-6xl mx-auto"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
          hidden: {},
        }}
      >
        {actors.map((actor) => (
          <motion.div
            key={actor.id}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              hidden: { opacity: 0, y: 40 },
            }}
          >
            <div
              className="cursor-pointer bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 hover:border-purple-500/30 transition-all duration-300"
              onClick={() => navigate(`/actor/${actor.id}`)}
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : '/no-avatar.png'
                }
                alt={actor.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-3 text-center text-white font-semibold">
                {actor.name}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Actor;
