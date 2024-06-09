"use client";

import React, { useState, useEffect } from "react";
import Card from "@/app/ui/cards/Card";
import Details from "@/app/ui/cards/Details";
import { FaUserDoctor } from "react-icons/fa6";

const PSearch = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/doctors");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-screen justify-between gap-5">
        <div className="h-[85vh] w-1/3 overflow-auto rounded-lg bg-white shadow-md">
          <div>
            {isLoading ? (
              <ul className="space-y-4">
                {Array(7)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex animate-pulse items-center space-x-4 p-4"
                    >
                      <div className="mb-4 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                      <div className="flex flex-col space-y-2">
                        <div className="h-2 w-20 rounded bg-gray-300"></div>
                        <div className="h-2 w-32 rounded bg-gray-300"></div>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-16 rounded bg-gray-300"></div>
                          <div className="h-2 w-10 rounded bg-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </ul>
            ) : (
              <ul className="space-y-1">
                {doctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    <Card doctor={doctor} />
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex h-[85vh] w-2/3 justify-center overflow-auto rounded-lg bg-white shadow-md">
          {selectedDoctor ? (
            <Details doctor={selectedDoctor} />
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <h2 className="flex flex-col items-center">
                <FaUserDoctor className="mb-2" />
                Select a doctor to view details
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PSearch;
