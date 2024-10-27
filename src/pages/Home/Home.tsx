import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import ROUTES from "../../routes";

export default function Home() {
  return (
    <div>
      <Link to={ROUTES.login}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
