/** @format */
"use client";
import SideNav from "@/app/Navbar";
import {DB_URL} from "@/modal/db_url";
import {Identity, UserAddress} from "@/modal/User";
import React, {Suspense, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Loading from "@/components/component/loading";
import Image from "next/image";
import {CourseTitle, SelectItem} from "@/components/component/ProductGrid";
import {CapitalizeFirstLetter} from "@/components/ui/CapitaliseText";
import {DbEnrollment} from "@/modal/Installment";
import {userDataById} from "@/service/userByuserId";
import {ShimmerLoader} from "@/components/component/SimmerLoader";
import {UploadCertificate} from "@/components/component/UploadCertificate";
import {CertificatesModal} from "@/components/component/CertificatesModal";

// This is the main page component that is SSR
interface User {
  profileUrl: string;
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
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    status: "",
    profileUrl: "",
    registration_number: "",
    qualification: "",
    password: "",
    identification: {
      number: "",
      identityCard: "",
    },
    address: {
      currentAddress: {
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        nationality: "",
      },
      permanentAddress: {
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        nationality: "",
      },
    },
    createdAt: "",
    approvedAt: "",
    updatedAt: "",
  });
  const [userID, setUserID] = useState("");
  const [productId, setProductID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data from your backend API

  // If user data is fetched, update the component state
  useEffect(() => {
    if (!userId) {
      console.warn("userId is undefined or missing.");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userData = await userDataById(userId);

        setUser(userData);

        const enrollmentData = await fetchStudentData(userData.id);

        setEnrolled(enrollmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = (e: any) => {
    setIsOpen(false);
  };

  const onUpload = (e: any) => {
    setIsOpen(false);
  };
  const handleModelView = (enrollment: DbEnrollment) => {
    // Your logic here
    setUserID(enrollment.user.id);
    setProductID(enrollment.product.id);
    setIsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!userId || !user.id) {
    return <div className="text-center">User data is not available.</div>;
  }

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
  const formatData = (value: string | null) => (value ? value : "Loading...");

  return (
    <div className="  bg-gray-50">
      {/* Sidebar Placeholder (If applicable) */}
      <SideNav />
      <main className="flex-1  mt-[130px] overflow-auto">
        {/* Profile Card */}
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg">
          <div className="border-b p-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  <CapitalizeFirstLetter
                    text={user.firstName + " " + user.lastName}
                  />{" "}
                </h2>
                <p
                  className={`mt-2 p-2 inline-block rounded-lg ${getStatusClass(
                    user.status
                  )}`}>
                  {user.status}
                </p>
              </div>
              <SetUserImage imagePath={user.profileUrl} />
            </div>
          </div>

          <UploadCertificate
            isOpen={isOpen}
            onClose={onClose}
            onUpload={onUpload}
            userId={userID}
            productId={productId}
          />
          {/* User Data */}
          <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
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
              {/* <CertificatesModal /> */}
            </div>

            {/* Identity & Address Section */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Identity Card:</span>
                <span className="text-gray-700">
                  {formatData(user.identification?.identityCard!)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Identity Number:</span>
                <span className="text-gray-700">
                  {formatData(user.identification?.number!)}
                </span>
              </div>

              {/* Address Information */}
              <div className="space-y-2 mt-4">
                <h3 className="text-xl text-blue-500 font-semibold ">
                  Address Information
                </h3>
                {(["currentAddress", "permanentAddress"] as AddressType[]).map(
                  (addressType) => (
                    <div key={addressType}>
                      <h4 className="text-blue-500 text-lg font-semibold">
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
          </div>
          <div className="text-center">
            <h1 className="text-4xl mt-4 font-bold text-blue-500">
              Enrolle Course
            </h1>
            <div className="mt-4 mx-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
              {isLoading ? (
                <Loading />
              ) : enrolled.length > 0 ? (
                enrolled.map((enroll: DbEnrollment, index: number) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-start border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition">
                    {/* <SelectItem
                      handleCheckboxChange={handleCheckboxChange}
                      selectedProducts={selectedProducts}
                      product={enroll.product}
                    /> */}
                    <div className="w-full flex justify-center mb-2">
                      <button
                        onClick={() => handleModelView(enroll)}
                        className="bg-blue-500 rounded-lg text-white hover:bg-blue-600 px-8 py-2 ">
                        Upload
                      </button>
                    </div>
                    <div className="border-2 w-full border-blue-300 flex justify-center rounded-md">
                      <Image
                        src={enroll.product.imageUri} // 1920 x 1080
                        alt={enroll.product.title || "Course title"}
                        width={400}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="https://placehold.co/1920x1080"
                        height={200}
                        className="h-40 w-full  rounded-md"
                      />
                    </div>
                    <CourseTitle
                      title={enroll.product.title}
                      className="mt-2"
                    />
                    <div className="mt-3 flex justify-between w-full">
                      <p className="text-md font-bold text-gray-700">
                        ₹ {enroll.totalFee}
                      </p>
                      <p className="text-md font-bold text-gray-700">
                        Duration: {enroll.product.duration} hr.
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <ShimmerLoader />
              )}
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

function SetUserImage({imagePath}: {imagePath: string}) {
  const [path, setPath] = useState("");
  useEffect(() => {
    const callImagePath = async (imagePath: string) => {
      const {url, status} = await (
        await fetch(`${DB_URL()}/files/${imagePath}`, {
          method: "GET",
        })
      ).json();
      // setPath(response);
      setPath(url);
    };
    callImagePath(imagePath);
  }, [imagePath]);
  return (
    <>
      <div className="rounded-lg border-blue-500 border-2">
        <img
          src={path}
          alt="Profile Image"
          className="rounded-lg shadow-lg"
          width={100}
          height={100}
        />
      </div>
    </>
  );
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
