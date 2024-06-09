"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PrescriptionList from "@/app/ui/cards/prescription";

const UserProfile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [referenceData, setReferenceData] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrescriptions = async (referenceId) => {
    try {
      const response = await fetch(
        `/api/prescriptions?patientId=${referenceId}`,
      );
      const data = await response.json();
      const prescriptionsWithDoctorNames = data.map((prescription) => ({
        ...prescription,
        doctorName: `${prescription.doctor.firstName} ${prescription.doctor.lastName}`,
      }));
      setPrescriptions(prescriptionsWithDoctorNames);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching prescriptions:", error.message);
      setIsLoading(false);
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
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    }
  }, [session]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
            <div className="animate-pulse">
              <div className="flex flex-row flex-wrap gap-x-6 gap-y-1">
                {Array(8)
                  .fill()
                  .map((_, index) => (
                    <li key={index} className="flex flex-col space-y-2">
                      <div className="h-4 w-24 rounded bg-gray-300"></div>
                      <div className="h-4 w-32 rounded bg-gray-300"></div>
                    </li>
                  ))}
              </div>
              <div className="mt-3">
                <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
              </div>
            </div>
          )}
        </div>
        <div className="h-[85vh] w-2/3 overflow-auto rounded-lg bg-white p-8 shadow-md">
          <h1 className="text-2xl font-bold mb-2">Prescriptions</h1>
          {isLoading ? (
            <>
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="mb-4 flex animate-pulse space-x-4 "
                  >
                    <div className="h-8 w-1/3 rounded bg-gray-300"></div>
                    <div className="h-5 w-1/4 rounded bg-gray-300"></div>
                    <div className="h-5 w-1/2 rounded bg-gray-300"></div>
                  </div>
                ))}
            </>
          ) : (
            <PrescriptionList prescriptions={prescriptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
