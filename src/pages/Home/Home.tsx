import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";

export default function Home() {
  return (
    <div>
      <div>
        Welcome to Star Wars Web, Star Wars universe database. Login or Register
        to browse through data.
      </div>
      <Link to={ROUTES.login}>
        <Button>Login</Button>
      </Link>
      <Link to={ROUTES.register}>
        <Button>Register</Button>
      </Link>
    </div>
  );
}
