import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import style from "./Home.module.css";
import ROUTES from "../../routes";

export default function Home() {
  return (
    <div className={style.container}>
      <h2>
        Welcome to Star Wars Web, Star Wars universe database.
        <br />
        Login or Register to browse through data.
      </h2>
      <Link to={ROUTES.login}>
        <Button>Login</Button>
      </Link>
      <Link to={ROUTES.register}>
        <Button>Register</Button>
      </Link>
    </div>
  );
}
