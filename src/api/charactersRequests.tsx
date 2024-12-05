import axios from "axios";
import { Character } from "../interfaces/interfaces";
import { API_BASE_URL, fetchRelatedData } from "./baseURL";

export const fetchCharacters = async (page: number): Promise<Character[]> => {
  const { data } = await axios.get<{ results: Character[] }>(
    `${API_BASE_URL}people/?page=${page}&limit=10`
  );
  return data.results;
};

export const fetchCharacterDetails = async (id: string) => {
  const { data } = await axios.get<Character>(`${API_BASE_URL}people/${id}`);

  const homeworld = data.homeworld
    ? await axios.get(data.homeworld).then((res) => res.data.name)
    : "Unknown";
  const films = await fetchRelatedData(data.films);
  const species = await fetchRelatedData(data.species);
  const vehicles = await fetchRelatedData(data.vehicles);
  const starships = await fetchRelatedData(data.starships);

  return {
    name: data.name,
    height: data.height,
    mass: data.mass,
    hair_color: data.hair_color,
    skin_color: data.skin_color,
    eye_color: data.eye_color,
    birth_year: data.birth_year,
    gender: data.gender,
    homeworld,
    films,
    species,
    vehicles,
    starships,
    url: data.url,
  };
};
