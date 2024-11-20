import { Link, useParams } from "react-router-dom";
import style from "./Starships.module.css";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";
import { useQuery } from "@tanstack/react-query";
import { fetchStarshipDetails } from "../../api/starshipsRequests";

export default function StarshipDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: starshipDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["starship", id],
    queryFn: () => fetchStarshipDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p className={style.load}>Loading...</p>;

  if (error) return <p>Starship details not found.</p>;

  const {
    name = "N/A",
    model = "N/A",
    manufacturer = "N/A",
    cost_in_credits = "N/A",
    length = "N/A",
    max_atmosphering_speed = "N/A",
    crew = "N/A",
    passengers = "N/A",
    cargo_capacity = "N/A",
    consumables = "N/A",
    hyperdrive_rating = "N/A",
    MGLT = "N/A",
    starship_class = "N/A",
    pilots = [],
    films = [],
  } = starshipDetails || {};
  return starshipDetails ? (
    <div className={style.detailsContainer}>
      <h1 className={style.name}>{name}</h1>
      <ul className={style.detailsList}>
        <li>Model: {model}</li>
        <li>Manufacturer: {manufacturer}</li>
        <li>Cost: {cost_in_credits}</li>
        <li>Length: {length}</li>
        <li>Max speed: {max_atmosphering_speed}</li>
        <li>Crew: {crew}</li>
        <li>Passengers: {passengers}</li>
        <li>Cargo capacity: {cargo_capacity}</li>
        <li>Consumables: {consumables}</li>
        <li>Hyperdrive rating: {hyperdrive_rating}</li>
        <li>MGLT: {MGLT}</li>
        <li>Starship class: {starship_class}</li>
        <li>Pilots: {pilots.join(",") || "N/A"}</li>
        <li>Films: {films.join(",") || "N/A"}</li>
      </ul>
      <Link to={ROUTES.starships}>
        <Button className={style.btn}>Go Back to the Starships List</Button>
      </Link>
    </div>
  ) : (
    <div>No details available for this starship</div>
  );
}
