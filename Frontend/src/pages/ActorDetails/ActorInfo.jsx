import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { getPersonById } from '../../services/movieApi';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

const ActorInfo = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActorDetails();
  }, [id]);

  const fetchActorDetails = async () => {
    try {
      const res = await getPersonById(id);
      setActor(res.data);
    } catch (err) {
      console.error('Error fetching actor data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!actor) return <p className="text-center text-red-500">Actor not found.</p>;

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col md:flex-row p-6 md:p-10 gap-10 bg-[#F4EBD3] items-start"
    >

      {/* Actor Image */}
      <div className="md:w-1/3 flex justify-center">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : '/no-avatar.png'
          }
          alt={actor.name}
          className="rounded-xl max-w-[300px] w-full h-full object-contain shadow-lg"
        />
      </div>

      {/* Info Panel */}
      <div className="md:w-2/3">
        <h1 className="text-4xl font-bold mb-2 text-[#555879]">{actor.name}</h1>

        {/* Biography */}
        {actor.biography && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-1 text-[#98A1BC]">Biography</h3>
            <p className="text-base leading-relaxed text-[#555879] text-justify">
              {actor.biography}
            </p>
          </div>
        )}

        {/* Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#98A1BC] mb-6">
          {actor.birthday && (
            <p>
              <strong className="text-[#555879]">Born:</strong> {actor.birthday}
            </p>
          )}
          {actor.place_of_birth && (
            <p>
              <strong className="text-[#555879]">Place of Birth:</strong> {actor.place_of_birth}
            </p>
          )}
          {actor.gender && (
            <p>
              <strong className="text-[#555879]">Gender:</strong>{' '}
              {actor.gender === 1 ? 'Female' : actor.gender === 2 ? 'Male' : 'Other'}
            </p>
          )}
          {actor.known_for_department && (
            <p>
              <strong className="text-[#555879]">Known For:</strong> {actor.known_for_department}
            </p>
          )}
          {actor.popularity && (
            <p>
              <strong className="text-[#555879]">Popularity:</strong> {actor.popularity.toFixed(1)}
            </p>
          )}
          {actor.deathday && (
            <p>
              <strong className="text-[#555879]">Died:</strong> {actor.deathday}
            </p>
          )}
        </div>

        {/* Social Section */}
        {actor.external_ids &&
          (actor.external_ids.twitter_id ||
            actor.external_ids.instagram_id ||
            actor.external_ids.facebook_id) && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-[#98A1BC]">Social</h3>
              <div className="flex gap-4 items-center">
                {actor.external_ids.twitter_id && (
                  <a
                    href={`https://twitter.com/${actor.external_ids.twitter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555879] hover:text-[#3e4059] transition"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
                {actor.external_ids.instagram_id && (
                  <a
                    href={`https://instagram.com/${actor.external_ids.instagram_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555879] hover:text-[#3e4059] transition"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {actor.external_ids.facebook_id && (
                  <a
                    href={`https://facebook.com/${actor.external_ids.facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555879] hover:text-[#3e4059] transition"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          )}
      </div>
    </motion.div>
  );
};

export default ActorInfo;
