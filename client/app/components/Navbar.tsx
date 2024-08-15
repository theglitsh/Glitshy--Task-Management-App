import Link from "next/link";
import React from "react";

const Navbar = ({ logout }: { logout: () => void }) => {
  return (
    <nav className="bg-gray-800 p-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">Glitshy</div>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="text-white hover:underline">
          Dashboard
        </Link>
        <Link href="/auth/profile" className="text-white hover:underline">
          Profile
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
