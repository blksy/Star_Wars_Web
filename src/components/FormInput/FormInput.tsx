import { FormikProps } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { yupSchema } from "../../interfaces/interfaces";

type FormValues = yup.InferType<typeof yupSchema>;

export const FormInput = ({
  formik,
  accessor,
  label,
  className,
}: {
  formik: FormikProps<FormValues>;
  accessor: keyof FormValues & string;
  label: string;
  className?: string;
}) => {
  const error = formik.touched[accessor] && formik.errors[accessor];

  return (
    <div className={className}>
      <TextField
        error={Boolean(error)}
        helperText={error ? String(error) : ""}
        id={accessor}
        label={label}
        name={accessor}
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[accessor]}
      />
    </div>
  );
};
