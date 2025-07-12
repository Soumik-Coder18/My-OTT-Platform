import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Twitter,
  Calendar,
  MapPin,
  Users,
  Award,
  Star,
  Sparkles
} from 'lucide-react';

const ActorInfo = ({ actor }) => {
  if (!actor) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid lg:grid-cols-3 gap-8"
    >
      {/* Biography Section */}
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Biography</h2>
          </div>
          
          {actor.biography ? (
            <p className="text-gray-300 leading-relaxed text-lg">
              {actor.biography}
            </p>
          ) : (
            <p className="text-gray-400 italic">No biography available.</p>
          )}
        </motion.div>
      </div>

      {/* Facts Section */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
              <Star className="w-5 h-5 text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Personal Info</h2>
          </div>
          
          <div className="space-y-4">
            {actor.birthday && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Calendar className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-gray-400 text-sm">Birthday</p>
                  <p className="text-white font-semibold">{actor.birthday}</p>
                </div>
              </div>
            )}
            
            {actor.place_of_birth && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <MapPin className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-gray-400 text-sm">Place of Birth</p>
                  <p className="text-white font-semibold">{actor.place_of_birth}</p>
                </div>
              </div>
            )}
            
            {actor.gender && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Award className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-gray-400 text-sm">Gender</p>
                  <p className="text-white font-semibold">
                    {actor.gender === 1 ? 'Female' : actor.gender === 2 ? 'Male' : 'Other'}
                  </p>
                </div>
              </div>
            )}
            
            {actor.known_for_department && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Star className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-gray-400 text-sm">Known For</p>
                  <p className="text-white font-semibold">{actor.known_for_department}</p>
                </div>
              </div>
            )}
            
            {actor.popularity && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Users className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-gray-400 text-sm">Popularity</p>
                  <p className="text-white font-semibold">{actor.popularity.toFixed(1)}</p>
                </div>
              </div>
            )}
            
            {actor.deathday && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <Calendar className="w-5 h-5 text-red-300" />
                <div>
                  <p className="text-gray-400 text-sm">Died</p>
                  <p className="text-white font-semibold">{actor.deathday}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Social Section */}
        {actor.external_ids &&
          (actor.external_ids.twitter_id ||
            actor.external_ids.instagram_id ||
            actor.external_ids.facebook_id) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Social Media</h3>
              <div className="flex gap-4">
                {actor.external_ids.twitter_id && (
                  <motion.a
                    href={`https://twitter.com/${actor.external_ids.twitter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-xl hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 text-blue-300 hover:text-blue-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-6 h-6" />
                  </motion.a>
                )}
                {actor.external_ids.instagram_id && (
                  <motion.a
                    href={`https://instagram.com/${actor.external_ids.instagram_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-xl hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 text-pink-300 hover:text-pink-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                )}
                {actor.external_ids.facebook_id && (
                  <motion.a
                    href={`https://facebook.com/${actor.external_ids.facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-xl hover:from-blue-600/30 hover:to-blue-700/30 transition-all duration-300 text-blue-300 hover:text-blue-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
      </div>
    </motion.div>
  );
};

export default ActorInfo;
