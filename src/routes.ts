const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  characters: "/characters",
  characterDetails: (id: number | string) => `/characters/${id}`,
  planets: "/planets",
  planetDetails: (id: number | string) => `/planets/${id}`,
  movies: "/movies",
  movieDetails: (title: string) => `/movies/${title}`,
  species: "/species",
  speciesDetails: (id: number | string) => `/species/${id}`,
  starships: "/starships",
  starshipDetails: (id: number | string) => `/starships/${id}`,
  vehicles: "/vehicles",
  vehicleDetails: (id: number | string) => `/vehicles/${id}`,
};

export default ROUTES;
