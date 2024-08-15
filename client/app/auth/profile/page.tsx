"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserProfile } from "@/app/services/authService";
import { AxiosError } from "axios";
import Navbar from "@/app/components/Navbar";
import useAuthCheck from "@/app/hooks/useAuthCheck";

interface User {
  name: string;
  email: string;
  linkedinProfileUrl?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    linkedinProfileUrl: "",
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { logout } = useAuthCheck();

  useEffect(() => {
    // Fetch the user data when the component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const userData = await fetchUserProfile(token);
        setUser(userData);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response && error.response.status === 401) {
          // If the token has expired or is invalid, redirect to login page
          router.push("/auth/login");
        } else {
          setError("Failed to fetch user data");
        }
      }
    };

    fetchUserData();
  }, [router]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Fragment>
      <Navbar logout={logout} />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Profile
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Name:
            </label>
            <p className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full">
              {user.name}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Email:
            </label>
            <p className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full">
              {user.email}
            </p>
          </div>
          {user.linkedinProfileUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                LinkedIn Profile:
              </label>
              <a
                href={user.linkedinProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full block"
              >
                {user.linkedinProfileUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
