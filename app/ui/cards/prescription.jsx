import React, { useState } from "react";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";

const PrescriptionCard = ({ prescriptions }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {prescriptions.map((prescription, index) => (
        <div
          key={index}
          className="mb-4 transform cursor-pointer rounded-lg border p-2 shadow-md transition-transform"
          onClick={() => toggleExpand(index)}
        >
          <div className="flex items-center justify-around">
            <div className="flex items-center">
              <span className="text-sky-300">
                <FaPrescriptionBottleMedical />
              </span>
              <h4 className=" text-xs text-gray-500">
                {" "}
                {prescription.doctorSpecialization}
              </h4>
            </div>
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-sky-300">
                Dr
                <span className=" text-xs font-light text-gray-500">
                  {prescription.doctorName}
                </span>
              </h3>{" "}
            </div>
            <div>
              <p className=" text-xs font-light text-gray-500">
                {formatDate(prescription.visitTime)}
              </p>
            </div>
          </div>
          <div
            className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
              expandedIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="mt-4 flex justify-between px-2">
              <div>
                <h3 className="text-sm font-light text-gray-500">
                  Description
                </h3>
                <p className="text-sm">{prescription.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-light text-gray-500">Medicines</h4>
                <p className="text-sm">{prescription.medicines.join(" _h ")}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionCard;
