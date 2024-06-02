"use client";
import React, { useState, useEffect } from "react";
import { LuCalendarOff } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Link from "next/link";

const DoctorAppointments = () => {
  const { data: session } = useSession();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?._id) return;

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments?doctorId=${session.user.referenceId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [session?.user?._id]);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-4 max-h-screen space-y-4 overflow-y-auto">
      {appointments.length === 0 ? (
        <div className="flex flex-row items-center justify-center gap-2 rounded-xl bg-white p-8 text-gray-500 shadow-md">
          <LuCalendarOff className="text-xl" />
          <p className="text-xl">No future appointments</p>
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
                <strong>{new Date(appointment.time).toLocaleTimeString()} - {new Date(appointment.time).toLocaleTimeString()}</strong>
                <p className="mt-2 text-sm text-gray-500">
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.patient.phone}
                </p>
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
              <p className="mb-4 text-gray-500">Today</p>
              <label className="text-sm text-gray-400">
                Reason for the visit
              </label>
              <div className="mt-2 h-32 w-full rounded border p-4 text-sm">
                {appointment.reasonToVisit}
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <Link href={`/doctor/appointment/${appointment._id}`} className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none">
                  View appointment
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorAppointments;
