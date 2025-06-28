import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});

// 🔥 MOVIES
export const getPopularMovies = () =>
  API.get('/movie/popular?language=en-US&page=1');

export const getMovieById = (id) =>
  API.get(`/movie/${id}?language=en-US`);

export const searchMovies = (query) =>
  API.get(`/search/movie?query=${query}&language=en-US&page=1`);

// 📺 TV SERIES
export const getPopularSeries = () =>
  API.get('/tv/popular?language=en-US&page=1');

export const getSeriesById = (id) =>
  API.get(`/tv/${id}?language=en-US`);

export const searchSeries = (query) =>
  API.get(`/search/tv?query=${query}&language=en-US&page=1`);
