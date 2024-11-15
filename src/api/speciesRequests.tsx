import axios from "axios";
import { API_BASE_URL } from "./baseURL";
import { Species } from "../interfaces/interfaces";

export const fetchSpecies = async (page: number): Promise<Species[]> => {
  const { data } = await axios.get<{ results: Species[] }>(
    `${API_BASE_URL}species/?page=${page}&limit=10`
  );
  return data.results;
};
export const fetchSpeciesDetails = async (id: string) => {
  const { data } = await axios.get<Species>(`${API_BASE_URL}species/${id}`);
  return {
    name: data.name,
    classification: data.classification,
    designation: data.designation,
    average_height: data.average_height,
    skin_colors: data.skin_colors,
    hair_colors: data.hair_colors,
    eye_colors: data.eye_colors,
    average_lifespan: data.average_lifespan,
    homeworld: data.homeworld,
    language: data.language,
    people: data.people,
    films: data.films,
    url: data.url,
  };
};
