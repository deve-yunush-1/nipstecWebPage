/** @format */

"use client";
import {User} from "@/modal/User";
import React, {Suspense, useEffect, useState} from "react";
import SideNav from "../Navbar";
import Link from "next/link";
import {DB_URL} from "@/modal/db_url";
import {UserTable} from "@/components/component/UserTableCompo";
import {useSearchParams} from "next/navigation";
import Loading from "@/components/component/loading";

// Function to fetch students by status
const fetchStudents = async (status: string): Promise<User[]> => {
  const response = await fetch(`${DB_URL()}/user/status?s=${status}`, {
    next: {revalidate: 10}, // Optional: revalidate data on the server after 10 seconds
    cache: "default",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
};

function UserComponent() {
  const searchParams = useSearchParams();
  const studentStatus = searchParams?.get("studentStatus") || "COMPUTER"; // Default category if none provided

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);

  // Fetch users based on the student status
  const fetchUser = async () => {
    setLoading(true); // Show loading state
    try {
      const data = await fetchStudents(studentStatus.toUpperCase());
      setUsers(data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Stop loading after fetch completes
    }
  };

  // Effect to fetch data whenever the studentStatus changes
  useEffect(() => {
    fetchUser(); // Fetch user data when studentStatus changes
  }, [studentStatus]); // Only re-run when studentStatus changes

  return (
    <div className="">
      {/* Sidebar */}
      <header>
        <SideNav />
      </header>

      {/* Main Content */}
      <main className="flex-1 min-w-screen bg-gray-100">
        <section className="mb-6 container mx-auto p-4">
          <div className="flex justify-between">
            <div className="flex space-x-4 bg-gray-200 p-2 rounded-lg">
              {/* Links to filter by studentStatus */}
              <Link
                href="/students?studentStatus=complete"
                className={` rounded-lg ${
                  studentStatus === "complete" ? "bg-white" : "bg-gray-200"
                }`}>
                <button
                  className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${getStatusClass(
                    studentStatus == "complete" ? "COMPLETE" : ""
                  )}`}>
                  Registered
                </button>
              </Link>

              <Link
                href="/students?studentStatus=incomplete"
                className={` rounded-lg ${
                  studentStatus === "incomplete" ? "bg-white" : "bg-gray-200"
                }`}>
                <button
                  className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${getStatusClass(
                    studentStatus == "incomplete" ? "INCOMPLETE" : ""
                  )}`}>
                  Submitted
                </button>
              </Link>

              <Link
                href="/students?studentStatus=enquiry"
                className={` rounded-lg ${
                  studentStatus === "enquiry" ? "bg-white" : "bg-gray-200"
                }`}>
                <button
                  className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${getStatusClass(
                    studentStatus == "enquiry" ? "ENQUIRY" : ""
                  )}`}>
                  Enquiry
                </button>
              </Link>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 h-12 rounded-lg text-white mt-2"
              onClick={fetchUser}>
              Refresh
            </button>
          </div>
        </section>

        {/* Loading or User Table */}
        {loading ? (
          <div>
            <div className="flex justify-center items-center max-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        ) : users.length > 0 ? (
          <UserTable users={users} title={studentStatus} />
        ) : (
          <div>Not Available any Submitted students</div>
        )}
      </main>
    </div>
  );
}

// Function to determine the status class for button
function getStatusClass(status: string) {
  switch (status) {
    case "COMPLETE":
      return "text-green-600 font-semibold";
    case "INCOMPLETE":
      return "text-yellow-600 font-semibold";
    case "ENQUIRY":
      return "text-red-600 font-semibold";
    default:
      return "";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "COMPLETE":
      return "Registered";
    case "INCOMPLETE":
      return "Submitted";
    case "ENQUIRY":
      return "Enquiry";
    default:
      return "Unknown";
  }
}

export default function Page() {
  return (
    <Suspense>
      <UserComponent />
    </Suspense>
  );
}
