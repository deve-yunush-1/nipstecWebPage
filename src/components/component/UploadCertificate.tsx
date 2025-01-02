/** @format */

import {DB_URL} from "@/modal/db_url";
import React, {useState} from "react";

export const UploadCertificate = ({
  isOpen,
  onClose,
  onUpload,
  productId,
  userId,
}: {
  isOpen: boolean;
  onClose: any;
  onUpload: any;
  productId: string;
  userId: string;
}) => {
  const [certificateFile, setCertificateFile] = useState(null);

  const handleFileChange = (e: {target: {files: any}}) => {
    setCertificateFile(e.target.files[0]);
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    if (!certificateFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("document", certificateFile);

    try {
      // Replace with your API endpoint
      const {fileUrl, status, message} = await (
        await fetch(
          `${DB_URL()}/files/document?userId=${userId}&productId=${productId}&type=CERTIFICATE`,
          {
            method: "POST",
            body: formData,
          }
        )
      ).json();

      if (status === "success") {
        alert("Certificate uploaded successfully!");
        onUpload(); // Callback to refresh data or handle success
        onClose(); // Close the modal
        setIsLoading(false);
      } else {
        alert("Failed to upload certificate. Try again!");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading certificate:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Upload Certificate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="certificate"
              className="block text-sm font-medium text-gray-700">
              Select Certificate
            </label>
            <input
              type="file"
              id="certificate"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              {!isLoading ? "Upload" : "Uploading..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
