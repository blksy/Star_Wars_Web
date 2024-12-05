import style from "./Card.module.css";

interface CardProps {
  title: string;
  details: { [key: string]: string | number | string[] };
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, details, onClick }) => {
  return (
    <div className={style.card} onClick={onClick}>
      <h2>{title}</h2>
      <ul>
        {Object.entries(details).map(([key, value]) => (
          <li key={key} className={style.listItem}>
            <strong>{key}:</strong>{" "}
            {Array.isArray(value) ? value.join(", ") : value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
