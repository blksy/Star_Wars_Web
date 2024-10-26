import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Please state Your name"),
  nickname: yup.string().required("Please provide a username"),
  email: yup.string().required("Please provide an exisitng email"),
  password: yup.string().required("Please provide a new password"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Please provide an username for exisiting account"),
  password: yup.string().required("Please provide a password for Your account"),
});
