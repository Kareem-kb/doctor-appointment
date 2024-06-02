import React from 'react';
import { MdDelete } from 'react-icons/md';

const DoctorCard = ({ doctor, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded shadow-md">
      <div>
        <h4 className="text-lg font-bold">{doctor.firstName} {doctor.lastName}</h4>
        <p className="text-gray-600">{doctor.specialties.join(', ')}</p>
      </div>
      <button onClick={() => onDelete(doctor._id)} className="p-2 bg-red-500 rounded-full hover:bg-red-700">
        <MdDelete className="text-white" />
      </button>
    </div>
  );
};

export default DoctorCard;
