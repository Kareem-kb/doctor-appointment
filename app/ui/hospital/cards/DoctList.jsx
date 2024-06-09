"use client";

import { GiHospital } from "react-icons/gi";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import DoctorCard from "@/app/ui/hospital/cards/DocCardList"; // Ensure the path is correct

const DoctList = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [referenceData, setReferenceData] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (session?.user?._id) {
      fetch(`/api/user/${session.user._id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.user);
          setReferenceData(data.referenceData);
          fetchDoctors(data.referenceData._id);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [session]);

  const fetchDoctors = async (hospitalId) => {
    try {
      const response = await fetch(`/api/doctors?hospitalId=${hospitalId}`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`/api/doctors/${doctorId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="container mx-auto mt-5 rounded-md  bg-white">
      {userData && referenceData ? (
        <div className="flex flex-col gap-3">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onDelete={deleteDoctor}
            />
          ))}
        </div>
      ) : (
        <div className="container mx-auto mt-5 animate-pulse rounded-md bg-white">
          <div className="flex flex-col gap-3">
            {Array(2)
              .fill()
              .map((_, index) => (
                <div key={index} className="flex flex-col p-2">
                  <div className="flex flex-row items-center p-4 text-4xl font-bold text-sky-300">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                      <div className="h-6 w-24 rounded bg-gray-300"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 h-4 w-1/3 rounded bg-gray-300"></div>
                    <div className="h-4 w-full rounded bg-gray-300"></div>
                    <div className="mt-2 h-4 w-3/4 rounded bg-gray-300"></div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <div className="mb-2 h-4 w-1/4 rounded bg-gray-300"></div>
                      <div className="h-4 w-2/3 rounded bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctList;
