import axios from "axios";
import { Character } from "../interfaces/interfaces";
import { API_BASE_URL } from "./baseURL";

export const fetchCharacters = async (page: number): Promise<Character[]> => {
  const { data } = await axios.get<{ results: Character[] }>(
    `${API_BASE_URL}people/?page=${page}&limit=10`
  );
  return data.results;
};

export const fetchCharacterDetails = async (id: string) => {
  const { data } = await axios.get<Character>(`${API_BASE_URL}people/${id}`);
  return {
    name: data.name,
    height: data.height,
    mass: data.mass,
    hair_color: data.hair_color,
    skin_color: data.skin_color,
    eye_color: data.eye_color,
    birth_year: data.birth_year,
    gender: data.gender,
    homeworld: data.homeworld,
    films: data.films,
    species: data.species,
    vehicles: data.vehicles,
    starships: data.starships,
    url: data.url,
  };
};
