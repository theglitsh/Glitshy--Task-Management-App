'use client';

import { useState } from 'react';
import useAuth from '@/app/hooks/useAuth';
import Link from 'next/link';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const url = 'http://localhost:5000/auth/login';
  const { handleChange, handleSubmit, serverErrorMessage, validationErrors } =
    useAuth(formData, setFormData, url, false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
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
              <p className="text-red-500 text-sm mt-1">
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
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>
          {serverErrorMessage && (
            <p className="text-red-500 mb-6">{serverErrorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
          <p className="text-gray-400 text-center mt-4">
            Don't have an account?{' '}
            <Link
              className="text-blue-500 hover:underline"
              href="/auth/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
