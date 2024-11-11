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

  const loadCharacters = async () => {
    setLoading(true);
    try {
      const data = await fetchCharacters();
      setCharacters(data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const handleCharacterClick = (characterName: string) => {
    if (characterName) {
      navigate(ROUTES.characterDetails(characterName));
    } else {
      console.error("Character ID is undefined, cannot navigate to details.");
    }
  };

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <h2 className={style.header}>Character List</h2>
      <div className={style.container}>
        {characters.map((character) => (
          <Card
            key={character.id || character.name}
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
            onClick={() => handleCharacterClick(character.name)}
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
};

export default Characters;
