/** @format */

import {DB_URL} from "@/modal/db_url";
import {Installment} from "@/modal/Installment";
import React from "react";
import {useEffect, useState} from "react";
import Loading from "./loading";

interface PaymentHistoryProps {
  enrollmentId: any;
}

export function PaymentHistory({enrollmentId}: PaymentHistoryProps) {
  const [installments, setInstallments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [registerationNumber, setRegisterationNumber] = useState("");
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

      setRegisterationNumber(data[0].dbEnrollment.registration_number);

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

  const handlePrintRow = (rowContent: string) => {
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              margin: 20px;
              padding: 20px;
              border: 2px solid #000;
            }
            .table {
              width: 50%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .table th, .table td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: center;
            }
            .table, th {
              background-color: #f2f2f2;
            }
            .text-center {
              text-align: center;
            }
              .text-bold{
                font-size:1rem;
                color:black;
                font-weight: bold;
              }
                .flex{
                    display: flex;
  justify-content: space-between;
                }
  .margin{
        margin-left:50px;
        margin-right: 50px;
  }
          </style>
        </head>
        <body>
          <h1 class="text-center">Payment Receipt</h1>
           <div class="text-black margin text-center flex">
               
              <div class="text-bold text-black">Reg. No.:-</div>
              <div class="text-black">${registerationNumber}</div>
            </div>
          <div class="container">
            
            <div class="grid grid-cols-2 text-center py-2 border-b border-gray-300">
              ${rowContent}
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <>
      <div className="text-black text-2xl">
        Reg. No.:-{" "}
        {registerationNumber ?? "Auto generated after issue first receipt"}
      </div>
      <div className="container border-2 border-blue-500 p-3 rounded-md">
        {/* Table Headers */}
        <div className="grid grid-cols-9 font-bold text-center">
          <div>S. No.</div>
          <div>Rec. No.</div>
          <div>Amount Paid</div>
          <div>Particular</div>
          <div>Mode</div>
          <div>Method</div>
          <div>Date</div>
          <div>Amount Due</div>
        </div>
        <div className="w-full h-[2px] bg-blue-500 my-2"></div>
        <div className="w-full h-40 overflow-x-auto">
          {/* Table Data */}
          {loading ? (
            <div className="flex justify-center items-center ">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">
              Error: Please make a Receipt{" "}
            </p>
          ) : installments.length > 0 ? (
            <div>
              {[...installments].reverse().map((item: Installment, index) => {
                // Check if the payment date is today
                const paymentDate = new Date(
                  item.paymentDateTime
                ).toDateString();
                const today = new Date().toDateString();
                const isToday = paymentDate === today;

                const rowContent = `
                  <div class=" ${isToday ? "bg-green-100" : ""}">
                    <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Installment Number :-</div>
                        <div> ${installments.length - index}</div>
                    </div>
                    <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Receipt Number  :-</div>
                        <div> ${item.receiptNumber || "N/A"}</div>
                    </div>
                    <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Amount Paid  :-</div>
                        <div> ${item.amountPaid || "N/A"}</div>
                    </div>
                 
                    <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Trans. Particular  :-</div>
                        <div> ${item.transParticular || "N/A"}</div>
                    </div>
                 
                    <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Mode of Payment  :-</div>
                        <div> ${item.paymentMode || "N/A"}</div>
                    </div>
                    <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Method of Payment  :-</div>
                        <div> ${item.paymentMethod || "N/A"}</div>
                    </div>
                  
                    <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Due Amount  :-</div>
                        <div>Rs. ${item.dueAmount || 0}</div>
                    </div>
                     <div class="grid grid-cols-2 ">
                        <div class="text-bold flex">Date and Time  :-</div>
                        <div> ${
                          getDate(item.paymentDateTime, "string") || "N/A"
                        }</div>
                    </div>
                `;

                return (
                  <div
                    key={index}
                    className={`grid grid-cols-9 text-center py-2 border-b border-gray-300 ${
                      isToday ? "bg-green-100" : ""
                    }`}>
                    <div>{installments.length - index}</div>
                    <div>{item.receiptNumber || "N/A"}</div>
                    <div>{item.amountPaid || "0"}</div>
                    <div>{item.transParticular || "N/A"}</div>
                    <div>{item.paymentMode || "N/A"}</div>
                    <div>{item.paymentMethod || "N/A"}</div>
                    <div>
                      {getDate(item.paymentDateTime, "string") || "N/A"}
                    </div>
                    <div>{item.dueAmount || "0"}</div>
                    <button
                      onClick={() => handlePrintRow(rowContent)}
                      className="ml-4 text-blue-600 hover:text-blue-800">
                      Print
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center">No installments found.</p>
          )}
        </div>
        <button
          onClick={handleRefresh}
          className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out sm:px-4 sm:py-3">
          Refresh
        </button>
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
