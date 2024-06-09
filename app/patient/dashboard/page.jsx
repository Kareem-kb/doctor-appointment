"use client";
import React, { useState, useEffect } from "react";
import { LuCalendarOff } from "react-icons/lu";
import { useSession } from "next-auth/react";

const AppointmentCard = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  function getMonthAndDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (id) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      // Remove the deleted appointment from the state
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id),
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-4 max-h-screen space-y-4 overflow-y-auto">
        {Array(2)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse flex-row gap-5 rounded-xl bg-white p-8 shadow-md"
            >
              <div className="flex-1">
                <div className="h-6 w-1/3 rounded bg-gray-300"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                  <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                  <div className="h-4 w-1/4 rounded bg-gray-300"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-300"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center">
                <div className="mb-4 h-4 w-1/3 rounded bg-gray-300"></div>
                <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
                <div className="h-32 w-full rounded bg-gray-300"></div>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="h-10 w-1/2 rounded bg-gray-300"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 max-h-screen space-y-4 overflow-y-auto">
      {appointments.length === 0 ? (
        <div className="flex flex-row items-center justify-center gap-2 rounded-xl bg-white p-8 text-gray-500 shadow-md">
          <LuCalendarOff className="text-xl" />
          <p className="text-xl">No Appointments</p>
        </div>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex flex-row gap-5 rounded-xl bg-white p-8 shadow-md"
          >
            <div className="flex-1">
              <h1 className="font-bold">Upcoming appointment</h1>
              <div className="mt-4">
                <strong>
                  {new Date(appointment.time).toLocaleTimeString()}
                </strong>
                <p className="mt-2 text-sm text-gray-500">
                  <span className="text-base font-bold text-sky-300">Dr</span>{" "}
                  {appointment.doctor.firstName} {appointment.doctor.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.doctor.specialties}
                </p>
                <br />
                <p className="text-sm text-gray-500">
                  {appointment.hospital.name}
                </p>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500 underline">
                    {appointment.hospital.address}
                  </p>
                  <p className="text-sm text-gray-500 underline">
                    {appointment.hospital.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center">
              <p className="mb-4 text-gray-500">
                {getMonthAndDate(appointment.date)}
              </p>
              <label className="text-sm text-gray-400">
                Reason for the visit
              </label>
              <div className="mt-2 h-32 w-full rounded border p-4 text-sm">
                {appointment.reasonToVisit}
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <button
                className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-700 focus:outline-none"
                type="button"
                onClick={() => handleDeleteAppointment(appointment._id)}
              >
                Delete appointment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentCard;
