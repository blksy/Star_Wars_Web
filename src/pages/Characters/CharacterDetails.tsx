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
    queryFn: () => fetchCharacterDetails(characterId as string),
    enabled: !!characterId,
  });

  if (isLoading) {
    return <div className={style.load}>Loading Character details...</div>;
  }

  if (error) {
    return <div className={style.load}>Failed to load Character details.</div>;
  }

  const {
    name = "N/A",
    height = "N/A",
    mass = "N/A",
    hair_color = "N/A",
    skin_color = "N/A",
    eye_color = "N/A",
    birth_year = "N/A",
    gender = "N/A",
    homeworld = "N/A",
    films = [],
    species = [],
    vehicles = [],
    starships = [],
  } = characterDetails || {};

  return characterDetails ? (
    <div className={style.detailsContainer}>
      <h2 className={style.name}>{name}</h2>
      <ul className={style.detailsList}>
        <li>
          <strong>Height:</strong> {height} cm
        </li>
        <li>
          <strong>Mass:</strong> {mass} kg
        </li>
        <li>
          <strong>Hair Color:</strong> {hair_color}
        </li>
        <li>
          <strong>Skin Color:</strong> {skin_color}
        </li>
        <li>
          <strong>Eye Color:</strong> {eye_color}
        </li>
        <li>
          <strong>Birth Year:</strong> {birth_year}
        </li>
        <li>
          <strong>Gender:</strong> {gender}
        </li>
        <li>
          <strong>Homeworld:</strong> {homeworld}
        </li>
        <li>
          <strong>Films:</strong> {films.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Species:</strong> {species.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Vehicles:</strong> {vehicles.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Starships:</strong> {starships.join(", ") || "N/A"}
        </li>
      </ul>
      <Link to={ROUTES.characters}>
        <Button className={style.btn}>Go Back to the Character List</Button>
      </Link>
    </div>
  ) : (
    <div>No details available for this character.</div>
  );
}
