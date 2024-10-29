import axios from "axios";
import { Film } from "../interfaces/interfaces";

const API_BASE_URL = "https://swapi.dev/api/";

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
    species: data.species.map((species: string) => species.species.name),
    starships: data.starships.map((starship: string) => starship.starship.name),
    vehicles: data.vehicles.map((vehicle: string) => vehicle.vehicle.name),
    characters: data.characters.map((character) => character.characters.name),
    planets: data.planets.map((planet: string) => planet.planet.name),
  };
};
