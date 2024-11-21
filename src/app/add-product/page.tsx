/** @format */
"use client";
import React, {useEffect, useState} from "react";
import SideNav from "../sidenav";
export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [imageUri, setImageUri] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [syllabus, setSyllabus] = useState("");

  const courseDetails = {
    title,
    description,
    currency: "INR",
    price,
    duration,
    category,
    syllabus,
    imageUri,
  };
  const url = `https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/course/product`;
  useEffect(() => {});
  async function addProduct(url: string) {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(courseDetails),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Response " + response.json());
        location.reload();

        return response.json();
      })
      .then((data) => {
        console.log(data);

        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleFormSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();
    addProduct(url);

    // return router.push('/dashboard/products')
  };

  return (
    <div className="container">
      {" "}
      <SideNav />
      <div className="w-full max-h-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
        <Form />
      </div>
    </div>
  );
}

function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [imageUri, setImageUri] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const courseDetails = {
    title,
    description,
    currency: "INR",
    price,
    duration,
    category,
    syllabus,
    imageUri,
  };
  const url = `https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/course/product`;
  useEffect(() => {});
  async function addProduct(url: string) {
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(courseDetails),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Response " + response.json());
        location.reload();

        return response.json();
      })
      .then((data) => {
        console.log(data);

        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleFormSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();
    addProduct(url);

    // return router.push('/dashboard/products')
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Course</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleFormSubmit}>
        {/* Course Name */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-blue-500 mb-2" htmlFor="courseName">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            placeholder="Enter course name"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>
        {/* Course Category */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-blue-500 mb-2" htmlFor="courseCategory">
            Course Category
          </label>
          <select
            id="courseCategory"
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-[11px] focus:outline-blue-500">
            <option value="">Select Category</option>
            <option value="COMPUTER">Computer</option>
            <option value="ENGLISH">English</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>

        {/* Course Description */}
        <div className="col-span-2">
          <label
            className="block text-blue-500 mb-2"
            htmlFor="courseDescription">
            Course Description
          </label>
          <textarea
            id="courseDescription"
            placeholder="Enter course description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"></textarea>
        </div>

        {/* Course Syllabus */}
        <div className="col-span-2">
          <label className="block text-blue-500 mb-2" htmlFor="courseSyllabus">
            Course Syllabus
          </label>
          <textarea
            id="courseSyllabus"
            placeholder="Enter course syllabus"
            rows="4"
            onChange={(e) => setSyllabus(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"></textarea>
        </div>

        {/* Course Price */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-blue-500 mb-2" htmlFor="coursePrice">
            Course Price
          </label>
          <input
            type="number"
            id="coursePrice"
            placeholder="Enter course price"
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        {/* Course Duration */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-blue-500 mb-2" htmlFor="courseDuration">
            Course Duration (in hours)
          </label>
          <input
            type="number"
            id="courseDuration"
            placeholder="Enter course duration"
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        {/* Course Image URL */}
        <div className="col-span-2">
          <label className="block text-blue-500 mb-2" htmlFor="courseImage">
            Course Image URL
          </label>
          <input
            type="text"
            id="courseImage"
            placeholder="Enter course image URL"
            onChange={(e) => setImageUri(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            disabled={
              !title ||
              !description ||
              !syllabus ||
              !price ||
              !duration ||
              !category ||
              !imageUri
            }>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
