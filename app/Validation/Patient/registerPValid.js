import * as Yup from "yup";

const registerPValid = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"], "Gender is required "),
  birthDay: Yup.date().required("Birthday is required"),
  height: Yup.string("Enter a valid number"),
  weight: Yup.string("Enter a valid number"),
  preCondition: Yup.string(),
  medication: Yup.array().of(Yup.string()).ensure(),
  blood: Yup.string()
    .required("Blood type is required")
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Blood type is required",
    ),
  allergies: Yup.array().of(Yup.string()).ensure(),
  Emergency: Yup.object().shape({
    Name: Yup.string(),
    Phone: Yup.string("Enter a valid number"),
    Relation: Yup.string(),
  }),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export default registerPValid;
