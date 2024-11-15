import { useFormik } from "formik";
import { FormInput } from "../../components/FormInput/FormInput";
import { registerSchema } from "../../validators";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";

type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { session, signUp } = useAuth();

  if (session) {
    navigate(ROUTES.home);
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await signUp(
          values.email,
          values.password,
          values.name,
          values.username
        );
        alert(
          "Registration successful! Please check your email for confirmation."
        );
        navigate(ROUTES.login);
      } catch (err) {
        alert("Error registering: " + (err as Error).message);
      }
    },
  });

  return (
    <div className={style.container}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className={style.header}>Provide credentials to register</h2>
        <span>Name</span>
        <FormInput
          className={style.label}
          formik={formik}
          accessor="name"
          label="Name"
        />
        <span>Username</span>
        <FormInput
          className={style.label}
          formik={formik}
          accessor="username"
          label="Username"
        />
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
          Register
        </Button>
      </form>
      <div className={style.btnContainer}>
        <h2 className={style.header}>
          Already have an account? Login instead!
        </h2>
        <Link to={ROUTES.login}>
          <Button className={style.btn} type="button">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
