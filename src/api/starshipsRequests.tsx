import axios from "axios";
import { Starship } from "../interfaces/interfaces";
import { API_BASE_URL } from "./baseURL";

export const fetchStarships = async (page: number): Promise<Starship[]> => {
  const { data } = await axios.get<{ results: Starship[] }>(
    `${API_BASE_URL}starships/?page=${page}&limit=10`
  );
  return data.results;
};
export const fetchStarshipDetails = async (id: string) => {
  const { data } = await axios.get<Starship>(`${API_BASE_URL}starship/${id}`);
  return {
    name: data.name,
    model: data.model,
    manufacturer: data.manufacturer,
    cost_in_credits: data.cost_in_credits,
    length: data.length,
    max_atmosphering_speed: data.max_atmosphering_speed,
    crew: data.crew,
    passengers: data.passengers,
    cargo_capacity: data.cargo_capacity,
    consumables: data.consumables,
    hyperdrive_rating: data.hyperdrive_rating,
    MGLT: data.MGLT,
    starship_class: data.starship_class,
    pilots: data.pilots,
    films: data.films,
    url: data.url,
  };
};
