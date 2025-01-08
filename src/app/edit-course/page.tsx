/** @format */

"use client";
import React, {Suspense, useState} from "react";
import {useSearchParams} from "next/navigation";
import SideNav from "../Navbar";
import ProductForm from "@/components/component/ProductForm";
import {DB_URL} from "@/modal/db_url";
import {SuccessModal} from "@/components/component/SuccessModal";

const EditCoursePage = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams?.get("courseId"); // Access directly without state
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [courses, setCourses] = useState<any[]>([]);
  const [err, setErr] = useState("");

  const handleAddCourse = async (courseData: any) => {
    setCourses((prevCourses) => [...prevCourses, courseData]);

    await fetch(`${DB_URL()}/course/edit?productId=${courseId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(courseData),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const {message} = await res.json();
        console.log(message);
        if (message === "success") {
          setIsSuccess(true);
          setMessage(message);
          location.href = "/courses?category=computer";
        }
        setErr(message);
      })
      .catch((err) => {
        if (err) setErr(err?.message);
      });
  };
  const handleCloseButton = () => {
    setIsSuccess(false);
  };

  if (!courseId) {
    return <div>Loading course information...</div>; // Fallback if courseId is missing
  }

  return (
    <div className="container">
      <SideNav />
      <SuccessModal
        isOpen={isSuccess}
        onClose={handleCloseButton}
        message={message}
        title={`Course Update successfully`}
      />
      <div className="w-full max-h-lg mx-auto mt-10 pt-[150px] bg-white shadow-lg rounded-lg">
        <ProductForm onSubmit={handleAddCourse} productId={courseId} />
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCoursePage />
    </Suspense>
  );
}
