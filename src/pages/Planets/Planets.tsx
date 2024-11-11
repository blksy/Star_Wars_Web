import { useState, useEffect } from "react";
import { fetchPlanets } from "../../api/planetsRequests";
import style from "./Planet.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

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
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const data = await fetchPlanets();
        setPlanets(data);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };
    getPlanets();
  });

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <div className={style.container}>
        {planets.map((planet) => (
          <Card
            key={planet.name || planet.id}
            title={planet.name}
            details={{
              Diameter: planet.diameter,
              Climate: planet.climate,
              Terrain: planet.terrain,
              Population: planet.population,
              "Orbital Period": planet.orbital_period,
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
