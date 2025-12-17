import axios from "axios";
import type { Movie } from "../types/movie";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await movieAxios.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return data.results;
};
