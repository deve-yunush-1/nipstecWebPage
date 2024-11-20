/** @format */

"use client";

import React, {useEffect, useState} from "react";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data only after the component is mounted on the client side
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/course/",
          {
            method: "GET",
          }
        ); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // The empty dependency ensures this only runs once after the component mounts

  // If data is loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If an error occurs, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div>No products available</div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="relative flex flex-col items-center border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition">
              {/* Product Image */}
              <img
                src={product.imageUri}
                alt={product.title}
                className="h-40 w-full object-cover rounded-md"
              />

              {/* Product Title */}
              <p className="mt-4 text-lg font-bold text-gray-700">
                {product.title}
              </p>

              {/* Price */}
              <p className="mt-2 text-lg font-semibold text-gray-700">
                ₹{product.price}
              </p>

              {/* Enroll Button */}
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
