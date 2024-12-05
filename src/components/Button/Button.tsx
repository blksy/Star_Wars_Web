import style from "./Button.module.css";

const Button = ({ children, onClick, disabled, type }: any) => {
  return (
    <button
      className={style.btn}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
