'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/app/ui/cards/Card';
import Details from '@/app/ui/cards/Details';

const PSearch = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data fetched:', data); // Debugging statement
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
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
          <ul className="space-y-1">
            {doctors.map((doctor) => (
              <div key={doctor._id} onClick={() => handleSelectDoctor(doctor)}>
                <Card doctor={doctor} />
              </div>
            ))}
          </ul>
        </div>
        <div className="h-[85vh] w-2/3 overflow-auto rounded-lg bg-white shadow-md">
          {selectedDoctor ? (
            <Details doctor={selectedDoctor} />
          ) : (
            <p>Select a doctor to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PSearch;
