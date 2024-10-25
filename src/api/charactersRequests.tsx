import axios from "axios";
import { Character } from "../interfaces/interfaces";

const API_BASE_URL = "https://swapi.dev/api/";

export const fetchCharacters = async (): Promise<Character[]> => {
  const { data } = await axios.get<{ results: Character[] }>(
    `${API_BASE_URL}people`
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
    films: data.films.map((film: any) => film.films.name),
    species: data.species.map((spieces: any) => spieces.species.name),
    vehicles: data.vehicles.map((vehicle: any) => vehicle.vehicle.name),
    starships: data.starships.map((starship: any) => starship.starship.name),
    url: data.url,
  };
};
