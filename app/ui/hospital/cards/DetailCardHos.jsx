"use client";

import { GiHospital } from "react-icons/gi";
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
          <div className="flex flex-row items-center p-4 text-4xl font-bold  text-sky-300 ">
            <div className="flex items-center space-x-2">
              <GiHospital className="text-xl2" />
              <span className="text-xl font-bold text-black">
                {referenceData.name}
              </span>
            </div>
          </div>
          <div>
            <h3 className="mb-2">About the Hospital</h3>
            <p className=" text-gray-500">{referenceData.about}</p>
          </div>
          <div className="flex flex-row gap-3">
            <div>
              <h3 className="mb-2 ">Address</h3>
              <p className=" text-gray-500">{referenceData.address}</p>
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
