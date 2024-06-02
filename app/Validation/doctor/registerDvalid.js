import * as Yup from "yup";

const registerDvalid = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  theAbout: Yup.string().max(500, "Description must be 75 words or less"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be 6 characters or more")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  specialties: Yup.array().of(Yup.string()).ensure(),
  languages: Yup.array().of(Yup.string()).ensure(),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"], "Gender is required"),
  education: Yup.array().of(Yup.string()).ensure(),
});

export default registerDvalid;
