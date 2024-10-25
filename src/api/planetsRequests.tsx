import axios from "axios";
import { Planet } from "../interfaces/interfaces";

const API_BASE_URL = "https://swapi.dev/api/";

export const fetchPlanets = async (): Promise<Planet[]> => {
  const { data } = await axios.get<{ results: Planet[] }>(
    `${API_BASE_URL}planets`
  );
  return data.results;
};
export const fetchPlanetDetails = async (id: string) => {
  const { data } = await axios.get<Planet>(`${API_BASE_URL}planets/${id}`);
  return {
    name: data.name,
    rotation_period: data.rotation_period,
    orbital_period: data.orbital_period,
    diameter: data.diameter,
    climate: data.climate,
    gravity: data.gravity,
    terrain: data.terrain,
    surface_water: data.surface_water,
    population: data.population,
    residents: data.residents.map((resident: any) => resident.resident.name),
    films: data.films.map((film: any) => film.film.name),
    url: data.url,
  };
};
