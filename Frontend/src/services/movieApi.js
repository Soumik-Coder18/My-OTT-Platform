import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});

// 🔥 MOVIES
export const getPopularMovies = (filters = {}, page = 1) => {
  const hasFilters = filters.genre || filters.year || filters.rating || filters.sort_by;
  const endpoint = hasFilters ? '/discover/movie' : '/movie/popular';

  const params = {
    language: 'en-US',
    page,
    ...(filters.genre && { with_genres: filters.genre }),
    ...(filters.year && { primary_release_year: filters.year }),
    ...(filters.rating && { 'vote_average.gte': filters.rating }),
    ...(filters.sort_by && { sort_by: filters.sort_by }),
  };

  return API.get(endpoint, { params });
};

export const getMovieById = (id) =>
  API.get(`/movie/${id}`, {
    params: {
      language: 'en-US',
      append_to_response: 'credits',
    },
  });

export const searchMovies = (query) =>
  API.get(`/search/movie`, {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
  });

export const getMovieCast = (id) =>
  API.get(`/movie/${id}/credits?language=en-US`);

// 📺 TV SERIES
export const getPopularSeries = (filters = {}, page = 1) => {
  const hasFilters = filters.genre || filters.year || filters.rating || filters.sort_by;
  const endpoint = hasFilters ? '/discover/tv' : '/tv/popular';

  const params = {
    language: 'en-US',
    page,
    ...(filters.genre && { with_genres: filters.genre }),
    ...(filters.year && { first_air_date_year: filters.year }),
    ...(filters.rating && { 'vote_average.gte': filters.rating }),
    ...(filters.sort_by && { sort_by: filters.sort_by }),
  };

  return API.get(endpoint, { params });
};

export const getSeriesById = (id) =>
  API.get(`/tv/${id}`, {
    params: {
      language: 'en-US',
      append_to_response: 'credits',
    },
  });

export const searchSeries = (query) =>
  API.get(`/search/tv`, {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
  });

export const getSeriesCast = (id) =>
  API.get(`/tv/${id}/credits?language=en-US`);
