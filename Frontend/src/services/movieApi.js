// ==========================================
// 🌐 TMDB API Configuration & Endpoints
// ==========================================

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});

// ==========================================
// 🎬 MOVIES ENDPOINTS
// ==========================================

export const getIndianMovies = (language = 'hi', page = 1) =>
  API.get(`/discover/movie`, {
    params: {
      with_original_language: language, // hi (Hindi), ta (Tamil), te (Telugu)
      sort_by: 'popularity.desc',
      page,
    },
  });

export const getPopularMovies = (filters = {}, page = 1, region = 'US') => {
  const hasFilters = filters.genre || filters.year || filters.rating || filters.sort_by;
  const endpoint = hasFilters ? '/discover/movie' : '/movie/popular';

  const params = {
    language: 'en-US',
    region,
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

export const getMovieCast = (id) =>
  API.get(`/movie/${id}/credits`, {
    params: { language: 'en-US' },
  });

export const searchMovies = (query, region = 'US') =>
  API.get(`/search/movie`, {
    params: {
      query,
      language: 'en-US',
      region,
      page: 1,
    },
  });

// ==========================================
// 📺 TV SERIES ENDPOINTS
// ==========================================

export const getPopularSeries = (filters = {}, page = 1, region = 'US') => {
  const hasFilters = filters.genre || filters.year || filters.rating || filters.sort_by;
  const endpoint = hasFilters ? '/discover/tv' : '/tv/popular';

  const params = {
    language: 'en-US',
    region,
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

export const getSeriesCast = (id) =>
  API.get(`/tv/${id}/credits`, {
    params: { language: 'en-US' },
  });

export const searchSeries = (query, region = 'US') =>
  API.get(`/search/tv`, {
    params: {
      query,
      language: 'en-US',
      region,
      page: 1,
    },
  });

export const getIndianTvShows = (language = 'hi', page = 1) =>
  API.get(`/discover/tv`, {
    params: {
      with_original_language: language,
      sort_by: 'popularity.desc',
      page,
    },
  });

// ==========================================
// 👤 PEOPLE ENDPOINTS
// ==========================================

export const getPopularPeople = (page = 1) =>
  API.get(`/person/popular`, {
    params: {
      language: 'en-US',
      page,
    },
  });

export const getPersonById = (id) =>
  API.get(`/person/${id}`, {
    params: {
      language: 'en-US',
      append_to_response: 'movie_credits,tv_credits,images,external_ids',
    },
  });

export const searchPeople = (query) =>
  API.get(`/search/person`, {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
  });

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

// ✅ Enhanced: Indian Actors with gender & department for separation
export const getIndianActorsFromMovies = async (language = 'hi', page = 1) => {
  try {
    const movieRes = await API.get(`/discover/movie`, {
      params: {
        with_original_language: language,
        sort_by: 'popularity.desc',
        page,
      },
    });

    const movies = movieRes.data.results;
    const actorMap = new Map();

    for (const movie of movies) {
      const creditsRes = await API.get(`/movie/${movie.id}/credits`);
      const cast = creditsRes.data.cast;

      cast.forEach((person) => {
        if (!actorMap.has(person.id)) {
          actorMap.set(person.id, {
            id: person.id,
            name: person.name,
            profile_path: person.profile_path,
            popularity: person.popularity,
            gender: person.gender,
            known_for_department: person.known_for_department,
          });
        }
      });
    }

    // Sort by popularity and limit to top 20
    const sortedActors = [...actorMap.values()]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 20);

    return sortedActors;
  } catch (error) {
    console.error('Error fetching Indian actors from movies:', error);
    return [];
  }
};

// ==========================================
// 🏷️ GENRES & DISCOVERY
// ==========================================

export const getGenres = (type = 'movie') =>
  API.get(`/genre/${type}/list`, {
    params: { language: 'en-US' },
  });

export const getMoviesByGenre = (genreId, page = 1, region = 'US') =>
  API.get(`/discover/movie`, {
    params: {
      with_genres: genreId,
      page,
      region,
      language: 'en-US',
      sort_by: 'popularity.desc',
    },
  });

export const getUpcomingMovies = (region = 'US') =>
  API.get('/movie/upcoming', {
    params: {
      language: 'en-US',
      region,
      page: 1,
    },
  });