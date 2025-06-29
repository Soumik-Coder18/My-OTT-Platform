// ==========================================
// 🌐 TMDB API Configuration & Endpoints
// ==========================================

import axios from 'axios';

// 🛠️ Create a reusable axios instance with base URL and headers
const API = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});


// ==========================================
// 🎬 MOVIES ENDPOINTS
// ==========================================

/**
 * 🔥 Get popular movies or discover with filters
 * @param {Object} filters - genre, year, rating, sort_by
 * @param {number} page - page number for pagination
 */
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

/**
 * 🎥 Get movie details by ID
 * Includes: credits (cast & crew)
 */
export const getMovieById = (id) =>
  API.get(`/movie/${id}`, {
    params: {
      language: 'en-US',
      append_to_response: 'credits',
    },
  });

/**
 * 👥 Get movie cast by movie ID
 */
export const getMovieCast = (id) =>
  API.get(`/movie/${id}/credits`, {
    params: {
      language: 'en-US',
    },
  });

/**
 * 🔎 Search movies by query
 */
export const searchMovies = (query) =>
  API.get(`/search/movie`, {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
  });


// ==========================================
// 📺 TV SERIES ENDPOINTS
// ==========================================

/**
 * 🔥 Get popular TV series or discover with filters
 * @param {Object} filters - genre, year, rating, sort_by
 * @param {number} page - page number for pagination
 */
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

/**
 * 📺 Get TV series details by ID
 * Includes: credits
 */
export const getSeriesById = (id) =>
  API.get(`/tv/${id}`, {
    params: {
      language: 'en-US',
      append_to_response: 'credits',
    },
  });

/**
 * 👥 Get series cast by series ID
 */
export const getSeriesCast = (id) =>
  API.get(`/tv/${id}/credits`, {
    params: {
      language: 'en-US',
    },
  });

/**
 * 🔎 Search TV series by query
 */
export const searchSeries = (query) =>
  API.get(`/search/tv`, {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
  });


// ==========================================
// 👤 ACTORS (PEOPLE) ENDPOINTS
// ==========================================

/**
 * 🌟 Get popular actors (people)
 */
export const getPopularPeople = (page = 1) =>
  API.get(`/person/popular`, {
    params: {
      language: 'en-US',
      page,
    },
  });

/**
 * 🧑‍🎤 Get actor details by ID
 * Includes: movie + TV credits, images, external IDs
 */
export const getPersonById = (id) =>
  API.get(`/person/${id}`, {
    params: {
      language: 'en-US',
      append_to_response: 'movie_credits,tv_credits,images,external_ids',
    },
  });

/**
 * 🔍 Search actors by name
 */
export const searchPeople = (query) =>
  API.get(`/search/person`, {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
  });

/**
 * ✨ Simulated actor recommendations (excluding current actor)
 */
export const getActorRecommendations = async (currentActorId, page = 1) => {
  const res = await getPopularPeople(page);
  return {
    ...res,
    data: {
      ...res.data,
      results: res.data.results.filter((person) => person.id !== Number(currentActorId)),
    },
  };
};


// ==========================================
// 🏷️ GENRE ENDPOINTS
// ==========================================

/**
 * 🎭 Get genres list by type (movie or tv)
 */
export const getGenres = (type = 'movie') =>
  API.get(`/genre/${type}/list`, {
    params: { language: 'en-US' },
  });

  export const getMoviesByGenre = (genreId, page = 1) =>
  API.get(`/discover/movie`, {
    params: {
      with_genres: genreId,
      page,
      language: 'en-US',
      sort_by: 'popularity.desc',
    },
  });
