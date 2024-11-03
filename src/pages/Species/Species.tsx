import { useState, useEffect } from "react";
import { fetchSpecies } from "../../api/speciesRequests";
import Card from "../../components/Card/Card";
import style from "./Species.module.css";
import Button from "../../components/Button/Button";

interface Species {
  id: string;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  average_lifespan: string;
  language: string;
}

export default function Species() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSpecies = async () => {
      try {
        const data = await fetchSpecies();
        setSpecies(data);
      } catch (error) {
        console.error("Error fetching species:", error);
      } finally {
        setLoading(false);
      }
    };
    getSpecies();
  }, []);

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <div className={style.container}>
        {species.map((speciesItem, index) => (
          <Card
            key={speciesItem.name + index}
            title={speciesItem.name}
            details={{
              Classification: speciesItem.classification,
              Designation: speciesItem.designation,
              Language: speciesItem.language,
              "Average Height": speciesItem.average_height,
              "Skin Colors": speciesItem.skin_colors,
              "Average Lifespan": speciesItem.average_lifespan,
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
