/** @format */
"use client";
import {LeaveRequest} from "@/modal/leaveRequest";
import {User} from "@/modal/User";
import {getAllocatedByCurrentMonth} from "@/service/getAllocatedByCurrentMonth";
import {approveLeaveRequest} from "@/service/leave/approveLeave";
import {getAllLeavedByCurrentMonth} from "@/service/leave/getAllLeaveByMonth";
import {useEffect, useState} from "react";

interface LeaveRequestData {
  leaveId: number;
  leaveReason: string;
  description: string;
  startDate: string; // Use string or Date depending on how you handle it
  endDate: string; // Use string or Date depending on how you handle it
  leaveRequestStatus: "APPROVED" | "PENDING" | "REJECTED"; // Assuming these are the possible values
  createdAt: string; // Use string or Date depending on how you handle it
  user: User;
}

const LeavesPage = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leave requests from API

  useEffect(() => {
    // Simulate fetching leave requests from an API

    fetchLeaveRequests();
    setLoading(false);
  }, []);
  const fetchLeaveRequests = async () => {
    getAllLeavedByCurrentMonth(1, 2025)
      .then((value: LeaveRequest[]) => {
        setLeaveRequests(value);
      })
      .catch((error) => {
        console.error(error);
      });

    // setLeaveRequests(mockData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <div className="flex justify-between mx-10">
        <h1 className="text-2xl font-bold mb-5">Leave Requests</h1>
        <button
          onClick={fetchLeaveRequests}
          className="bg-blue-500 hover:bg-blue-600 px-10 py-2 rounded-lg ">
          Reffresh
        </button>
      </div>
      <div className=" ">
        <div className="grid grid-cols-7 gap-4 bg-gray-100 p-4 font-semibold">
          <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start">
            Name
          </div>
          <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start">
            Start Date
          </div>
          <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start">
            End Date
          </div>
          <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start">
            Reason
          </div>
          <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start">
            Status
          </div>
          <div className="border w-[220px] px-4 py-2">Actions</div>
        </div>

        {leaveRequests.map((request) => (
          <div
            key={request.leaveId}
            className="grid grid-cols-7 gap-4 p-4 border-b">
            <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start text-start flex items-center justify-start">
              {request.user?.firstName}
            </div>
            <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start text-start flex items-center justify-start">
              {request.startDate}
            </div>
            <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start text-start flex items-center justify-start">
              {request.endDate}
            </div>
            <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start">
              {request.leaveReason}
            </div>
            <div className="border px-4 py-2 text-start flex items-center justify-start text-start flex items-center justify-start">
              {request.leaveRequestStatus}
            </div>
            <div className="border w-[220px] px-4 py-2 flex space-x-2">
              <button
                className={`px-4 py-2  text-white rounded hover:bg-blue-600 w-full ${
                  request.leaveRequestStatus === "APPROVED"
                    ? "bg-blue-500 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                onClick={() => handleApprove(request.leaveId, "APPROVED")}
                disabled={request.leaveRequestStatus === "APPROVED"}>
                Approve
              </button>
              <button
                className={`px-4 py-2  text-white rounded hover:bg-red-600 w-full ${
                  request.leaveRequestStatus === "REJECTED"
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-red-500"
                }`}
                onClick={() => handleReject(request.leaveId, "REJECTED")}
                disabled={request.leaveRequestStatus === "REJECTED"}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function handleApprove(id: number, status: string) {
    // Logic to approve leave request
    alert(`Approved leave request with ID: ${id}`);
    approveLeaveRequest(id.toString(), status).then((value) => {
      console.log(value);
    });
  }

  function handleReject(id: number, status: string) {
    // Logic to reject leave request
    alert(`Rejected leave request with ID: ${id}`);
    approveLeaveRequest(id.toString(), status).then((value) => {
      console.log(value);
    });
  }
};

export default LeavesPage;
