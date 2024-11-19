import { useQuery } from "@tanstack/react-query";
import style from "./Movies.module.css";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/movieRequests";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: movieDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className={style.load}>Loading Movie details...</div>;
  }

  if (error) {
    return <div className={style.load}>Failed to load Movie details.</div>;
  }

  const {
    title = "N/A",
    opening_crawl = "N/A",
    director = "N/A",
    producer = "N/A",
    release_date = "N/A",
    species = [],
    starships = [],
    vehicles = [],
    characters = [],
    planets = [],
  } = movieDetails || {};
  return movieDetails ? (
    <div className={style.detailsContainer}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.crawl}>{opening_crawl}</p>
      <ul className={style.detailsList}>
        <li>
          <strong>Director:</strong> {director}
        </li>
        <li>
          <strong>Producer:</strong> {producer}
        </li>
        <li>
          <strong>Release Date:</strong> {release_date}
        </li>
        <li>
          <strong>Species:</strong> {species.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Starships:</strong> {starships.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Vehicles:</strong> {vehicles.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Characters:</strong> {characters.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Planets:</strong> {planets.join(", ") || "N/A"}
        </li>
      </ul>
      <Link to={ROUTES.movies}>
        <Button className={style.btn}>Go Back to the Movies List</Button>
      </Link>
    </div>
  ) : (
    <div>No details available for this movie</div>
  );
}
