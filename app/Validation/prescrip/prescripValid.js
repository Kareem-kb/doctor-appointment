import * as Yup from "yup";

const prescripValid = Yup.object().shape({
  description: Yup.string()
    .required()
    .test("maxWords", "Description must be 75 words or less", (value) =>
      maxWords(value, 75),
    ),
  doctorName: Yup.string().required(),
  doctorSpecialization: Yup.string().required(),
  visitTime: Yup.string().required(),
  DaysAgo: Yup.string().required(),
  medication: Yup.array().of(Yup.string()).ensure(),
  patient: Yup.string().required(),
});

export default prescripValid;
