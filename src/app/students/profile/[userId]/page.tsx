/** @format */
"use client";
import SideNav from "@/app/Navbar";
import {DB_URL} from "@/modal/db_url";
import {Identity, UserAddress} from "@/modal/User";
import React, {Suspense, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Loading from "@/components/component/loading";
import Image from "next/image";
import {CourseTitle} from "@/components/component/ProductGrid";
import {CapitalizeFirstLetter} from "@/components/ui/CapitaliseText";
import {DbEnrollment} from "@/modal/Installment";
import {userDataById} from "@/service/userByuserId";

// This is the main page component that is SSR
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  status: string;
  registration_number: string;
  qualification: string;
  password: string;
  identification: Identity;
  address: UserAddress;
  createdAt: string;
  approvedAt: string;
  updatedAt: string;
}
function UserProfile() {
  // Wait for params to resolve
  const params = useParams();
  const userId = params?.userId; // Await params before accessing userId
  const [enrolled, setEnrolled] = useState([]);
  const [user, setUser] = useState<User>({});

  // Fetch user data from your backend API

  // If user data is fetched, update the component state
  useEffect(() => {
    const enroll = async () => {
      userDataById(userId).then((data: User) => {
        setUser(data);

        setEnrolled(enrolled);
      });

      const enroll = await fetchStudentData(user.id);

      setEnrolled(enroll);
    };
    enroll();
  });

  // Function to get the status class based on user status
  const getStatusClass = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return "text-green-500 bg-green-100";
      case "INCOMPLETE":
        return "text-yellow-500 bg-yellow-100";
      case "ENQUIRY":
        return "text-red-500 bg-red-100 px-4";
      case "REJECTED":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500";
    }
  };

  // Function to format null/undefined data
  const formatData = (value: string | null) =>
    value ? value : "Not Available";

  return (
    <div className="  bg-gray-50">
      {/* Sidebar Placeholder (If applicable) */}
      <SideNav />
      <main className="flex-1  mt-[130px] overflow-auto">
        {/* Profile Card */}
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg">
          <div className="border-b p-4">
            <h2 className="text-3xl font-bold text-gray-800">
              <CapitalizeFirstLetter
                text={user.firstName + " " + user.lastName}
              />
            </h2>
            <p
              className={`mt-2 p-2 inline-block rounded-lg ${getStatusClass(
                user.status
              )}`}>
              {user.status}
            </p>
          </div>

          {/* User Data */}
          <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span className="text-gray-700">
                  <CapitalizeFirstLetter
                    text={user.firstName + " " + user.lastName}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span className="text-gray-700">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span className="text-gray-700">{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date of Birth:</span>
                <span className="text-gray-700">{user.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Gender:</span>
                <span className="text-gray-700">{user.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Qualification:</span>
                <span className="text-gray-700">{user.qualification}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Registration:</span>
                <span className="text-gray-700">
                  {user.registration_number}
                </span>
              </div>
            </div>

            {/* Identity & Address Section */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Identity Card:</span>
                <span className="text-gray-700">
                  {formatData(user.identification?.identityCard)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Identity Number:</span>
                <span className="text-gray-700">
                  {formatData(user.identification?.number)}
                </span>
              </div>

              {/* Address Information */}
              <div className="space-y-2 mt-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Address Information
                </h3>
                {(["currentAddress", "permanentAddress"] as AddressType[]).map(
                  (addressType) => (
                    <div key={addressType}>
                      <h4 className="text-lg font-semibold">
                        {addressType.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </h4>
                      <div className="p-2 grid gap-2 border rounded-lg">
                        {(
                          [
                            "address",
                            "pincode",
                            "city",
                            "state",
                            "country",
                            "nationality",
                          ] as AddressField[]
                        ).map((field) => (
                          <div key={field} className="flex justify-between">
                            <span className="font-medium">
                              {field.charAt(0).toUpperCase() + field.slice(1)}:
                            </span>
                            <span>
                              {user.address?.[addressType]?.[field] ||
                                "Not Available"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <span className="text-4xl font-bold text-underline text-blue-500 right">
              Enrolle Course
            </span>
            <div className="">
              <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-3 max-sm:grid-cols-1 sm:grid-cols-1 sm:grid-center gap-6">
                {enrolled.length > 0 ? (
                  enrolled.map((enroll: DbEnrollment) => (
                    <div className="relative flex flex-col items-left border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition">
                      <div className="border-2 border-blue-300 rounded-md">
                        <Image
                          src={enroll.product.imageUri} // 1920 x 1080
                          alt={enroll.product.title}
                          width={200}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="https://placehold.co/1920x1080"
                          height={200}
                          className="h-40 w-full flex justify-center rounded-md"
                        />
                      </div>

                      <CourseTitle
                        title={enroll.product.title}
                        className={`mt-2 h-50`}
                      />

                      <div className="mt-3 bottom-4 flex justify-between w-full">
                        <p className="text-md font-bold text-gray-700">
                          ₹ {enroll.product.price}
                        </p>
                        <p className="text-md font-bold text-gray-700">
                          Duration: {enroll.product.duration} hr.
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No course available in this category</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
type AddressType = "currentAddress" | "permanentAddress"; // Define possible address keys
type AddressField =
  | "address"
  | "pinCode"
  | "city"
  | "state"
  | "country"
  | "nationality"; // Define possible fields within each address

interface AddressDetails {
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
  nationality?: string;
}

async function fetchStudentData(studentId: string) {
  try {
    const res = await fetch(
      `${DB_URL()}/user/purchase/userid?userId=${studentId}`
    );
    if (!res.ok) throw new Error("Failed to fetch student data.");

    return await res.json();
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
}

// Helper function to capitalize the first letter of each word

export default function Page() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }>
      <UserProfile />
    </Suspense>
  );
}
