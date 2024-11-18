import { useParams } from "react-router-dom";
import style from "./Planet.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPlanetDetails } from "../../api/planetsRequests";

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
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
  } = planetDetails || {};

  return (
    <div className={style.detailsContainer}>
      <h1>{name}</h1>
      <ul>
        <li>Rotation Period: {rotation_period}</li>
        <li>Orbital Period: {orbital_period}</li>
        <li>Diameter: {diameter}</li>
        <li>Climate: {climate}</li>
        <li>Gravity: {gravity}</li>
        <li>Terrain: {terrain}</li>
        <li>Surface Water: {surface_water}</li>
        <li>Population: {population}</li>
      </ul>
    </div>
  );
}
