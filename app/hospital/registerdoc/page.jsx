"use client";
import { FormikProvider, useFormik } from "formik";
import registerDvalid from "@/app/Validation/doctor/registerDvalid";
import { useRouter } from "next/navigation";
import InputField from "@/app/ui/inputs/inputfield";
import SelectField from "@/app/ui/inputs/SelectField";
import TextAreaField from "@/app/ui/inputs/TextAreaField";
import ListInput from "@/app/ui/inputs/ListInput";

function DocRegister() {
  const router = useRouter();

  const doctorspecialties = [
    "Select",
    "Cardiology",
    "Dermatology",
    "Dentist",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Rheumatology",
    "Surgery",
    "Urology",
  ];

  const formik = useFormik({
    initialValues: {
      role: "Doctor",
      firstName: "",
      lastName: "",
      specialties: "",
      gender: "",
      theAbout: "",
      education: [],
      languages: [],
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validationSchema: registerDvalid,

    onSubmit: async (values) => {
      try {
        const res = await fetch("/api/hospital/docregister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: values.role,
            firstName: values.firstName,
            lastName: values.lastName,
            specialties: values.specialties,
            gender: values.gender,
            theAbout: values.theAbout,
            education: values.education,
            languages: values.languages,
            email: values.email,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          }),
        });
        if (res.ok) {
          router.push("/hospital/dashboard");
        } else {
          throw new Error("Failed to register".Error);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <div>
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8  lg:py-4">
          <div className="w-full rounded-lg bg-white shadow sm:max-w-2xl md:mt-0 xl:p-0 ">
            <div className=" space-y-4 p-6 sm:p-8 md:space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl"> Hospital Name </h1>
                <h1>Register a Doctor</h1>
              </div>
              <FormikProvider value={formik}>
                <form
                  className="flex flex-col flex-wrap justify-center"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <h2 className="mb-4"> General Information</h2>
                    <div className="grid grid-cols-2 gap-x-16">
                      <div className="mb-4 ">
                        {" "}
                        <InputField
                          id="firstName"
                          type="text"
                          name="firstName"
                          label="First Name"
                          onChange={formik.handleChange}
                          value={formik.values.firstName}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                          <p className="ml-2 text-xs text-red-500">
                            {formik.errors.firstName}
                          </p>
                        ) : null}
                      </div>
                      <div className="mb-4 ">
                        <InputField
                          id="lastName"
                          type="text"
                          name="lastName"
                          label="Last Name"
                          onChange={formik.handleChange}
                          value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                          <p className="ml-2 text-xs text-red-500">
                            {formik.errors.lastName}
                          </p>
                        ) : null}
                      </div>
                      <div className="mb-4">
                        <SelectField
                          id=" specialties"
                          name="specialties"
                          options={doctorspecialties}
                          label=" specialties"
                          onChange={formik.handleChange}
                          value={formik.values.specialties}
                        />
                        {formik.touched.specialties &&
                        formik.errors.specialties ? (
                          <p className="ml-2 text-xs text-red-500">
                            {formik.errors.specialties}
                          </p>
                        ) : null}
                      </div>
                      <div className="mb-4">
                        <SelectField
                          id="gender"
                          name="gender"
                          options={["Select", "Male", "Female"]}
                          label="Gender"
                          onChange={formik.handleChange}
                          value={formik.values.gender}
                        />
                        {formik.touched.gender && formik.errors.gender ? (
                          <p className="ml-2 text-xs text-red-500">
                            {formik.errors.gender}
                          </p>
                        ) : null}
                      </div>{" "}
                      <div className="col-span-2 mb-4">
                        <TextAreaField
                          id="theAbout"
                          name="theAbout"
                          onChange={formik.handleChange}
                          value={formik.values.theAbout}
                          label="About The Doctor"
                          className="mb-4 w-full"
                        />{" "}
                        {formik.touched.theAbout && formik.errors.theAbout ? (
                          <p className=" text-xs text-red-500">
                            {formik.errors.theAbout}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-5 grid grid-cols-2 gap-x-16">
                      <div className="mb-4">
                        {" "}
                        <ListInput
                          id="education"
                          name="education"
                          setFieldValue={(field, value) =>
                            formik.setFieldValue(field, value)
                          }
                          label="Education and Training"
                          className="m-0 p-2"
                        />
                        {formik.touched.education && formik.errors.education ? (
                          <p className="text-xs text-red-500">
                            {formik.errors.education}
                          </p>
                        ) : null}
                      </div>{" "}
                      <div className="mb-4">
                        {" "}
                        <ListInput
                          id="languages"
                          name="languages"
                          setFieldValue={(field, value) =>
                            formik.setFieldValue(field, value)
                          }
                          label="Languages Spoken"
                          className="m-0 p-2"
                        />
                        {formik.touched.languages && formik.errors.languages ? (
                          <p className="text-xs text-red-500">
                            {formik.errors.languages}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-5"> Credential Information </h2>
                      <div className="mb-4">
                        <InputField
                          label="Email"
                          type="email"
                          name="email"
                          id="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />{" "}
                        {formik.touched?.email && formik.errors?.email ? (
                          <p className="text-xs text-red-500">
                            {formik.errors.email}
                          </p>
                        ) : null}
                      </div>
                      <div className="grid grid-cols-2 gap-x-16">
                        <div className="mb-4">
                          <InputField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                          />
                          {formik.touched?.password &&
                          formik.errors?.password ? (
                            <p className="text-xs text-red-500">
                              {formik.errors.password}
                            </p>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          {" "}
                          <InputField
                            label="Conform Password"
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            onChange={formik.handleChange}
                            value={formik.values.passwordConfirm}
                          />{" "}
                          {formik.touched?.passwordConfirm &&
                          formik.errors?.passwordConfirm ? (
                            <p className="text-xs text-red-500">
                              {formik.errors.passwordConfirm}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" mt-4 w-40 place-self-center rounded-md bg-primary p-2 text-lg text-white"
                  >
                    Add a Doctor
                  </button>
                </form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocRegister;
