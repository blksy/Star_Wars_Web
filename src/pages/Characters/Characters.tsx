import { useEffect, useState } from "react";
import { fetchCharacters } from "../../api/charactersRequests";
import style from "./Characters.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); // Start on the first page

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1); // Prevent going below page 1
  };

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true); // Set loading to true whenever fetching data
      try {
        const data = await fetchCharacters(page);
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [page]);

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <div className={style.container}>
        {characters.map((character) => (
          <Card
            key={character.name}
            title={character.name}
            details={{
              Height: character.height,
              Mass: character.mass,
              "Hair Color": character.hair_color,
              "Skin Color": character.skin_color,
              "Eye Color": character.eye_color,
              "Birth Year": character.birth_year,
              Gender: character.gender,
            }}
          />
        ))}
      </div>
      <div className={style.btnWrapper}>
        <Button onClick={prevPage} disabled={page === 1}>
          Previous
        </Button>
        <p className={style.page}>{page}</p>
        <Button onClick={nextPage} disabled={characters.length < 20}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Characters;
