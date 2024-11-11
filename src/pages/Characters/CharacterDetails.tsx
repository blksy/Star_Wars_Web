import { useQuery } from "@tanstack/react-query";
import style from "./Characters.module.css";
import { Link, useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../../api/charactersRequests";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";

export default function CharacterDetails() {
  const { characterId } = useParams<{ characterId: string }>();

  const {
    data: characterDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacterDetails(characterId),
    enabled: !!characterId,
  });

  if (isLoading) {
    return <div className={style.load}>Loading Character details...</div>;
  }

  if (error) {
    return <div className={style.load}>Failed to load Character details.</div>;
  }
  return characterDetails ? (
    <div className={style.container}>
      <h2 className={style.name}>{characterDetails.name}</h2>
      <div className={style.details}>
        <p>
          <strong>Height:</strong> {characterDetails.height} cm
        </p>
        <p>
          <strong>Mass:</strong> {characterDetails.mass} kg
        </p>
        <p>
          <strong>Hair Color:</strong> {characterDetails.hair_color}
        </p>
        <p>
          <strong>Skin Color:</strong> {characterDetails.skin_color}
        </p>
        <p>
          <strong>Eye Color:</strong> {characterDetails.eye_color}
        </p>
        <p>
          <strong>Birth Year:</strong> {characterDetails.birth_year}
        </p>
        <p>
          <strong>Gender:</strong> {characterDetails.gender}
        </p>
        <p>
          <strong>Homeworld:</strong> {characterDetails.homeworld}
        </p>
        <p>
          <strong>Films:</strong> {characterDetails.films.join(", ")}
        </p>
        <p>
          <strong>Species:</strong> {characterDetails.species.join(", ")}
        </p>
        <p>
          <strong>Vehicles:</strong> {characterDetails.vehicles.join(", ")}
        </p>
        <p>
          <strong>Starships:</strong> {characterDetails.starships.join(", ")}
        </p>
      </div>
      <Link to={ROUTES.characters}>
        <Button className={style.btn}>Go Back to the Character List</Button>
      </Link>
    </div>
  ) : (
    <div>No details available for this character.</div>
  );
}
