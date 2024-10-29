import { FormikProps } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";

type FormValues = yup.InferType<typeof yupSchema>;

export const FormInput = ({
  formik,
  accessor,
  label,
}: {
  formik: FormikProps<FormValues>;
  accessor: keyof FormValues;
  label: string;
}) => {
  return (
    <div>
      <TextField
        error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
        helperText={
          formik.touched[accessor] && formik.errors[accessor]
            ? formik.errors[accessor]
            : null
        }
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
