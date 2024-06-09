"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineAddLocation } from "react-icons/md";
import DoctorAvatar from "@/public/images/DoctorAvatar.jpg";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "@/app/ui/patient/datePicker";
import { useSession } from "next-auth/react";
import TextAreaField from "@/app/ui/inputs/TextAreaField";
import { useRouter } from "next/navigation";

const Details = ({ doctor }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [startDate, setStartDate] = useState();
  const [reasonToVisit, setReasonToVisit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleScheduleAppointment = async () => {
    // Separate date and time
    const dateOnly = new Date(startDate);
    dateOnly.setHours(0, 0, 0, 0);
    const timeOnly = new Date(startDate);
    timeOnly.setFullYear(1970, 0, 1); // Set to arbitrary date to represent time

    const appointmentData = {
      time: timeOnly,
      date: dateOnly,
      patient: session.user.referenceId,
      doctor: doctor._id,
      hospital: doctor.hospital._id,
      reasonToVisit: reasonToVisit,
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to schedule appointment");
      }

      const data = await response.json();
      setErrorMessage(""); // Clear any previous error message
      router.push("/patient/dashboard");
    } catch (error) {
      console.error("Error scheduling appointment:", error.message);
      setErrorMessage(error.message); // Set the error message
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center bg-white p-4">
          <Image
            src={DoctorAvatar}
            alt={"Image"}
            className="mr-4 h-24 w-24 rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-sky-300">
              Dr{" "}
              <span className="font-normal text-black">
                {doctor.firstName} {doctor.lastName}
              </span>
            </h1>
            <p className="text-sm text-gray-500">
              {doctor.specialties.join(", ")}
            </p>
          </div>
          <div className="ml-auto flex">
            <div className="text-sky-300">
              <MdOutlineAddLocation />
            </div>
            <p className="text-sm text-gray-500">{doctor.hospital.name}</p>
          </div>
        </div>

        <div className="bg-white p-4">
          <h3 className="mb-2">About the Doctor</h3>
          <p className="text-gray-500">{doctor.theAbout}</p>
        </div>

        <div className="flex flex-row gap-3 text-xs">
          <div className="w-1/2 bg-white p-3">
            <h3 className="mb-2 text-base">Details</h3>
            <ul className="flex flex-col gap-3">
              <li className="gap-12">
                <h4 className="text-gray-500">Gender:</h4>
                <p>{doctor.gender}</p>
              </li>
              <li className="gap-5">
                <h4 className="text-gray-500">Languages:</h4>
                <p>{doctor.languages.join(", ")}</p>
              </li>
              <li className="gap-7">
                <h4 className="text-gray-500">Education:</h4>
                <p>{doctor.education}</p>
              </li>
            </ul>
          </div>
          <div className="mx-auto w-full max-w-md rounded-lg bg-white p-3 ">
            <h3 className="mb-4 text-base text-black">Book an Appointment</h3>
            <div className="space-y-4">
              <CustomDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
              />
              <TextAreaField
                cols="20"
                id="reasonToVisit"
                name="reasonToVisit"
                onChange={(e) => setReasonToVisit(e.target.value)}
                value={reasonToVisit}
                label="Reason for the visit"
                className="text-xs"
              />
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <button
                className="w-full rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none"
                type="button"
                onClick={handleScheduleAppointment}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
