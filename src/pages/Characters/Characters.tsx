import {
  fetchCharacters,
  fetchCharacterDetails,
} from "../../api/charactersRequests";
import style from "./Characters.module.css";
export default function Characters() {
  console.log(fetchCharacters());
  console.log(fetchCharacterDetails(4));
  return <div className={style.container}>Characters</div>;
}
