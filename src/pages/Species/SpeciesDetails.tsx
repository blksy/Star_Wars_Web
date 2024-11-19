import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import style from "./Species.module.css";
import { fetchSpeciesDetails } from "../../api/speciesRequests";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";

export default function SpeciesDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: speciesDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["species", id],
    queryFn: () => fetchSpeciesDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className={style.load}>Loading Species details...</div>;
  }

  if (error) {
    return <div className={style.load}>Failed to load Species details.</div>;
  }

  if (!speciesDetails) {
    return (
      <div className={style.load}>No details available for this species.</div>
    );
  }

  const {
    name = "N/A",
    classification = "N/A",
    average_height = "N/A",
    skin_colors = "N/A",
    hair_colors = "N/A",
    eye_colors = "N/A",
    average_lifespan = "N/A",
    homeworld = "N/A",
    language = "N/A",
    people = [],
    films = [],
  } = speciesDetails;

  return (
    <div className={style.detailsContainer}>
      <h2 className={style.name}>{name}</h2>
      <ul className={style.detailsList}>
        <li>Classification: {classification}</li>
        <li>Average height: {average_height}</li>
        <li>Skin colors: {skin_colors}</li>
        <li>Hair colors: {hair_colors}</li>
        <li>Eye colors: {eye_colors}</li>
        <li>Average lifespan: {average_lifespan}</li>
        <li>Homeworld: {homeworld}</li>
        <li>Language: {language}</li>
        <li>
          People: {people.map((person) => person.name).join(", ") || "N/A"}
        </li>
        <li>Films: {films.map((film) => film.title).join(", ") || "N/A"}</li>
      </ul>
      <Link to={ROUTES.species}>
        <Button className={style.btn}>Go Back to the Species List</Button>
      </Link>
    </div>
  );
}
