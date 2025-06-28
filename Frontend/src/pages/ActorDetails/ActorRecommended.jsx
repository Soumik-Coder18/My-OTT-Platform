import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRoundSearch } from 'lucide-react';
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
    <section className="px-6 md:px-10 pb-12 mt-10">
      <div className="flex justify-center items-center gap-2 mb-6">
        <UserRoundSearch className="w-6 h-6 text-[#555879]" />
        <h2 className="text-2xl font-bold text-[#555879] text-center">
          Popular Actors You May Like
        </h2>
      </div>

      <div ref={containerRef} className="overflow-hidden w-full relative px-[5vw]">
        <motion.div
          ref={trackRef}
          className="flex gap-4 w-max will-change-transform"
        >
          {duplicated.map((actor, index) => (
            <div
              key={`${actor.id}-${index}`}
              onClick={() => {
                setLoading?.(true);
                navigate(`/actor/${actor.id}`);
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : '/no-avatar.png'
                }
                alt={actor.name}
                loading="lazy"
                className="w-[90px] h-[135px] object-cover rounded-md shadow-md"
              />
              <p className="text-xs text-center mt-2 w-[90px] truncate">
                {actor.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ActorRecommended;
