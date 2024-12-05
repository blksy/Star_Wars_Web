import { useEffect, useState } from "react";
import { fetchMovies } from "../../api/movieRequests";
import style from "./Movies.module.css";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";
import { Film } from "../../interfaces/interfaces";

export default function Movies() {
  const [movies, setMovies] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <p className={style.load}>Loading...</p>;

  return (
    <>
      <div className={style.container}>
        {movies.map(({ title, director, producer, release_date, url }) => (
          <Link
            key={title}
            to={ROUTES.movieDetails(url.split("/").at(-2) || "")}
          >
            <Card
              title={title}
              details={{
                Director: director,
                Producer: producer,
                "Release Date": release_date,
              }}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
