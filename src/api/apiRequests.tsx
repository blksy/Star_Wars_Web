import axios from "axios";

const API_BASE_URL = "https://swapi.dev/api/";

export const fetchMovies = async () => {
  const { data } = await axios.get(`${API_BASE_URL}films`);
  return data.results;
};
export const fetchMovieDetails;
export const fetchCharacters = async () => {
  const { data } = await axios.get(`${API_BASE_URL}people`);
  return data.results;
};
export const fetchCharacterDetails;
export const fetchPlanets = async () => {
  const { data } = await axios.get(`${API_BASE_URL}planets`);
  return data.results;
};
export const fetchPlanetDetails;
export const fetchSpecies = async () => {
  const { data } = await axios.get(`${API_BASE_URL}species`);
  return data.results;
};
export const fetchSpeciesDetails;
export const fetchVehicles = async () => {
  const { data } = await axios.get(`${API_BASE_URL}vehicles`);
  return data.results;
};
export const fetchVehicleDetails;
export const fetchStarships = async () => {
  const { data } = await axios.get(`${API_BASE_URL}starships`);
  return data.results;
};
export const fetchStarshipDetails;
