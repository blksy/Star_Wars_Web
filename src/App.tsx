import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
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

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
