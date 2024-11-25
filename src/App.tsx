import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "./nav/NavBar";
import ROUTES from "./routes";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { UserProvider } from "./context/UserContext";

const Home = lazy(() => import("./pages/Home/Home"));
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
const Starships = lazy(() => import("./pages/Starships/Starships"));
const StarshipDetails = lazy(() => import("./pages/Starships/StarshipDetails"));
const Vehicles = lazy(() => import("./pages/Vehicles/Vehicles"));
const VehicleDetails = lazy(() => import("./pages/Vehicles/VehicleDetails"));

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

function App() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools position="bottom" initialIsOpen={false} />
      )}
      <ErrorBoundary>
        <UserProvider>
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path={ROUTES.home}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Home />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.register}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Register />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.login}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Login />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.characters}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Characters />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.characterDetails(":characterId")}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <CharacterDetails />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.movies}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Movies />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.movieDetails(":id")}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <MovieDetails />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.planets}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Planets />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.planetDetails(":id")}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <PlanetDetails />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.species}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Species />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.speciesDetails(":id")}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <SpeciesDetails />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.starships}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Starships />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.starshipDetails(":id")}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <StarshipDetails />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.vehicles}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <Vehicles />
                    </motion.div>
                  }
                />
                <Route
                  path={ROUTES.vehicleDetails(":id")}
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1 }}
                    >
                      <VehicleDetails />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </UserProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
