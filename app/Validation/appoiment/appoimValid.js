import * as Yup from "yup";

const appoimValid = Yup.object().shape({
  time: Yup.string(),
  date: Yup.string().required("This Field to require"),
  patient: Yup.string().required(),
  doctor: Yup.string().required(),
  hospital: Yup.string().required(),
  reasonToVisit: Yup.string(),
});

export default appoimValid;
