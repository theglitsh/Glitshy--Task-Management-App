"use client";

import { useState } from "react";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    linkedinProfileUrl: "",
  });

  const [isLinkedInRegister, setIsLinkedInRegister] = useState(false);

  const url = isLinkedInRegister
    ? "http://localhost:5000/auth/register/linkedin"
    : "http://localhost:5000/auth/register/email";

  const {
    handleChange,
    handleSubmit,
    serverErrorMessage,
    validationErrors,
    loading,
  } = useAuth(formData, setFormData, url, isLinkedInRegister);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          {isLinkedInRegister ? (
            <div className="mb-4">
              <label
                htmlFor="linkedinProfileUrl"
                className="block text-sm font-medium text-gray-300"
              >
                LinkedIn Profile URL:
              </label>
              <input
                name="linkedinProfileUrl"
                value={formData.linkedinProfileUrl}
                onChange={handleChange}
                className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {validationErrors.linkedinProfileUrl && (
                <p className="text-red-500 text-sm">
                  {validationErrors.linkedinProfileUrl}
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.password && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.password}
                  </p>
                )}
              </div>
            </>
          )}

          {serverErrorMessage && (
            <p className="text-red-500 mb-6">{serverErrorMessage}</p>
          )}
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isLinkedInRegister
              ? "Register with LinkedIn"
              : "Register"}
          </button>
          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" href="/auth/login">
              Login
            </Link>
          </p>
        </form>

        <div className="mt-4">
          <button
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => {
              setIsLinkedInRegister(!isLinkedInRegister);
              setFormData({
                name: "",
                email: "",
                password: "",
                linkedinProfileUrl: "",
              });
            }}
          >
            {isLinkedInRegister
              ? "Register with Email"
              : "Register via LinkedIn"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
