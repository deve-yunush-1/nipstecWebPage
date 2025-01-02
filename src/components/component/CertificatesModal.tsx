/** @format */

import React, {useState, useEffect} from "react";
import {UploadCertificate} from "./UploadCertificate";
import {DB_URL} from "@/modal/db_url";

export const CertificatesModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/certificates?studentId=123"); // Replace `123` with actual student ID
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Failed to fetch certificates");
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleLoadingCertificates = async () => {
    setIsLoading(true);
    const response = await await fetch(
      `${DB_URL()}/files/document?type=CERTIFICATE`
    );
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const renderCertificate = (certificate: any) => {
    const {certificateUrl} = certificate;
    const fileType = certificateUrl.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
      // Image Preview
      return (
        <div className="border p-4 rounded shadow-md">
          <img
            src={certificateUrl}
            alt="Certificate"
            className="w-full h-32 object-cover rounded"
          />
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-blue-600 hover:underline">
            View Full Image
          </a>
        </div>
      );
    } else if (fileType === "pdf") {
      // PDF Preview
      return (
        <div className="border p-4 rounded shadow-md">
          <iframe
            src={certificateUrl}
            title="Certificate PDF"
            className="w-full h-32"></iframe>
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-blue-600 hover:underline">
            Open PDF
          </a>
        </div>
      );
    } else {
      // Other file types (e.g., docs, txt)
      return (
        <div className="border p-4 rounded shadow-md flex items-center justify-between">
          <p className="text-gray-600">Document</p>
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline">
            Download
          </a>
        </div>
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Certificates</h1>
      <button
        onClick={handleLoadingCertificates}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Show Certificates
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Certificates</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certificates.map((certificate) => (
              <div>{renderCertificate(certificate)}</div>
            ))}
          </div>
        ) : (
          <p>No certificates uploaded yet.</p>
        )}
      </div>
    </div>
  );
};
