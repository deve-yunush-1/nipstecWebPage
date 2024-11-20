/** @format */

import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUri: string;
  description: string;
  syllabus: string;
  duration: number;
}

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/course/"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductsPage() {
  const products: Product[] = await fetchProducts();

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="product-list">
      <h1>Our Products</h1>
      {/* Action Buttons */}
      <div className="action-buttons">
        {/* Add Product Button */}
        <Link href="/add-product">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Add Product
          </button>
        </Link>

        {/* Update Product Button */}
        <Link href="/update-product">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 ml-4">
            Update Product
          </button>
        </Link>

        {/* Edit Product Button */}
        <Link href="/edit-product">
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 ml-4">
            Edit Product
          </button>
        </Link>

        {/* Delete Product Button */}
        <Link href="/delete-product">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-4">
            Delete Product
          </button>
        </Link>
      </div>
      <div className="product-list">
        {
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col items-center border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition">
                {/* Product Image */}
                <img
                  src={product.imageUri}
                  alt={product.title}
                  // width={100}
                  // height={100}
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
        }
      </div>
    </div>
  );
}
