/** @format */

"use client";

import React, {Suspense, useState, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import SideNav from "../Navbar";
import ProductForm from "@/components/component/ProductForm";

const EditCoursePage = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams?.get("courseId"); // Access directly without state

  const [courses, setCourses] = useState<any[]>([]);
  const [err, setErr] = useState("");
  const [apiUrl, setApiUrl] = useState(
    "https://nipstec-alpha-service-fbeue3c0edgyarap.canadacentral-01.azurewebsites.net/api/"
  );

  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_DATABASE_URL as string);
  });

  const handleAddCourse = async (courseData: any) => {
    setCourses((prevCourses) => [...prevCourses, courseData]);

    await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/course/edit?productId=${courseId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(courseData),
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const {message} = await res.json();
        if (message === "success") {
          location.href = "/courses?category=computer";
        }
        setErr(message);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("Course added:", courseData);
  };

  if (!courseId) {
    return <div>Loading course information...</div>; // Fallback if courseId is missing
  }

  return (
    <div className="container">
      <SideNav />
      <div className="w-full max-h-lg mx-auto mt-10 pt-[150px] bg-white shadow-lg rounded-lg">
        <ProductForm onSubmit={handleAddCourse} productId={courseId} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">All Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index} className="py-2">
              <h3 className="font-medium">{course.title}</h3>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
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
