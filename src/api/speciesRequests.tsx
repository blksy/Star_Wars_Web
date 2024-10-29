import axios from "axios";
import { Species } from "../interfaces/interfaces";

const API_BASE_URL = "https://swapi.dev/api/";

export const fetchSpecies = async (): Promise<Species[]> => {
  const { data } = await axios.get<{ results: Species[] }>(
    `${API_BASE_URL}species`
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
    people: data.people.map((person: string) => person.person.name),
    films: data.films.map((film: string) => film.film.name),
    url: data.url,
  };
};
