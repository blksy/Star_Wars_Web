import { useState, useEffect } from "react";
import { fetchPlanets } from "../../api/planetsRequests";
import style from "./Planet.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";
import { Planet } from "../../interfaces/interfaces";

export default function Planets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const loadPlanets = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await fetchPlanets(pageNumber);
      setPlanets(data);
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlanets(page);
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
        {planets.map(
          ({
            name,
            diameter,
            climate,
            terrain,
            population,
            orbital_period,
            url,
          }) => (
            <Link
              key={name}
              to={ROUTES.planetDetails(url.split("/").at(-2) || "")}
            >
              <Card
                title={name}
                details={{
                  Diameter: diameter,
                  Climate: climate,
                  Terrain: terrain,
                  Population: population,
                  "Orbital Period": orbital_period,
                }}
              />
            </Link>
          )
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
