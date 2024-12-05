import axios from "axios";
import { Film } from "../interfaces/interfaces";
import { API_BASE_URL, fetchRelatedData } from "./baseURL";

export const fetchMovies = async (): Promise<Film[]> => {
  const { data } = await axios.get<{ results: Film[] }>(`${API_BASE_URL}films`);
  return data.results;
};

export const fetchMovieDetails = async (id: string) => {
  const { data } = await axios.get<Film>(`${API_BASE_URL}films/${id}`);

  const species = await fetchRelatedData(data.species);
  const starships = await fetchRelatedData(data.starships);
  const vehicles = await fetchRelatedData(data.vehicles);
  const characters = await fetchRelatedData(data.characters);
  const planets = await fetchRelatedData(data.planets);

  return {
    title: data.title,
    opening_crawl: data.opening_crawl,
    director: data.director,
    producer: data.producer,
    release_date: data.release_date,
    species,
    starships,
    vehicles,
    characters,
    planets,
  };
};
