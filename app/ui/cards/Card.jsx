"use client";
import React from "react";
import { MdOutlineAddLocation } from "react-icons/md";

const Card = ({ doctor }) => {
  const getInitials = (firstName, lastName) => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  return (
    <li
      key={doctor.email}
      className="col-span-1 transform divide-y divide-gray-200 bg-white shadow transition-transform duration-300 hover:scale-95"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-4">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-sky-300">
              Dr{" "}
              <span className="text-black">
                {doctor.firstName} {doctor.lastName}
              </span>
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">
            {doctor.specialties}
          </p>
          <span className="font-small inline-flex flex-shrink-0 text-xs">
            <div className=" text-sky-300">
              <MdOutlineAddLocation />
            </div>
            <p className="text-black">
              {" "}
              {doctor.hospital && doctor.hospital.name}
            </p>
          </span>
        </div>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100">
          <span className="font-bold text-gray-600">
            {getInitials(doctor.firstName, doctor.lastName)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Card;
