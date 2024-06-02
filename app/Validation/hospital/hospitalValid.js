import * as Yup from "yup";

const hospitalValid = Yup.object().shape({
  role: Yup.string().required(),
  name: Yup.string().required(),
  about: Yup.string().test(
    "maxWords",
    "Description must be 75 words or less",
    (value) => maxWords(value, 75),
  ),
  address: Yup.string().required(),
  doctors: Yup.array().of(Yup.string()).ensure(),
  credential: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    passwordConfirm: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  }),
});

export default hospitalValid;
