/** @format */

import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string; // Optional message to display
  title?: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  message,
  title,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-600">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 font-bold">
            ✖
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-2xl">
            {message || "Your payment was processed successfully."}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
