import { useEffect, useState } from "react";
import style from "./Vehicles.module.css";
import { fetchVehicles } from "../../api/vehiclesRequests";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { Vehicle } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

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
        {vehicles.map(
          ({
            name,
            model,
            manufacturer,
            length,
            crew,
            passengers,
            vehicle_class,
            url,
          }) => {
            return (
              <Link
                key={name}
                to={ROUTES.vehicleDetails(url.split("/").at(-2) || "")}
              >
                <Card
                  title={name}
                  details={{
                    Model: model,
                    Manufacturer: manufacturer,
                    Length: length,
                    Crew: crew,
                    Passengers: passengers,
                    "Vehicle Class": vehicle_class,
                  }}
                />
              </Link>
            );
          }
        )}
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
