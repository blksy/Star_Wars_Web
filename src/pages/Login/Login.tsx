import { useFormik } from "formik";
import { loginSchema } from "../../validators";
import style from "./Login.module.css";
import { FormInput } from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.home);
    }
  }, [user, navigate]);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        alert("Login successful!");
        navigate(ROUTES.home);
      } catch (err) {
        alert("Error logging in: " + (err as Error).message);
      }
    },
  });
  return (
    <div className={style.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className={style.header}>Provide email and password to login</h2>
        <span>Email</span>
        <FormInput<FormValues> formik={formik} accessor="email" label="Email" />
        <FormInput<FormValues>
          formik={formik}
          accessor="password"
          label="Password"
        />
        <Button className={style.btn} type="submit">
          Login
        </Button>
        <h2 className={style.header}>
          Don't have an account yet? Register instead!
        </h2>
        <Link to={ROUTES.register}>
          <Button className={style.btn} type="button">
            Register
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
