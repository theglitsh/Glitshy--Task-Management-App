import React from "react";

const Modal = ({ isOpen, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default Modal;
