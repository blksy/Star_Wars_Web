import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import ROUTES from "../routes";

export default function NavBar() {
  return (
    <nav className={style.nav}>
      <Link to={ROUTES.home}>
        <h2 className={style.h2}>Star Wars Web</h2>
      </Link>
      <ul className={style.ul}>
        <Link to={ROUTES.movies}>
          <li className={style.li}>Movies</li>
        </Link>
        <Link to={ROUTES.characters}>
          <li>Characters</li>
        </Link>
        <Link to={ROUTES.species}>
          <li>Species</li>
        </Link>
        <Link to={ROUTES.planets}>
          <li>Planets</li>
        </Link>
        <Link to={ROUTES.vehicles}>
          <li>Vehicles</li>
        </Link>
        <Link to={ROUTES.starships}>
          <li>Starships</li>
        </Link>
        <Link to={ROUTES.register}>
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
}
