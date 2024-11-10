import { useFormik } from "formik";
import { loginSchema } from "../../validators";
import style from "./Login.module.css";
import { FormInput } from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit() {},
  });
  return (
    <div className={style.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className={style.header}>Provide email and password to login</h2>
        <span>Email</span>
        <FormInput
          className={style.label}
          formik={formik}
          accessor="email"
          label="Email"
        />
        <span>Password</span>
        <FormInput
          className={style.label}
          formik={formik}
          accessor="password"
          label="Password"
        />
        <Button className={style.btn} type="submit">
          Login
        </Button>
        <h2 className={style.header}>
          Don't have an account yet? Regiser instead!
        </h2>
        <Link to={ROUTES.register}>
          <Button className={style.btn}>Register</Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
