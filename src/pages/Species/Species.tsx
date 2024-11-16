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
  const [page, setPage] = useState<number>(1);

  const loadSpecies = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await fetchSpecies(pageNumber);
      setSpecies(data);
    } catch (error) {
      console.error("Error fetching species:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecies(page);
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
        {species.map(
          ({
            id,
            name,
            classification,
            designation,
            language,
            average_height,
            skin_colors,
            average_lifespan,
          }) => (
            <Card
              key={name || id}
              title={name}
              details={{
                Classification: classification,
                Designation: designation,
                Language: language,
                "Average Height": average_height,
                "Skin Colors": skin_colors,
                "Average Lifespan": average_lifespan,
              }}
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
