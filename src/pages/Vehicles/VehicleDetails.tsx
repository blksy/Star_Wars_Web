import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import style from "./Vehicles.module.css";
import { fetchVehicleDetails } from "../../api/vehiclesRequests";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: vehicleDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicleDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p className={style.load}>Loading...</p>;

  if (error) return <p>Vehicle details not found.</p>;

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
    vehicle_class = "N/A",
    pilots = [],
    films = [],
  } = vehicleDetails || {};
  return vehicleDetails ? (
    <div className={style.detailsContainer}>
      <h2 className={style.name}>{name}</h2>
      <ul className={style.detailsList}>
        <li>Model: {model}</li>
        <li>Manufacturer: {manufacturer}</li>
        <li>Cost: {cost_in_credits}</li>
        <li>Lengsath: {length}</li>
        <li>Max speed:{max_atmosphering_speed}</li>
        <li>Crew: {crew}</li>
        <li>Pasassengers: {passengers}</li>
        <li>Cargo capacity: {cargo_capacity}</li>
        <li>Consumables: {consumables}</li>
        <li>Vehicle class: {vehicle_class}</li>
        <li>Pilots: {pilots.join(",") || "N/A"}</li>
        <li>Films: {films.join(",") || "N/A"}</li>
      </ul>
      <Link to={ROUTES.vehicles}>
        <Button className={style.btn}>Go Back to the Vehicles List</Button>
      </Link>
    </div>
  ) : (
    <div>No detail available for this Vehicle</div>
  );
}
