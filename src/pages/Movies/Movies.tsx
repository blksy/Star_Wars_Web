import { useEffect, useState } from "react";
import { fetchMovies } from "../../api/movieRequests";
import style from "./Movies.module.css";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

interface Movie {
  id: string;
  title: string;
  director: string;
  producer: string;
  release_date: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
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
        {movies.map((movie) => (
          <Link key={movie.id} to={ROUTES.movieDetails(movie.id)}>
            <Card
              title={movie.title}
              details={{
                Director: movie.director,
                Producer: movie.producer,
                "Release Date": movie.release_date,
              }}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
