"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function UserAccount() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const [referenceData, setReferenceData] = useState({
    firstName: "",
    lastName: "",
    name: "",
  });

  const toggleDropdown = () => {
    setIsVisible((value) => !value);
  };

  useEffect(() => {
    if (session?.user?._id) {
      fetch(`/api/user/${session.user._id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.referenceData) {
            setReferenceData({
              firstName: data.referenceData.firstName || "",
              lastName: data.referenceData.lastName || "",
              name: data.referenceData.name || "",
            });
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [session]);

  const getInitials = (firstName, lastName, name) => {
    if (firstName && lastName) {
      return (
        firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
      );
    }
    if (name) {
      return name
        .split(" ")
        .map((n) => n.charAt(0).toUpperCase())
        .join("");
    }
    return "L";
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-center px-5"
        onClick={toggleDropdown}
      >
        <div className="mr-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100">
          <span className="font-bold text-gray-600">
            {getInitials(
              referenceData.firstName,
              referenceData.lastName,
              referenceData.name,
            )}
          </span>
        </div>
        <h2 className="font-bold text-sky-300">Hello</h2>
        <span className="ml-1 font-bold text-gray-600">
          {referenceData.firstName || referenceData.name ? (
            referenceData.firstName || referenceData.name
          ) : (
            <div className="h-5 w-24 rounded-full bg-gray-300"></div>
          )}
        </span>
      </div>

      {isVisible && (
        <div className="absolute right-0 z-10 w-44 transform divide-y divide-gray-100 rounded-lg bg-white shadow">
          <div className="px-4 py-3 text-sm text-gray-900">
            <div className="font-medium">
              <h1>{session?.user?.email}</h1>
            </div>
          </div>

          <div className="justify-center rounded bg-red-500 py-1">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
