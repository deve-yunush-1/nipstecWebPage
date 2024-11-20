/** @format */
"use client";
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";

// This function will run on the server side before the page is rendered.

export default async function Page() {
  const [activePopover, setActivePopover] = useState(null);
  const [category, setCategory] = useState("COMPUTER");
  const handleFormCategory = (value: any) => {
    console.log("Category ", category);
  };
  const res = await fetch(
    `https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/course/category?c=${category}`
  );
  const data = await res.json();
  return (
    <div>
      <div className="flex ml-10 mt-3 mr-10 h-[50px]">
        <Link href={"/add-product"}>
          <button className="bg-gray-100 h-[50px] w-[200px] text-blue-500 hover:bg-blue-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4">
            Add New Product
          </button>
        </Link>

        <Link href={`/dashboard/products/addproduct/success`}>
          <button
            type="button"
            className="text-white h-[50px] w-[200px] ml-5 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Update Product
          </button>
        </Link>

        <h1 className="m-auto inline-block align-baseline text-3xl text-blue-500 mb-4 justify-center">
          Our Products
        </h1>

        <Link href={`/dashboard/products/update`}>
          <button
            type="button"
            className="h-[50px] w-[200px] focus:outline-none text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900">
            Edit Course
          </button>
        </Link>

        <button
          type="button"
          className="h-[50px] w-[200px] focus:outline-none text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Delete
        </button>
      </div>

      <div className="tabs-container justify-center w-70">
        <div className="flex space-x-4 border-b">
          <button
            className="py-2 px-4 text-sm text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={(e) => handleFormCategory("ENGLISH")}>
            English
          </button>
          <button
            className="py-2 px-4 text-sm text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={(e) => handleFormCategory("COMPUTER")}>
            Computer
          </button>
          <button
            className="py-2 px-4 text-sm text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={(e) => handleFormCategory("OTHERS")}>
            Others
          </button>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-6">
          {data.map((product: any, index: any) => (
            <div
              key={product.id}
              className="relative flex flex-col items-center border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition"
              onMouseEnter={() => setActivePopover(index)}
              onMouseLeave={() => setActivePopover(null)}>
              {/* Product Image */}
              <img
                src={product.imageUri}
                alt={product.title}
                className="h-40 w-full object-fit rounded-md"
              />

              {/* Price */}
              <p className="mt-4 text-lg font-bold text-gray-700">
                ₹{product.price}
              </p>

              {/* Enroll Button */}
              <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Enroll
              </button>

              {/* Popover */}
              {activePopover === index && (
                <div className="absolute top-0 left-0 w-full h-full z-10 bg-white shadow-lg rounded-lg p-4 overflow-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Description: </span>
                    {product.description}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Syllabus: </span>
                    {product.syllabus}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Duration: </span>
                    {product.duration} hours
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
