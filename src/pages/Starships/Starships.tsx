import { useState, useEffect } from "react";
import { fetchStarships } from "../../api/starshipsRequests";
import style from "./Starships.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { Starship } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

export default function Starships() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const loadStarships = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await fetchStarships(pageNumber);
      setStarships(data);
    } catch (error) {
      console.error("Error fetching starships:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadStarships(page);
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
        {starships.map(
          ({
            name,
            model,
            manufacturer,
            length,
            crew,
            passengers,
            hyperdrive_rating,
            url,
          }) => {
            return (
              <Link
                key={name}
                to={ROUTES.starshipDetails(url.split("/").at(-2) || "")}
              >
                <Card
                  title={name}
                  details={{
                    Model: model,
                    Manufacturer: manufacturer,
                    Length: length,
                    Crew: crew,
                    Passengers: passengers,
                    "Hyperdrive Rating": hyperdrive_rating,
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
