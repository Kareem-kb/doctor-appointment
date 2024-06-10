"use client"; // Ensure this component is client-side
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextAreaField from "@/app/ui/inputs/TextAreaField";
import ListInput from "@/app/ui/inputs/ListInput";
import PrescriptionList from "@/app/ui/cards/prescription";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const AppointControl = () => {
  const { id } = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    if (id) {
      fetchAppointment();
    }
  }, [id]);

  const fetchAppointment = async () => {
    try {
      const response = await fetch(`/api/appointments/${id}`);
      const data = await response.json();
      setAppointment(data);
      fetchPrescriptions(data.patient._id);
    } catch (error) {
      console.error("Error fetching appointment:", error.message);
    }
  };

  const fetchPrescriptions = async (patientId) => {
    try {
      const response = await fetch(`/api/prescriptions?patientId=${patientId}`);
      const data = await response.json();
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error.message);
    }
  };
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const optionsDate = { month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, optionsDate);

    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

    return `${formattedDate} _ ${formattedTime}`;
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      medicines: [],
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      medicines: Yup.array().of(Yup.string().required("Medicine is required")),
    }),
    onSubmit: async (values, { resetForm }) => {
      const newPrescription = {
        ...values,
        doctor: appointment.doctor._id,
        doctorSpecialization: appointment.doctor?.specialties?.join(","),
        visitTime: new Date(),
        daysAgo: 0,
        patient: appointment.patient._id,
      };
      console.log(newPrescription);

      try {
        const response = await fetch("/api/prescriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPrescription),
        });

        if (response.ok) {
          const savedPrescription = await response.json();
          setPrescriptions([...prescriptions, savedPrescription]);
          resetForm();
          router.push("/doctor/patientlist");
        } else {
          console.error("Failed to save prescription");
        }
      } catch (error) {
        console.error("Error saving prescription:", error.message);
      }
    },
  });

  if (!appointment) {
    return (
      <div className="container mx-auto mt-4 max-h-screen space-y-4 overflow-y-auto">
        {Array(1)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse flex-col gap-5 rounded-xl bg-white p-8 shadow-md lg:flex-row"
            >
              {/* Left Column */}
              <div className="flex w-full flex-col items-center bg-white p-4 lg:w-1/3">
                <div className="w-full rounded-md bg-gray-100 p-4">
                  <div className="mb-2 h-6 w-1/3 rounded bg-gray-300"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-300"></div>
                </div>
                <div className="mt-4 w-full">
                  <form>
                    <div className="mb-4">
                      <div className="h-6 w-1/3 rounded bg-gray-300"></div>
                      <div className="mt-1 h-32 rounded-md bg-gray-300"></div>
                    </div>
                    <div className="mb-4">
                      <div className="h-6 w-1/3 rounded bg-gray-300"></div>
                      <div className="mt-1 h-10 rounded-md bg-gray-300"></div>
                    </div>
                    <div className="mt-4 h-10 w-full rounded bg-gray-300"></div>
                  </form>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 overflow-y-auto">
      <div className="flex">
        <div className="flex flex-col items-center bg-white p-4 ">
          <div className="w-full rounded-md bg-gray-100 p-4">
            <div className="mb-2">
              <strong className="text-lg">
                {formatDateTime(appointment.time)} {appointment.data}
              </strong>
            </div>
            <p className="text-gray-600">
              <strong className="font-bold">Name:</strong>{" "}
              {appointment.patient.firstName} {appointment.patient.lastName}
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={formik.handleSubmit}>
              <TextAreaField
                label="Prescription"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="description"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-600">{formik.errors.description}</div>
              ) : null}
              <div className="mt-4">
                <div className="mb-2 flex items-center">
                  <ListInput
                    id="medicines"
                    name="medicines"
                    setFieldValue={(field, value) =>
                      formik.setFieldValue(field, value)
                    }
                    label="Medicines"
                    className="m-0 p-2"
                  />
                </div>
                {formik.touched.medicines && formik.errors.medicines ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.medicines}
                  </p>
                ) : null}
              </div>
              <button
                className="mt-4 w-full rounded bg-primary p-2 text-white"
                type="submit"
              >
                Save Prescription
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-white p-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Patient Details</h1>
            <p className="text-gray-600">
              <strong className="font-bold">Name:</strong>{" "}
              {appointment.patient.firstName} {appointment.patient.lastName}
            </p>
            <p className="text-gray-600">
              <strong className="text-sm">Gender:</strong>{" "}
              {appointment.patient.gender}
            </p>
            <p className="text-gray-600">
              <strong className="">Blood Type:</strong>{" "}
              {appointment.patient.blood}
            </p>
            <p className="text-gray-600">
              <strong className="font-bold">Emergency Contact:</strong>{" "}
              {appointment.patient.Emergency.Name}
            </p>
            <p className="text-gray-600">
              <strong className="font-bold">Phone:</strong>{" "}
              {appointment.patient.Emergency.Phone}
            </p>
            <p className="text-gray-600">
              <strong className="font-bold">Relation:</strong>{" "}
              {appointment.patient.Emergency.Relation}
            </p>
          </div>
          <div className="mt-6">
            <div className="mb-4 flex justify-between">
              <h2 className="text-lg">Prescriptions</h2>
            </div>
            <PrescriptionList prescriptions={prescriptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointControl;
