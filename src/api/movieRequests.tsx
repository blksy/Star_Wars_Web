import axios from "axios";
import { Film } from "../interfaces/interfaces";
import { API_BASE_URL } from "./baseURL";

export const fetchMovies = async (): Promise<Film[]> => {
  const { data } = await axios.get<{ results: Film[] }>(`${API_BASE_URL}films`);
  return data.results;
};
export const fetchMovieDetails = async (id: string) => {
  const { data } = await axios.get<Film>(`${API_BASE_URL}films/${id}`);
  return {
    title: data.title,
    opening_crawl: data.opening_crawl,
    director: data.director,
    producer: data.producer,
    release_date: data.release_date,
    species: data.species,
    starships: data.starships,
    vehicles: data.vehicles,
    characters: data.characters,
    planets: data.planets,
  };
};
