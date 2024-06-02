import * as Yup from 'yup';

const registerPValid = Yup.object().shape({
  role: Yup.string().oneOf(['Patient', 'Doctor', 'Hospital']).required('Role is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string().oneOf(['Male', 'Female']).required('Gender is required'),
  birthDay: Yup.date().required('Birthday is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  // Additional validation based on role
  ...(role === 'Patient' ? {
    height: Yup.number(),
    weight: Yup.number(),
    preCondition: Yup.string(),
    medication: Yup.array().of(Yup.string()),
    blood: Yup.string().oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    allergies: Yup.array().of(Yup.string()),
    Emergency: Yup.object().shape({
      Name: Yup.string(),
      Phone: Yup.number(),
      Relation: Yup.string(),
    }),
  } : {}),
  ...(role === 'Doctor' ? {
    about: Yup.string().required('About is required'),
    hospital: Yup.string().required('Hospital is required'),
    specialties: Yup.array().of(Yup.string()).required('Specialties are required'),
    languages: Yup.array().of(Yup.string()).required('Languages are required'),
    education: Yup.string().required('Education is required'),
  } : {}),
  ...(role === 'Hospital' ? {
    name: Yup.string().required('Name is required'),
    about: Yup.string().required('About is required'),
    address: Yup.string().required('Address is required'),
    doctors: Yup.array().of(Yup.string()),
  } : {}),
});

export default registerPValid;
