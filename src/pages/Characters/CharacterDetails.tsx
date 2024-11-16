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

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films = [],
    species = [],
    vehicles = [],
    starships = [],
  } = characterDetails || {};

  return characterDetails ? (
    <div className={style.detailsContainer}>
      <h2 className={style.name}>{name}</h2>
      <div className={style.details}>
        <p>
          <strong>Height:</strong> {height} cm
        </p>
        <p>
          <strong>Mass:</strong> {mass} kg
        </p>
        <p>
          <strong>Hair Color:</strong> {hair_color}
        </p>
        <p>
          <strong>Skin Color:</strong> {skin_color}
        </p>
        <p>
          <strong>Eye Color:</strong> {eye_color}
        </p>
        <p>
          <strong>Birth Year:</strong> {birth_year}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Homeworld:</strong> {homeworld}
        </p>
        <p>
          <strong>Films:</strong> {films.join(", ")}
        </p>
        <p>
          <strong>Species:</strong> {species.join(", ")}
        </p>
        <p>
          <strong>Vehicles:</strong> {vehicles.join(", ")}
        </p>
        <p>
          <strong>Starships:</strong> {starships.join(", ")}
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
