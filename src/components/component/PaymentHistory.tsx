/** @format */

import {DB_URL} from "@/modal/db_url";
import {Installment} from "@/modal/Installment";
import React from "react";
import {useEffect, useState} from "react";

interface PaymentHistoryProps {
  enrollmentId: any;
}

export function PaymentHistory({enrollmentId}: PaymentHistoryProps) {
  const [installments, setInstallments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  if (!enrollmentId) return; // Only fetch if enrollmentData exists
  const fetchEnrollmentData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${DB_URL()}/user/installment/enrollment?en=${enrollmentId}`, // Use GET with query params
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch installments");
      }

      const data = await response.json();
      setInstallments(data);
      setError(""); // Clear any previous error
    } catch (err) {
      setError(`Error fetching enrollment data: ${err}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    fetchEnrollmentData();
  }, [enrollmentId]); // Trigger when enrollmentData changes
  const handleRefresh = () => {
    fetchEnrollmentData();
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="font-bold text-2xl mb-2 text-blue-500">
          Payment History
        </div>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-600 mb-2 text-white px-4 py-2 rounded-md">
          Refresh
        </button>
      </div>
      <div className="container border-2 border-blue-500 p-3 rounded-md">
        {/* Table Headers */}
        <div className="grid grid-cols-8 font-bold text-center">
          <div>S. No.</div>
          <div>Reg. Number</div>
          <div>Amount Paid</div>
          <div>Amount Due</div>
          <div>Particular</div>
          <div>Mode</div>
          <div>Method</div>
          <div>Date</div>
        </div>
        <div className="w-full h-[2px] bg-blue-500 my-2"></div>
        <div className="w-full h-40 overflow-x-auto">
          {/* Table Data */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error}</p>
          ) : installments.length > 0 ? (
            <div>
              {[...installments].reverse().map((item: Installment, index) => {
                // Check if the payment date is today
                const paymentDate = new Date(
                  item.paymentDateTime
                ).toDateString();
                const today = new Date().toDateString();
                const isToday = paymentDate === today;

                return (
                  <div
                    key={index}
                    className={`grid grid-cols-8 text-center py-2 border-b border-gray-300 ${
                      isToday ? "bg-green-100" : ""
                    }`}>
                    <div>{installments.length - index}</div>
                    <div>{item.dbEnrollment?.registration_number || "N/A"}</div>
                    <div>{item.amountPaid || "0"}</div>
                    <div>{item.dueAmount || "0"}</div>
                    <div>{item.transParticular || "N/A"}</div>
                    <div>{item.paymentMode || "N/A"}</div>
                    <div>{item.paymentMethod || "N/A"}</div>
                    <div>
                      {getDate(item.paymentDateTime, "string") || "N/A"}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center">No installments found.</p>
          )}
        </div>
      </div>
    </>
  );
}
function getDate(
  paymentDateTime: string,
  format: "timestamp" | "string" = "timestamp",
  timeZone: string = "Asia/Kolkata"
): number | string | null {
  const timestamp = Date.parse(paymentDateTime);

  if (isNaN(timestamp)) {
    console.error("Invalid date string:", paymentDateTime);
    return null;
  }

  if (format === "string") {
    // Convert UTC timestamp to user's local time and format it
    const date = new Date(timestamp);

    // To handle a consistent format, ensure it adapts to the user's local time zone
    return date.toLocaleString("en-IN", {timeZone}); // Will use the user's local time zone automatically
  }

  return timestamp.toLocaleString();
}
