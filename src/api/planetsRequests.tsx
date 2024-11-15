import axios from "axios";
import { Planet } from "../interfaces/interfaces";
import { API_BASE_URL } from "./baseURL";

export const fetchPlanets = async (page: number): Promise<Planet[]> => {
  const { data } = await axios.get<{ results: Planet[] }>(
    `${API_BASE_URL}planets/?page=${page}&limit=10`
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
    residents: data.residents,
    films: data.films,
    url: data.url,
  };
};
