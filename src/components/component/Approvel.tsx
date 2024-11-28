/** @format */

"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {DB_URL} from "@/modal/db_url";

export default function ApproveModal({studentId}: {studentId: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleApprove = async () => {
    setLoading(true);

    const res = await fetch(
      `${DB_URL()}/user/update/status?userId=${studentId}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const data = await res;
    console.log(data);
    try {
      if (res.ok) {
        setMessage("Student approved successfully!");
        setIsOpen(false);
        location.reload();
        router.refresh(); // Refresh data
      } else {
        throw new Error("Failed to approve.");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
        Approve
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white w-96 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Approve Student</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to approve this student?
              </p>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  disabled={loading}>
                  {loading ? "Approving..." : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </>
  );
}
