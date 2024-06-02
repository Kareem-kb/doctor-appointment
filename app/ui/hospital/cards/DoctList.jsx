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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DoctList;
