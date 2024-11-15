import axios from "axios";
import { Vehicle } from "../interfaces/interfaces";
import { API_BASE_URL } from "./baseURL";

export const fetchVehicles = async (page: number): Promise<Vehicle[]> => {
  const { data } = await axios.get<{ results: Vehicle[] }>(
    `${API_BASE_URL}vehicles/?page=${page}&limit=10`
  );
  return data.results;
};
export const fetchVehicleDetails = async (id: string) => {
  const { data } = await axios.get<Vehicle>(`${API_BASE_URL}vehicles/${id}`);
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
    vehicle_class: data.vehicle_class,
    pilots: data.pilots,
    films: data.films,
    url: data.url,
  };
};
