import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { motion, useAnimationFrame } from 'framer-motion';

const YouMightAlsoLike = ({ recommended, setLoading, type = 'movie' }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const x = useRef(0);

  const speed = 0.5; // adjust this to control scroll speed

  useAnimationFrame((_, delta) => {
    if (!trackRef.current || !containerRef.current) return;

    x.current -= speed * (delta / 16); // smooth per frame

    const scrollWidth = trackRef.current.scrollWidth / 2;

    // Reset loop
    if (Math.abs(x.current) >= scrollWidth) {
      x.current = 0;
    }

    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  if (!recommended?.length) return null;

  // Duplicate items for seamless scroll
  const duplicated = [...recommended, ...recommended];

  return (
    <div className="px-6 md:px-10 pb-12 mt-10">
      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <Clapperboard className="w-6 h-6 text-[#555879]" />
        <h2 className="text-2xl font-bold text-[#555879]">You Might Also Like</h2>
      </div>

      {/* Scroll Row */}
      <div
        ref={containerRef}
        className="overflow-hidden w-full relative px-[5vw]"
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max"
        >
          {duplicated.map((rec, index) => (
            <div
              key={`${rec.id}-${index}`}
              onClick={() => {
                setLoading(true);
                navigate(`/${type}/${rec.id}`);
              }}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <img
                src={
                  rec.poster_path
                    ? `https://image.tmdb.org/t/p/w200${rec.poster_path}`
                    : 'https://via.placeholder.com/90x135?text=No+Image'
                }
                alt={rec.title || rec.name}
                className="w-[90px] h-[135px] object-cover rounded-md shadow-md"
              />
              <p className="text-xs text-center mt-2 w-[90px] truncate">
                {rec.title || rec.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouMightAlsoLike;
