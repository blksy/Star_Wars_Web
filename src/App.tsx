import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ROUTES from "./routes";
import "./App.css";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Characters = lazy(() => import("./pages/Characters/Characters"));
const CharacterDetails = lazy(
  () => import("./pages/Characters/CharacterDetails")
);
const Movies = lazy(() => import("./pages/Movies/Movies"));
const MovieDetails = lazy(() => import("./pages/Movies/MovieDetails"));
const Planets = lazy(() => import("./pages/Planets/Planets"));
const PlanetDetails = lazy(() => import("./pages/Planets/PlanetDetails"));
const Species = lazy(() => import("./pages/Species/Species"));
const SpeciesDetails = lazy(() => import("./pages/Species/SpeciesDetails"));
const Starships = lazy(() => import("./pages/Species/SpeciesDetails"));
const StarshipDetails = lazy(() => import("./pages/Species/SpeciesDetails"));
const Vehicles = lazy(() => import("./pages/Species/SpeciesDetails"));
const VehicleDetails = lazy(() => import("./pages/Species/SpeciesDetails"));

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools position="bottom" initialIsOpen={false} />
      )}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={ROUTES.register} element={<Register />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.characters} element={<Characters />} />
            <Route
              path={ROUTES.characterDetails(":id")}
              element={<CharacterDetails />}
            />
            <Route path={ROUTES.login} element={<Movies />} />
            <Route
              path={ROUTES.movieDetails(":id")}
              element={<MovieDetails />}
            />
            <Route path={ROUTES.planets} element={<Planets />} />
            <Route
              path={ROUTES.planetDetails(":id")}
              element={<PlanetDetails />}
            />
            <Route path={ROUTES.species} element={<Species />} />
            <Route
              path={ROUTES.speciesDetails(":id")}
              element={<SpeciesDetails />}
            />
            <Route path={ROUTES.starships} element={<Starships />} />
            <Route
              path={ROUTES.starshipDetails(":id")}
              element={<StarshipDetails />}
            />
            <Route path={ROUTES.vehicles} element={<Vehicles />} />
            <Route
              path={ROUTES.vehicleDetails(":id")}
              element={<VehicleDetails />}
            />
            <div>Hello</div>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
