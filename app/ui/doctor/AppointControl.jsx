"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TextAreaField from "@/app/ui/inputs/TextAreaField";
import ListInput from "@/app/ui/inputs/ListInput";
import PrescriptionList from "@/app/ui/cards/prescription";

const mockAppointments = [
  {
    id: 1,
    time: "10:00 - 10:30",
    patient: {
      firstName: "Kareem",
      lastName: "Ahmed",
      gender: "Male",
      blood: "A-",
      Emergency: {
        Name: "John Doe",
        Phone: "9876543210",
        Relation: "Brother",
      },
    },
    prescriptions: [
      {
        title: "Cardiology",
        date: "30/11/2023",
        duration: "3 Months",
      },
    ],
  }, // Add more mock appointments as needed
];
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

const AppointControl = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [medicines, setMedicines] = useState([]);

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === appointments.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? appointments.length - 1 : prevIndex - 1,
    );
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const savePrescription = () => {
    // Here you can add functionality to save the prescription
    setDescription("");
    setMedicines([]);
    handleNext();
  };

  const selectedAppointment = appointments[selectedIndex];

  return (
    <div className="container mx-auto mt-4 overflow-y-auto">
      <div className="flex">
        <div className="flex flex-col items-center  bg-white p-4 ">
          <div className="mb-4 flex items-center">
            <button
              onClick={handlePrev}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
            >
              <FaChevronLeft />
            </button>
            <h3 className="mx-4 text-xl font-bold">Today</h3>
            <button
              onClick={handleNext}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="w-full rounded-md bg-gray-100 p-4">
            <div className="mb-2">
              <strong className="text-lg">{selectedAppointment.time}</strong>
            </div>
            <p className="text-gray-600">
              <strong className="font-bold">Name:</strong>{" "}
              {selectedAppointment.patient.firstName}{" "}
              {selectedAppointment.patient.lastName}
            </p>
          </div>
          <div className="mt-4">
            <TextAreaField label="Prescription" />
            <div className="mt-4">
              <div className="mb-2 flex items-center">
                <ListInput label="Medicines" />
              </div>
              <ul className="list-disc pl-5">
                {medicines.map((medicine, index) => (
                  <li key={index}>{medicine}</li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 w-full rounded bg-primary p-2 text-white"
              onClick={savePrescription}
            >
              Save Prescription
            </button>
          </div>
        </div>
        <div className="  bg-white p-4 ">
          <div className="flex flex-col ">
            <h1 className="text-lg font-bold">Patient Details</h1>
            <p className="text-gray-600">
              <strong className="font-bold">Name:</strong>{" "}
              {selectedAppointment.patient.firstName}{" "}
              {selectedAppointment.patient.lastName}
            </p>
            <p className="text-gray-600">
              <strong className=" text-sm">Gender:</strong>{" "}
              {selectedAppointment.patient.gender}
            </p>
            <p className="text-gray-600">
              <strong className="">Blood Type:</strong>{" "}
              {selectedAppointment.patient.blood}
            </p>
            <p className="text-gray-600">
              <strong className="font-bold">Emergency Contact:</strong>{" "}
              {selectedAppointment.patient.Emergency.Name}
            </p>
            <p className="text-gray-600">
              <strong className="font-bold">Phone:</strong>{" "}
              {selectedAppointment.patient.Emergency.Phone}
            </p>
            <p className="text-gray-600">
              <strong className="font-bold">Relation:</strong>{" "}
              {selectedAppointment.patient.Emergency.Relation}
            </p>
          </div>
          <div className="mt-6 ">
            <div className="mb-4 flex justify-between">
              <h2 className=" text-lg  ">Prescriptions</h2>
            </div>
            <PrescriptionList prescriptions={rescriptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointControl;
