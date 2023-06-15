import * as yup from "yup";

export const schemaReg = yup.object().shape({
  username: yup
    .string()
    .required("No Name provided.")
    .max(15, "Name is too long - should be 15 chars maximum."),
  email: yup
    .string()
    .email("Please enter correct email.")
    .max(80, "Email is too long - should be 80 chars maximum.")
    .matches(
      /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i,
      "Please enter correct email."
    )
    .required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .max(10, "Password is too long - should be 10 chars maximum."),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Please enter correct email.")
    .max(20, "Email is too long - should be 20 chars maximum.")
    .matches(
      /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i,
      "Please enter correct email."
    )
    .required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .max(10, "Password is too long - should be 10 chars maximum."),
});
