import axios from "axios";
import { API_BASE_URL, fetchRelatedData } from "./baseURL";
import { SpeciesI } from "../interfaces/interfaces";

export const fetchSpecies = async (page: number): Promise<SpeciesI[]> => {
  const { data } = await axios.get<{ results: SpeciesI[] }>(
    `${API_BASE_URL}species/?page=${page}&limit=10`
  );
  return data.results;
};
export const fetchSpeciesDetails = async (id: string) => {
  const { data } = await axios.get<SpeciesI>(`${API_BASE_URL}species/${id}`);

  const people = await fetchRelatedData(data.people);
  const films = await fetchRelatedData(data.films);
  const homeworld = data.homeworld
    ? await axios.get(data.homeworld).then((res) => res.data.name)
    : "Unknown";

  return {
    name: data.name,
    classification: data.classification,
    designation: data.designation,
    average_height: data.average_height,
    skin_colors: data.skin_colors,
    hair_colors: data.hair_colors,
    eye_colors: data.eye_colors,
    average_lifespan: data.average_lifespan,
    homeworld,
    language: data.language,
    people,
    films,
    url: data.url,
  };
};
