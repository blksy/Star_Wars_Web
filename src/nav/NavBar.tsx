import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import ROUTES from "../routes";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const { user, isLoading } = useAuth();

  return (
    <nav className={style.nav}>
      <Link to={ROUTES.home}>
        <h2 className={style.h2}>Star Wars Web</h2>
      </Link>
      <ul className={style.ul}>
        <Link to={ROUTES.movies}>
          <li className={style.list}>Movies</li>
        </Link>
        <Link to={ROUTES.characters}>
          <li className={style.list}>Characters</li>
        </Link>
        <Link to={ROUTES.species}>
          <li className={style.list}>Species</li>
        </Link>
        <Link to={ROUTES.planets}>
          <li className={style.list}>Planets</li>
        </Link>
        <Link to={ROUTES.vehicles}>
          <li className={style.list}>Vehicles</li>
        </Link>
        <Link to={ROUTES.starships}>
          <li className={style.list}>Starships</li>
        </Link>
        {isLoading ? (
          <li className={style.list}>Loading...</li>
        ) : user ? (
          <Link to={`${ROUTES.profile}/${user.username}`}>
            <li className={style.list}>{user.username}</li>
          </Link>
        ) : (
          <Link to={ROUTES.register}>
            <li className={style.list}>Register</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}
