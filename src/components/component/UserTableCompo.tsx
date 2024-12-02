/** @format */
"client side";
import React, {useState} from "react";
import Link from "next/link";
import ApproveModal from "./Approvel";
import {User} from "@/modal/User";
import SearchBar from "./SearchBarComponet";

export const UserTable = ({users, title}: {users: User[]; title: string}) => {
  console.log("User table, ", title);
  const [filteredProducts, setFilteredProducts] = useState<User[]>(users);
  const updateFilteredProducts = (filteredItems: User[]) => {
    setFilteredProducts(filteredItems);
  };
  const filterProductsByTitle = (users: User[], searchTerm: string): User[] => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  return (
    <section className="mb-6">
      <h2
        className={`text-lg font-bold m-4 ${getStatusClass(
          title.toUpperCase()
        )}`}>
        New {getStatusText(title.toUpperCase())}
      </h2>

      <div className="m-4">
        <SearchBar
          items={users}
          filterFunction={filterProductsByTitle}
          onFilterChange={updateFilteredProducts}
          placeholder="Search for courses..."
        />
      </div>

      <div className="overflow-x-auto h-80">
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
            {filteredProducts.length > 0
              ? filteredProducts.map((user: User) => (
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
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      {user.status === "INCOMPLETE" && (
                        // <Link
                        //   href={`https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/user/update/status?userId=${user.id}`}
                        //   className="px-4 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
                        //   Approve
                        // </Link>
                        <ApproveModal studentId={user.id} />
                      )}
                    </td>
                    {user.status.toLocaleLowerCase() !== "enquiry" ? (
                      <td>
                        <Link href={`/payment?studentid=${user.id}`}>
                          <button className="px-3 py-1 gap-2 bg-green-500 rounded-md hover:bg-green:600 text-white">
                            Payment
                          </button>
                        </Link>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </section>
  );
};

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
