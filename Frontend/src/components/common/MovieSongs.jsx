import React, { useRef, useState, useEffect } from 'react';
import { Music2, Play, Pause, Volume2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomAudioPlayer = ({ src, isPlaying, onPlay, onPause }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrent(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const percent = e.target.value;
    const newTime = (percent / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrent(newTime);
    setProgress(percent);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  // Format time as mm:ss
  const formatTime = (t) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#2a0845] to-[#6441a5] px-4 py-3 flex items-center gap-3 shadow-xl min-w-0">
      {/* Play/Pause Button */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="p-3 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 flex-shrink-0"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>
      {/* Progress Bar */}
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={handleSeek}
        className="flex-1 h-2 rounded-full bg-slate-800 accent-pink-500 appearance-none transition-all duration-200 min-w-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-tr [&::-webkit-slider-thumb]:from-pink-400 [&::-webkit-slider-thumb]:to-purple-400 [&::-webkit-slider-thumb]:shadow-lg"
      />
      {/* Timer */}
      <span className="ml-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-pink-100 font-mono shadow border border-purple-700/30 whitespace-nowrap truncate min-w-[50px] max-w-[70px] text-center flex-shrink-0">
        {formatTime(current)}
      </span>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onPause}
        className="hidden"
      />
    </div>
  );
};

const MovieSongs = ({ songs, loading }) => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const maxVisible = 4;

  if (!loading && (!songs || songs.length === 0)) return null;

  const handlePlay = (idx) => {
    setPlayingIndex(idx);
  };
  const handlePause = () => {
    setPlayingIndex(null);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] } },
    whileHover: { y: -8, scale: 1.04, boxShadow: '0 8px 32px 0 rgba(186,104,200,0.25)' },
  };

  const visibleSongs = showAll ? songs : songs.slice(0, maxVisible);

  return (
    <motion.section 
      className="px-2 sm:px-4 md:px-6 lg:px-10 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Row with Show More Button */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
              <Music2 className="w-5 h-5" />
              <span className="font-semibold">Soundtrack</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tracks</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto sm:mx-0">
              Enjoy the top songs from this movie's soundtrack
            </p>
          </div>
          {/* Show More / Show Less Button (top right) */}
          {songs.length > maxVisible && (
            <div className="flex justify-end sm:items-start">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-all duration-200"
              >
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="text-white text-center py-12 text-lg animate-pulse">Loading songs...</div>
        ) : songs && songs.length > 0 ? (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {visibleSongs.map((song, idx) => (
                <motion.div
                  key={song.trackId}
                  className="relative bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-pink-900/60 border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center shadow-xl hover:shadow-pink-500/30 transition-shadow duration-300 backdrop-blur-md group overflow-hidden"
                  variants={cardVariants}
                  whileHover="whileHover"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-yellow-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
                  {/* Album Art */}
                  <div className="relative z-10 mb-4 hidden sm:block">
                    <img
                      src={song.artworkUrl100}
                      alt={song.trackName}
                      className="w-24 h-24 rounded-xl object-cover border-2 border-purple-400/40 shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Track Info */}
                  <div className="relative z-10 w-full text-center mb-3">
                    <div className="font-bold text-lg text-white truncate" title={song.trackName}>
                      {song.trackName}
                    </div>
                    <div className="text-sm text-pink-200 truncate" title={song.artistName}>
                      {song.artistName}
                    </div>
                  </div>
                  {/* Audio Preview */}
                  {song.previewUrl && (
                    <CustomAudioPlayer
                      src={song.previewUrl}
                      isPlaying={playingIndex === idx}
                      onPlay={() => handlePlay(idx)}
                      onPause={handlePause}
                    />
                  )}
                  {/* iTunes Button */}
                  <a
                    href={song.trackViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-200 text-center w-full"
                  >
                    <ExternalLink className="w-5 h-5" /> Listen on iTunes
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <div className="text-gray-300 text-center py-12 text-lg flex flex-col items-center gap-2">
            <Music2 className="w-8 h-8 text-purple-400 mb-2 animate-pulse" />
            No songs found for this movie.
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default MovieSongs; 