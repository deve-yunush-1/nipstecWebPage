/** @format */

"use client";
import {DB_URL} from "@/modal/db_url";
import React, {useEffect, useState, Suspense} from "react";

interface ProductFormProps {
  productId?: string | null; // Optional, will be provided if we are editing an existing product
  onSubmit: (product: any) => void; // Function to handle form submission
}

export default function ProductForm({productId, onSubmit}: ProductFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [imageUri, setImageUri] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId !== null && productId) {
      // Fetch the product data if productId is provided (edit mode)
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `${DB_URL()}/course/id?courseId=${productId}`
      );
      const data = await response.json();
      setIsLoading(false);
      // Populate the form fields with the fetched product details
      setTitle(data.title);
      setDescription(data.description);
      setDuration(data.duration);
      setImageUri(data.imageUri);
      setPrice(data.price);
      setCategory(data.category);
      setSyllabus(data.syllabus);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const product = {
      title,
      description,
      currency: "INR",
      price,
      duration,
      category,
      syllabus,
      imageUri,
    };

    // Call the onSubmit function to save the product (add or update)
    onSubmit(product);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5"
        onSubmit={handleFormSubmit}>
        {/* Course Name */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-blue-500 mb-2" htmlFor="courseName">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            value={title}
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
            value={category}
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
            value={description}
            placeholder="Enter course description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        {/* Course Syllabus */}
        <div className="col-span-2">
          <label className="block text-blue-500 mb-2" htmlFor="courseSyllabus">
            Course Syllabus
          </label>
          <textarea
            id="courseSyllabus"
            value={syllabus}
            placeholder="Enter course syllabus"
            onChange={(e) => setSyllabus(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        {/* Course Price */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-blue-500 mb-2" htmlFor="coursePrice">
            Course Price
          </label>
          <input
            type="number"
            id="coursePrice"
            value={price}
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
            value={duration}
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
            value={imageUri}
            placeholder="Enter course image URL"
            onChange={(e) => setImageUri(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
            {isLoading
              ? "Loading..."
              : productId !== null
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </form>
    </Suspense>
  );
}
