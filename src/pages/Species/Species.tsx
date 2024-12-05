import { useState, useEffect } from "react";
import { fetchSpecies } from "../../api/speciesRequests";
import Card from "../../components/Card/Card";
import style from "./Species.module.css";
import Button from "../../components/Button/Button";
import { SpeciesI } from "../../interfaces/interfaces";
import ROUTES from "../../routes";
import { Link } from "react-router-dom";

const Species: React.FC = () => {
  const [species, setSpecies] = useState<SpeciesI[]>([]);
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
            name,
            classification,
            designation,
            language,
            average_height,
            skin_colors,
            average_lifespan,
            url,
          }) => {
            return (
              <Link
                key={name}
                to={ROUTES.speciesDetails(url.split("/").at(-2) || "")}
              >
                <Card
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
};

export default Species;
