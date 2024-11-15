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
  const [page, setPage] = useState<number>(1);

  const loadVehicles = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await fetchVehicles(pageNumber);
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <div className={style.container}>
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.name || vehicle.id}
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
        <Button onClick={handlePreviousPage} disabled={page <= 1}>
          Previous
        </Button>
        <p className={style.page}>Page {page}</p>
        <Button onClick={handleNextPage}>Next</Button>
      </div>
    </>
  );
}
