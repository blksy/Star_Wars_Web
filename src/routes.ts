const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  characters: "/characters",
  characterDetails: (id: string) => `/characters/${id}`,
  planets: "/planets",
  planetDetails: (id: string) => `/planets/${id}`,
  movies: "/movies",
  movieDetails: (id: string) => `/movies/${id}`,
  species: "/species",
  speciesDetails: (id: string) => `/species/${id}`,
  starships: "/starships",
  starshipDetails: (id: string) => `/starships/${id}`,
  vehicles: "/vehicles",
  vehicleDetails: (id: string) => `/vehicles/${id}`,
};

export default ROUTES;
