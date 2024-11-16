import { useState, useEffect } from "react";
import { fetchPlanets } from "../../api/planetsRequests";
import style from "./Planet.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

interface Planet {
  id: string;
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
  orbital_period: string;
}
export default function Planets() {
  const navigate = useNavigate();
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

  function handleCardClick(id: string): void {
    if (id) {
      navigate(ROUTES.planetDetails(id));
    } else {
      console.error("Planet ID is undefined, cannot navigate to details.");
    }
  }

  return (
    <>
      <div className={style.container}>
        {planets.map(
          ({
            id,
            name,
            diameter,
            climate,
            terrain,
            population,
            orbital_period,
          }) => (
            <Card
              key={name || id}
              title={name}
              details={{
                Diameter: diameter,
                Climate: climate,
                Terrain: terrain,
                Population: population,
                "Orbital Period": orbital_period,
              }}
              onClick={() => handleCardClick(id)}
            />
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
