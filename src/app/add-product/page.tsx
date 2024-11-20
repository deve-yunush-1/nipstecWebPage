/** @format */
"use client";
import React, {useEffect, useState} from "react";
export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [imageUri, setImageUri] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [syllabus, setSyllabus] = useState("");
  // const [error, setError] = React.useState('');
  // console.log({title,description, duration, imageUri, price, category,syllabus})

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
  const url = `https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/proxy/api/course/product`;
  useEffect(() => {});
  async function addProduct(url: string) {
    fetch(url, {
      method: "POST",
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
    <div className="w-full max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-500">Add New Course</h2>
        <p className="text-blue-400">Enter the course details below.</p>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* Course Name */}
        <div className="space-y-1">
          <label htmlFor="course-name" className="block text-blue-500">
            Course Name
          </label>
          <input
            id="course-name"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter course name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Course Description */}
        <div className="space-y-1">
          <label htmlFor="course-description" className="block text-blue-500">
            Course Description
          </label>
          <textarea
            id="course-description"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Course Syllabus */}
        <div className="space-y-1">
          <label htmlFor="course-syllabus" className="block text-blue-500">
            Course Syllabus
          </label>
          <textarea
            id="course-syllabus"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter course syllabus"
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
          />
        </div>

        {/* Course Price */}
        <div className="space-y-1">
          <label htmlFor="course-price" className="block text-blue-500">
            Course Price
          </label>
          <input
            id="course-price"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter course price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Course Duration */}
        <div className="space-y-1">
          <label htmlFor="course-duration" className="block text-blue-500">
            Course Duration (in hours)
          </label>
          <input
            id="course-duration"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter course duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        {/* Course Category */}
        <div className="space-y-1">
          <label htmlFor="course-category" className="block text-blue-500">
            Course Category
          </label>
          <select
            id="course-category"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* Course Image URL */}
        <div className="space-y-1">
          <label htmlFor="course-image" className="block text-blue-500">
            Course Image URL
          </label>
          <input
            id="course-image"
            type="url"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter course image URL"
            value={imageUri}
            onChange={(e) => setImageUri(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md disabled:bg-blue-300"
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
      </form>
    </div>
  );
}
