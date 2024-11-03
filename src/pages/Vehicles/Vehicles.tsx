import { useEffect, useState } from "react";
import style from "./Vehicles.module.css";
import { fetchVehicles } from "../../api/vehiclesRequests";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

interface Vehicle {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  length: string;
  crew: string;
  passengers: string;
  vehicle_class: string;
}
export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
    getVehicles();
  });

  if (loading) return <p className={style.load}>Loading...</p>;
  return (
    <>
      <div className={style.container}>
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.name}
            title={vehicle.name}
            details={{
              Model: vehicle.model,
              Manufacturer: vehicle.manufacturer,
              Length: vehicle.length,
              Crew: vehicle.crew,
              Passengers: vehicle.passengers,
              "Vehicle Class": vehicle.vehicle_class,
            }}
          />
        ))}
      </div>
      <div className={style.btnWrapper}>
        <Button>Previous</Button>
        <p className={style.page}></p>
        <Button>Next</Button>
      </div>
    </>
  );
}
