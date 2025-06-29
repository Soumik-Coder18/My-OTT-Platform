// components/GenreSection.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGenres } from '../../services/movieApi';
import { motion } from 'framer-motion';
import { Cctv } from 'lucide-react';

const GenreSection = ({ type = 'movie' }) => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getGenres(type);
        setGenres(res.data.genres || []);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    fetchGenres();
  }, [type]);

  if (!genres.length) return null;

  return (
    <section className="px-6 md:px-10 py-14 bg-[#f4ecd9]">
      <motion.div
        className="flex justify-center items-center gap-3 mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Cctv className="w-6 h-6 text-[#555879]" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#555879] text-center">
          Browse by Genre
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
        viewport={{ once: true }}
      >
        {genres.map((genre) => (
          <motion.button
            key={genre.id}
            onClick={() => navigate(`/genre/${genre.id}`)}
            whileHover={{ scale: 1.15, rotate: 1 }}
            whileTap={{ scale: 0.92 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-[#e4d6bb] hover:bg-[#d9c8aa] text-[#3a3a3a] px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300"
          >
            {genre.name}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default GenreSection;