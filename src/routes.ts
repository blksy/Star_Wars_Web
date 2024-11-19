const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  characters: "/characters",
  characterDetails: (characterId: string) => `/characters/${characterId}`,
  planets: "/planets",
  planetDetails: (planetId: string) => `/planets/${planetId}`,
  movies: "/movies",
  movieDetails: (movieId: string) => `/movies/${movieId}`,
  species: "/species",
  speciesDetails: (speciesId: string) => `/species/${speciesId}`,
  starships: "/starships",
  starshipDetails: (starshipId: string) => `/starships/${starshipId}`,
  vehicles: "/vehicles",
  vehicleDetails: (vehicleId: string) => `/vehicles/${vehicleId}`,
};

export default ROUTES;
