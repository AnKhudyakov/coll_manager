import * as yup from "yup";

export const schemaReg = yup.object().shape({
  username: yup
    .string()
    .required("No Name provided.")
    .max(20, "Name is too long - should be 20 chars maximum."),
  email: yup
    .string()
    .email("Please enter correct email.")
    .max(50, "Email is too long - should be 50 chars maximum.")
    .matches(
      /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i,
      "Please enter correct email."
    )
    .required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .min(5, "Password must be longer then 4 chars")
    .max(20, "Password is too long - should be 20 chars maximum."),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Please enter correct email.")
    .max(50, "Email is too long - should be 50 chars maximum.")
    .matches(
      /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i,
      "Please enter correct email."
    )
    .required("No email provided."),
  password: yup
    .string()
    .required("No password provided.")
    .min(5, "Password must be longer then 5 chars")
    .max(20, "Password is too long - should be 20 chars maximum."),
});
export const schemaRecover = yup.object().shape({
  email: yup
    .string()
    .email("Please enter correct email.")
    .max(50, "Email is too long - should be 50 chars maximum.")
    .matches(
      /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,6})$/i,
      "Please enter correct email."
    )
    .required("No email provided."),
});

export const schemaCollection = yup.object().shape({
  name: yup
    .string()
    .max(100, "Name is too long - should be 100 chars maximum.")
    .required("No name provided."),
  description: yup
    .string()
    .required("No description provided.")
    .max(450, "Description is too long - should be 250 chars maximum."),
  topic: yup
    .string()
    .required("No topic provided.")
    .max(100, "Topic is too long - should be 100 chars maximum."),
  customFields: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .test("is-unique", "Name must be unique", function (value) {
          const { customFields } = this.options.context;
          if (!value) return true;
          return customFields.filter((item) => item.name === value).length === 1;
        }),
      type: yup.string().required("Type is required"),
    })
  ),
});

export const schemaItem = yup.object().shape({
  name: yup
    .string()
    .max(100, "Name is too long - should be 100 chars maximum.")
    .required("No name provided."),
  tags: yup
    .array()
    .required("No tags provided.")
    .max(10, "Should be 10 tags maximum."),
});

export const schemaComment = yup.object().shape({
  comment: yup
    .string()
    .max(300, "Comment is too long - should be 300 chars maximum.")
    .required("No comment provided."),
});

export const schemaProfile = yup.object().shape({
  username: yup
    .string()
    .required("No Name provided.")
    .max(20, "Name is too long - should be 20 chars maximum."),
});
