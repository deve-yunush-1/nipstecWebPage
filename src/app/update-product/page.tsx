/** @format */

"use client";
import React, {useEffect, useState} from "react";
import SideNav from "../Navbar"; // Assuming this is your sidebar component
import ProductForm from "@/components/component/ProductForm"; // Import the ProductForm component

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{courseId: string}>;
}) {
  // Remove async from the component and handle async logic inside useEffect
  const [courseId, setCourseId] = useState<string | null>(null); // State to store courseId
  const [courses, setCourses] = useState<any[]>([]); // State to store all courses
  const [err, setErr] = useState("");
  const [apiUrl, setApiUrl] = useState(
    "https://nipstec-alpha-service-fbeue3c0edgyarap.canadacentral-01.azurewebsites.net/api/"
  );
  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_DATABASE_URL as string);
    const fetchCourseId = async () => {
      const {courseId} = await searchParams;
      // Assuming `searchParams` is an object passed in the component
      setCourseId(courseId);
      console.log("Course", courseId);
    };

    fetchCourseId(); // Run the function to set the courseId
  }, [searchParams]); // Dependency array to only run once on component mount

  const handleAddCourse = async (courseData: any) => {
    setCourses((prevCourses) => [...prevCourses, courseData]);

    await fetch(`${apiUrl}/course/update?productId=${courseId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(courseData),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        let {message, object, status} = await res.json();
        if (message === "success") {
          location.href = "/courses?category=computer";
        }
        setErr(message);
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("Course added:", courseData);
  };

  return (
    <div className="container">
      <SideNav />
      <div className="w-full max-h-lg mx-auto mt-10 pt-[150px] bg-white shadow-lg rounded-lg">
        {/* Passing handleAddCourse as a prop to ProductForm */}
        <ProductForm onSubmit={handleAddCourse} productId={courseId} />
      </div>

      {/* Display all added courses */}
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
}
