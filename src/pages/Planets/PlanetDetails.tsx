import { Link, useParams } from "react-router-dom";
import style from "./Planet.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPlanetDetails } from "../../api/planetsRequests";
import ROUTES from "../../routes";
import Button from "../../components/Button/Button";

export default function PlanetDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: planetDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["planet", id],
    queryFn: () => fetchPlanetDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p className={style.load}>Loading...</p>;

  if (error) return <p>Planet details not found.</p>;

  const {
    name = "N/A",
    rotation_period = "N/A",
    orbital_period = "N/A",
    diameter = "N/A",
    climate = "N/A",
    gravity = "N/A",
    terrain = "N/A",
    surface_water = "N/A",
    population = "N/A",
    residents = [],
    films = [],
  } = planetDetails || {};

  return planetDetails ? (
    <div className={style.detailsContainer}>
      <h1 className={style.name}>{name}</h1>
      <ul className={style.detailsList}>
        <li>Rotation Period: {rotation_period}</li>
        <li>Orbital Period: {orbital_period}</li>
        <li>Diameter: {diameter}</li>
        <li>Climate: {climate}</li>
        <li>Gravity: {gravity}</li>
        <li>Terrain: {terrain}</li>
        <li>Surface Water: {surface_water}</li>
        <li>Population: {population}</li>
        <li>Residents: {residents.join(",") || "N/A"}</li>
        <li>Films:{films.join(",") || "N/A"}</li>
      </ul>
      <Link to={ROUTES.planets}>
        <Button className={style.btn}>Go Back to the Planets List</Button>
      </Link>
    </div>
  ) : (
    <div>No details available for this planet</div>
  );
}
