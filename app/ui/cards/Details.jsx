"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineAddLocation } from "react-icons/md";
import DoctorAvatar from "@/public/images/DoctorAvatar.jpg";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { useSession } from "next-auth/react";

const Details = ({ doctor }) => {
  const { data: session } = useSession();

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16),
  );
  const [message, setMessage] = useState("");
  console.log(startDate, message, session.user?._id, doctor?._id);

  const handleScheduleAppointment = async () => {
    const appointmentData = {
      time: startDate,
      date: startDate,
      patient: session.user.referenceId, 
      doctor: doctor._id,
      hospital: doctor.hospital._id,
      reasonToVisit: message,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule appointment');
      }

      const data = await response.json();
      console.log('Appointment scheduled successfully:', data);
      // Optionally, show a success message or redirect the user
    } catch (error) {
      console.error('Error scheduling appointment:', error.message);
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

        <div className="flex flex-row gap-3">
          <div className="w-1/2 bg-white p-4">
            <h3 className="mb-2">Details</h3>
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
          <div className="w-1/2 rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-xl font-bold">Book an Appointment</h3>
            <div className="w-full rounded-lg border p-2">
              <DatePicker
                className="mb-4"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                excludeTimes={[
                  setHours(setMinutes(new Date(), 0), 17),
                  setHours(setMinutes(new Date(), 30), 18),
                  setHours(setMinutes(new Date(), 30), 19),
                  setHours(setMinutes(new Date(), 30), 17),
                ]}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <textarea
                id="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="Your message..."
              ></textarea>
              <button
                className="float-right mt-4 rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-500 focus:outline-none"
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
