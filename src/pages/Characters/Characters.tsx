import { useEffect, useState } from "react";
import { fetchCharacters } from "../../api/charactersRequests";
import style from "./Characters.module.css";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";
import { useNavigate } from "react-router-dom";

interface Character {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

const Characters: React.FC = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const loadCharacters = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await fetchCharacters(pageNumber);
      console.log("Fetched Characters: ", data);
      setCharacters(data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  const handleCharacterClick = (characterId: string | undefined) => {
    if (characterId) {
      navigate(ROUTES.characterDetails(characterId));
    } else {
      console.error("Character ID is undefined, cannot navigate to details.");
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <h2 className={style.header}>Character List</h2>
      <div className={style.container}>
        {characters.map(
          ({
            id,
            name,
            height,
            mass,
            hair_color,
            skin_color,
            eye_color,
            birth_year,
            gender,
          }) => (
            <Card
              key={id || name}
              title={name}
              details={{
                Height: height,
                Mass: mass,
                "Hair Color": hair_color,
                "Skin Color": skin_color,
                "Eye Color": eye_color,
                "Birth Year": birth_year,
                Gender: gender,
              }}
              onClick={() => handleCharacterClick(id)}
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
};

export default Characters;
