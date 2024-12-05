import { useFormik } from "formik";
import { FormInput } from "../../components/FormInput/FormInput";
import * as yup from "yup";
import { registerSchema } from "../../validators";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";

type FormValues = yup.InferType<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log("Email value:", values.email);
      try {
        await signUp(
          values.name,
          values.email.trim(),
          values.password,
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
