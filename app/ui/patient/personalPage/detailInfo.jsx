"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PrescriptionList from "@/app/ui/cards/prescription";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [referenceData, setReferenceData] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async (referenceId) => {
    try {
        const response = await fetch(`/api/prescriptions?patientId=${referenceId}`);
        const data = await response.json();
        console.log(data)
        setPrescriptions(data);
    } catch (error) {
        console.error("Error fetching prescriptions:", error.message);
    }
  };


  useEffect(() => {
    if (session?.user?._id) {
      fetch(`/api/user/${session.user._id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.user);
          setReferenceData(data.referenceData);
          fetchPrescriptions(data.user?.referenceId);

        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

  }, [session]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const rescriptions = [
    {
      description: "Blood pressure medication",
      doctorName: "Dr. John Doe",
      doctorSpecialization: "Cardiology",
      visitTime: "2023-11-30T00:00:00.000Z",
      daysAgo: 3,
      medicines: ["Lisinopril", "Amlodipine"],
      patient: "patient_id_1",
    },
    {
      description: "Diabetes management",
      doctorName: "Dr. Jane Smith",
      doctorSpecialization: "Endocrinology",
      visitTime: "2023-11-28T00:00:00.000Z",
      daysAgo: 5,
      medicines: ["Metformin", "Insulin"],
      patient: "patient_id_1",
    },
    {
      description: "Cholesterol control",
      doctorName: "Dr. Emma Brown",
      doctorSpecialization: "General Medicine",
      visitTime: "2023-11-25T00:00:00.000Z",
      daysAgo: 8,
      medicines: ["Atorvastatin"],
      patient: "patient_id_1",
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <div className="flex h-screen justify-between gap-5">
        <div className="h-[85vh] w-1/3 overflow-auto rounded-lg bg-white p-8 shadow-md">
          {userData && referenceData ? (
            <>
              <div className="">
                <div>
                  <ul className=" flex flex-row flex-wrap gap-x-6 gap-y-1">
                    <li className="flex flex-col">
                      <h5 className="text-gray-500">First Name:</h5>
                      <h2>{referenceData.firstName}</h2>
                    </li>
                    <li className="flex flex-col">
                      <h5 className="text-gray-500">Last Name:</h5>
                      <h2>{referenceData.lastName}</h2>
                    </li>
                    <li className="flex flex-col">
                      <h5 className="text-gray-500">Gender:</h5>
                      <h2>{referenceData.gender}</h2>
                    </li>
                    <li className="flex flex-col">
                      <h5 className="text-gray-500">Birthday:</h5>
                      <h2>{formatDate(referenceData.birthDay)}</h2>
                    </li>
                    <li className="flex  flex-col">
                      <h5 className="text-gray-500">Height:</h5>
                      <h2>{referenceData.height}CM</h2>
                    </li>
                    <li className="flex  flex-col">
                      <h5 className="text-gray-500">Weight:</h5>
                      <h2>{referenceData.weight}KG</h2>
                    </li>
                    <li className="flex  flex-col">
                      <h5 className="text-gray-500">Pre Condition:</h5>
                      <h2>{referenceData.preCondition}</h2>
                    </li>
                    <li className="flex  flex-col">
                      <h5 className="text-gray-500">Medication:</h5>
                      <h2>{referenceData.medication}</h2>
                    </li>
                    <li className="flex flex-col">
                      <h5 className="text-gray-500">Blood:</h5>
                      <h2>{referenceData.blood}</h2>
                    </li>
                    <li className="flex  flex-col">
                      <h5 className="text-gray-500">Allergies:</h5>
                      <h2>{referenceData.allergies}</h2>
                    </li>
                  </ul>
                  <h2 className="mt-3">Emergency Contact</h2>
                  {referenceData.Emergency && (
                    <ul className=" flex flex-row flex-wrap gap-2">
                      <li className="flex flex-col">
                        <h5 className="text-gray-500"> Name:</h5>
                        <h2>{referenceData.Emergency.Name}</h2>
                      </li>
                      <li className="flex flex-col">
                        <h5 className="text-gray-500">Phone:</h5>
                        <h2>{referenceData.Emergency.Phone}</h2>
                      </li>
                      <li className="flex flex-col">
                        <h5 className="text-gray-500">Relation:</h5>
                        <h2>{referenceData.Emergency.Relation}</h2>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="h-[85vh] w-2/3 overflow-auto rounded-lg bg-white p-8 shadow-md">
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <PrescriptionList prescriptions={prescriptions} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
