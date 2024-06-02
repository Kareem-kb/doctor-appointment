'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function UserAccount() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const [referenceData, setReferenceData] = useState({
    firstName: '',
    lastName: '',
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
              firstName: data.referenceData.firstName || '',
              lastName: data.referenceData.lastName || '',
            });
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [session]);

  const getInitials = (firstName, lastName) => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  return (
    <div>
      <div className="flex cursor-pointer items-center px-5" onClick={toggleDropdown}>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 mr-2">
          <span className="font-bold text-gray-600">
            {referenceData.firstName && referenceData.lastName
              ? getInitials(referenceData.firstName, referenceData.lastName)
              : 'L'}
          </span>
        </div>
        <h2 className="text-sky-300">Hello</h2>
        <h3 className="font-bold">{referenceData.firstName || 'Loading...'}</h3>
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
              onClick={() => signOut({ callbackUrl: '/login' })}
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
