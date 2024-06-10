"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";

const Patientlist = () => {
  const { data: session } = useSession();
  const [prescDoc, setPrescDoc] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchPrescDoc = async (doctorId) => {
    console.log("Fetching prescriptions for doctorId:", doctorId);
    try {
      const response = await fetch(`/api/prescriptions?doctorId=${doctorId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPrescDoc(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?._id && session?.user?.role === "Doctor") {
      fetchPrescDoc(session.user.referenceId);
    }
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="rounded-md bg-white p-4">
          <div className="animate-pulse">
            <div className="flex flex-col flex-wrap gap-x-6 gap-y-1">
              {Array(6)
                .fill()
                .map((_, index) => (
                  <li key={index} className="flex flex-col space-y-2">
                    <div className="h-6 w-5/6 rounded bg-gray-300"></div>
                    <div className="h-4 w-11/12 rounded bg-gray-300"></div>
                  </li>
                ))}
            </div>
            <div className="mt-3">
              <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center">
          <div className="mt-5 max-w-screen-lg space-y-4">
            <div className="mb-4 transform rounded-lg border bg-white p-4 shadow-md">
              <p className="text-center text-red-500">Error: {error}</p>
            </div>
          </div>
        </div>
      ) : prescDoc.length === 0 ? (
        <div className="flex justify-center">
          <div className="mt-5 max-w-screen-lg space-y-4">
            <div className="mb-4 transform rounded-lg border bg-white p-4 shadow-md">
              <p className="text-center text-gray-500">
                There are no prescriptions associated with this doctor.
              </p>
            </div>
          </div>
        </div>
      ) : (
        prescDoc.map((prescription, index) => (
          <div
            key={index}
            className="mb-4 transform cursor-pointer rounded-lg border bg-white p-3 shadow-md transition-transform hover:scale-105"
            onClick={() => toggleExpand(index)}
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaPrescriptionBottleMedical className="text-sky-300" />
                <h4 className="text-sm text-gray-500">
                  {prescription.patient.firstName}{" "}
                  {prescription.patient.lastName}
                </h4>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs font-light text-gray-500">
                  {formatDate(prescription.visitTime)}
                </p>
              </div>
            </div>
            <div
              className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                expandedIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="flex justify-between space-x-4">
                <div>
                  <h3 className="text-sm font-light text-gray-500">
                    Description
                  </h3>
                  <p className="text-sm">{prescription.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-light text-gray-500">
                    Medicines
                  </h4>
                  <p className="text-sm">{prescription.medicines.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Patientlist;
