"use client";

import DoctorAvatar from "@/public/images/DoctorAvatar.jpg";
import Image from "next/image";
import { MdOutlineAddLocation } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const DetailCard = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [referenceData, setReferenceData] = useState(null);

  useEffect(() => {
    if (session?.user?._id) {
      fetch(`/api/user/${session.user._id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.user);
          setReferenceData(data.referenceData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [session]);

  return (
    <div className="container mx-auto rounded-md bg-white p-4">
      {userData && referenceData ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center p-4 ">
            <Image
              src={DoctorAvatar}
              alt={"Image"}
              className="mr-4 h-24 w-24 rounded-full "
            />
            <div className="flex flex-col">
              <h1 className=" text-2xl font-bold  text-sky-300">
                Dr{" "}
                <span className="font-normal  text-black ">
                  {referenceData.firstName} {referenceData.lastName}
                </span>
              </h1>
              <p className="text-sm text-gray-500">
                {referenceData.specialties}
              </p>
            </div>
            <div className="ml-auto flex ">
              {" "}
              <div className="text-sky-300">
                <MdOutlineAddLocation />
              </div>
              <p className="text-sm text-gray-500">City Hospital</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2">About the Doctor</h3>
            <p className=" text-gray-500">{referenceData.theAbout}</p>
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <h3 className="mb-2 ">Details</h3>
              <ul className="flex flex-col gap-3">
                <li className=" gap-12">
                  <h4 className="text-gray-500">Gender:</h4>
                  <p>{referenceData.gender}</p>
                </li>
                <li className=" gap-5">
                  <h4 className="text-gray-500">Languages:</h4>
                  <p>{referenceData.languages}</p>
                </li>
                <li className=" gap-7">
                  <h4 className="text-gray-500">Education:</h4>
                  <p>{referenceData.education}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto animate-pulse rounded-md bg-white p-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center p-4 text-4xl font-bold text-sky-300">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="h-6 w-24 rounded bg-gray-300"></div>
              </div>
            </div>
            <div>
              <div className="mb-2 h-4 w-1/3 rounded bg-gray-300"></div>
              <div className="h-4 w-full rounded bg-gray-300"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-300"></div>
            </div>
            <div className="flex flex-row gap-3">
              <div>
                <div className="mb-2 h-4 w-1/4 rounded bg-gray-300"></div>
                <div className="h-4 w-2/3 rounded bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCard;
