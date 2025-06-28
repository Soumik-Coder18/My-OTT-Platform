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
          <UserRound className="w-6 h-6 text-[#555879]" />
          <h2 className="text-2xl font-semibold text-[#555879]">Popular Actors</h2>
        </div>
        <button
          onClick={() => navigate('/actors')}
          className="px-4 py-2 bg-[#DED3C4] text-[#222] rounded-full text-sm font-medium hover:scale-105 transition-transform"
        >
          Show More
        </button>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 max-w-6xl mx-auto"
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
              className="cursor-pointer bg-[#ded3c4] rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
              onClick={() => navigate(`/person/${actor.id}`)}
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
              <div className="p-3 text-center text-[#222] font-semibold">
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
