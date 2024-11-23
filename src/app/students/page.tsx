/** @format */

import {User} from "@/modal/User";
import React, {use} from "react";
import SideNav from "../Navbar";
import Link from "next/link";

// Fetch Data on Server Side

const fetchStudents = async (status: string): Promise<User[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}user/status?s=${status}`,
    {
      next: {revalidate: 10}, // Optional: revalidate data on the server after 10 seconds
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{studentStatus: string}>;
}) {
  const params = await searchParams;
  const studentStatus = params.studentStatus || "COMPUTER"; // Default category if none provided
  const users = await fetchStudents(studentStatus.toUpperCase()); // Fetch data server-side
  return (
    <div className=" ">
      {/* Sidebar */}
      <header>
        {" "}
        <SideNav />
      </header>

      {/* Main Content */}
      <main className="pt-[150px] flex-1 min-w-screen bg-gray-100">
        <section className="mb-6 container mx-auto p-4">
          <div className="flex space-x-4">
            <Link href="/students?studentStatus=complete">
              <button
                className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${getStatusClass(
                  studentStatus == "complete" ? "COMPLETE" : ""
                )}`}>
                Registered
              </button>
            </Link>

            <Link href="/students?studentStatus=incomplete">
              <button
                className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${getStatusClass(
                  studentStatus == "incomplete" ? "INCOMPLETE" : ""
                )}`}>
                Submitted
              </button>
            </Link>
            <Link href="/students?studentStatus=enquiry">
              <button
                className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${getStatusClass(
                  studentStatus == "enquiry" ? "ENQUIRY" : ""
                )}`}>
                Enquiry
              </button>
            </Link>
          </div>
        </section>
        <UserTable users={users} title={studentStatus} />
      </main>
    </div>
  );
}

// Table Component
function UserTable({users, title}: {users: User[]; title: string}) {
  const filteredUsers = users;

  return (
    <section className="mb-6">
      <h2
        className={`text-lg font-bold mb-4 ${getStatusClass(
          title.toUpperCase()
        )}`}>
        New {getStatusText(title.toUpperCase())}
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Registration Number</th>
              <th className="px-4 py-2">
                {title === "enquiry"
                  ? "Registration Date"
                  : title === "incomplete"
                  ? "Updation Date"
                  : title === "complete"
                  ? "Approved Date"
                  : ""}
              </th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: User) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.registrationNumber}</td>
                <td className="px-4 py-2">
                  {formatDate(
                    title === "complete"
                      ? user.approvedAt
                      : title === "incomplete"
                      ? user.updatedAt
                      : title === "enquiry"
                      ? user.createdAt
                      : ""
                  )}
                </td>
                <td className={`px-4 py-2 ${getStatusClass(user.status)}`}>
                  {getStatusText(user.status)}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <a
                    href={`/students/profile/${user.id}`}
                    className="px-4 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    View
                  </a>
                  {user.status === "INCOMPLETE" && (
                    <a
                      href={`https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/user/update/status?userId=${user.id}`}
                      className="px-4 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
                      Approve
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// Utility Functions
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

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
