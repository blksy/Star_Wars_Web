import { FormikProps } from "formik";
import TextField from "@mui/material/TextField";

type FormInputProps<T> = {
  formik: FormikProps<T>;
  accessor: keyof T & string;
  label: string;
  className?: string;
};

export const FormInput = <T extends Record<string, unknown>>({
  formik,
  accessor,
  label,
  className,
}: FormInputProps<T>) => {
  const error = formik.touched[accessor] && formik.errors[accessor];

  return (
    <div className={className}>
      <TextField
        error={Boolean(error)}
        helperText={error ? String(error) : ""}
        id={accessor}
        label={label}
        name={accessor}
        type={accessor.toLowerCase().includes("password") ? "password" : "text"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[accessor]}
        fullWidth
      />
    </div>
  );
};
