"use client";

import Image from "next/image";
import logo from "@/public/images/logo.png";
import { FormikProvider, useFormik } from "formik";
import registerPValid from "@/app/Validation/Patient/registerPValid";
import { useRouter } from "next/navigation";
import InputField from "@/app/ui/inputs/inputfield";
import SelectField from "@/app/ui/inputs/SelectField";
import TextAreaField from "@/app/ui/inputs/TextAreaField";
import ListInput from "@/app/ui/inputs/ListInput";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      role: "Patient",
      firstName: "",
      lastName: "",
      gender: "",
      birthDay: "",
      height: "",
      weight: "",
      preCondition: "",
      medication: [],
      blood: "",
      allergies: [],
      Emergency: {
        Name: "",
        Phone: "",
        Relation: "",
      },
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validationSchema: registerPValid,

    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            role: values.role,
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            birthDay: values.birthDay,
            height: values.height,
            weight: values.weight,
            preCondition: values.preCondition,
            medication: values.medication,
            blood: values.blood,
            allergies: values.allergies,
            Emergency: {
              Name: values.Emergency.Name,
              Phone: values.Emergency.Phone,
              Relation: values.Emergency.Relation,
            },
            email: values.email,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          }),
        });
        if (res.ok) {
          router.push("/login");
        } else {
          throw new Error("Failed to create a user", Error);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8  lg:py-4">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-2xl md:mt-0 xl:p-0 ">
          <div className=" space-y-4 p-6 sm:p-8 md:space-y-6">
            <div className="flex items-center justify-between">
              <Image
                src={logo}
                width={200}
                height="auto"
                priority
                alt="test logo"
              />
              <h1 className="text-2xl"> Register </h1>
            </div>
            <FormikProvider value={formik}>
              <form
                className="flex flex-col flex-wrap justify-center"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <h2 className="mb-4"> Personal Information</h2>
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
                    </div>
                    <div className="mb-4">
                      {" "}
                      <InputField
                        id="birthDay"
                        name="birthDay"
                        onChange={formik.handleChange}
                        value={formik.values.birthDay}
                        label="Birthday"
                        type="date"
                      />
                      {formik.touched.birthDay && formik.errors.birthDay ? (
                        <p className="ml-2 text-xs text-red-500">
                          {formik.errors.birthDay}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-6 flex justify-between ">
                      <div className="mb-4">
                        {" "}
                        <InputField
                          id="height"
                          name="height"
                          label="Height"
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.height}
                          className="max-w-24 [appearance:textfield] "
                        />
                        {formik.touched.height && formik.errors.height ? (
                          <p className="ml-2 text-xs text-red-500">
                            {formik.errors.height}
                          </p>
                        ) : null}
                      </div>
                      <div className="mb-4">
                        {" "}
                        <InputField
                          label="Weight"
                          name="weight"
                          id="weight"
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.weight}
                          className="max-w-24 [appearance:textfield] "
                        />{" "}
                        {formik.touched.weight && formik.errors.weight ? (
                          <p className=" text-xs text-red-500">
                            {formik.errors.weight}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="mb-4"> Health Information</h2>
                  <div className="mb-5 grid grid-cols-2 gap-x-16">
                    <div className="mb-4">
                      <TextAreaField
                        cols="20"
                        id="preCondition"
                        name="preCondition"
                        onChange={formik.handleChange}
                        value={formik.values.preCondition}
                        label="Pre-existent Conditions"
                        className="mb-4"
                      />{" "}
                      {formik.touched.preCondition &&
                      formik.errors.preCondition ? (
                        <p className=" text-xs text-red-500">
                          {formik.errors.preCondition}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      {" "}
                      <ListInput
                        id="medication"
                        name="medication"
                        setFieldValue={(field, value) =>
                          formik.setFieldValue(field, value)
                        }
                        label="Existing Medication"
                        className="m-0 p-2"
                      />
                      {formik.touched.medication && formik.errors.medication ? (
                        <p className="text-xs text-red-500">
                          {formik.errors.medication}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      {" "}
                      <SelectField
                        id="blood"
                        name="blood"
                        onChange={formik.handleChange}
                        value={formik.values.blood}
                        options={[
                          "Select",
                          "A+",
                          "A-",
                          "B+",
                          "B-",
                          "AB+",
                          "AB-",
                          "O+",
                          "O-",
                        ]}
                        label="Blood Type"
                      />{" "}
                      {formik.touched.blood && formik.errors.blood ? (
                        <p className=" text-xs text-red-500">
                          {formik.errors.blood}
                        </p>
                      ) : null}
                    </div>{" "}
                    <div className="mb-4">
                      <ListInput
                        name="allergies"
                        id="allergies"
                        setFieldValue={(field, value) =>
                          formik.setFieldValue(field, value)
                        }
                        label="Allergies"
                        className="m-0 p-2"
                      />{" "}
                      {formik.touched.allergies && formik.errors.allergies ? (
                        <p className=" text-xs text-red-500">
                          {formik.errors.allergies}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <h2 className="mb-4"> Emergency Contact</h2>
                    <div className="mb-4">
                      <InputField
                        label="Full Name"
                        type="text"
                        id="Emergency.Name"
                        name="Emergency.Name"
                        onChange={formik.handleChange}
                        value={formik.values.Emergency.Name}
                      />
                      {formik.touched?.Emergency?.Name &&
                      formik.errors?.Emergency?.Name ? (
                        <div>{formik.errors.Emergency.Name}</div>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-2 gap-x-16">
                      {" "}
                      <div className="mb-4">
                        <InputField
                          id="Emergency.Phone"
                          name="Emergency.Phone"
                          onChange={formik.handleChange}
                          value={formik.values.Emergency.Phone}
                          label="Phone Number"
                          type="number"
                          className=" [appearance:textfield] "
                        />{" "}
                      </div>
                      <div>
                        <InputField
                          label="Relationship"
                          type="text"
                          id="Emergency.Relation"
                          name="Emergency.Relation"
                          onChange={formik.handleChange}
                          value={formik.values.Emergency.Relation}
                        />{" "}
                      </div>
                    </div>
                    <h2 className="mb-5"> Credential </h2>
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
                        {formik.touched?.password && formik.errors?.password ? (
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
                  Register
                </button>
              </form>
            </FormikProvider>
          </div>
          <div className="mb-4 ">
            <p className="ml-2 text-sm text-gray-500">
              Have an account already?{" "}
              <Link href="/login" className="hover:text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
