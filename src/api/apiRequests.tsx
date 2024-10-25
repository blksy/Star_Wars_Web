import axios from "axios";
import {
  Character,
  Film,
  Planet,
  Species,
  Starship,
  Vehicle,
} from "../interfaces/interfaces";

const API_BASE_URL = "https://swapi.dev/api/";

export const fetchMovies = async (): Promise<Film[]> => {
  const { data } = await axios.get<{ results: Film[] }>(`${API_BASE_URL}films`);
  return data.results;
};
export const fetchMovieDetails;
export const fetchCharacters = async (): Promise<Character[]> => {
  const { data } = await axios.get<{ results: Character[] }>(
    `${API_BASE_URL}people`
  );
  return data.results;
};
export const fetchCharacterDetails;
export const fetchPlanets = async (): Promise<Planet[]> => {
  const { data } = await axios.get<{ results: Planet[] }>(
    `${API_BASE_URL}planets`
  );
  return data.results;
};
export const fetchPlanetDetails;
export const fetchSpecies = async (): Promise<Species[]> => {
  const { data } = await axios.get<{ results: Species[] }>(
    `${API_BASE_URL}species`
  );
  return data.results;
};
export const fetchSpeciesDetails;
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const { data } = await axios.get<{ results: Vehicle[] }>(
    `${API_BASE_URL}vehicles`
  );
  return data.results;
};
export const fetchVehicleDetails;
export const fetchStarships = async (): Promise<Starship[]> => {
  const { data } = await axios.get<{ results: Starship[] }>(
    `${API_BASE_URL}starships`
  );
  return data.results;
};
export const fetchStarshipDetails;
