import { useState, useEffect } from "react";
import { fetchStarships } from "../../api/starshipsRequests";
import style from "./Starships.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

interface Starship {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  length: string;
  crew: string;
  passengers: string;
  hyperdrive_rating: string;
}

export default function Starships() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getStarships = async () => {
      try {
        const data = await fetchStarships();
        setStarships(data);
      } catch (error) {
        console.error("Error fetching starships:", error);
      } finally {
        setLoading(false);
      }
    };
    getStarships();
  });

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <div className={style.container}>
        {starships.map((starship) => (
          <Card
            key={starship.name}
            title={starship.name}
            details={{
              Model: starship.model,
              Manufacturer: starship.manufacturer,
              Length: starship.length,
              Crew: starship.crew,
              Passengers: starship.passengers,
              "Hyperdrive Rating": starship.hyperdrive_rating,
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
