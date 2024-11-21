/** @format */

// app/products/page.tsx

import Image from "next/image";
import Link from "next/link";
import SideNav from "../sidenav";

// Define Product Type

// Fetching products server-side for SSR in App Router
const fetchProducts = async (category: string): Promise<Product[]> => {
  const response = await fetch(
    `https://spring-boot-dev-app-nipstec-h4gpf9e4fjfebta4.australiacentral-01.azurewebsites.net/api/course/category?c=${category}`,
    {
      next: {revalidate: 10}, // Optional: revalidate data on the server after 10 seconds
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// Page Component: Server Component
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{category: string}>; // Await searchParams here
}) {
  // Default category if none provided
  const params = await searchParams;
  const category = params.category || "COMPUTER"; // Default category if none provided
  const products = await fetchProducts(category.toUpperCase()); // Fetch data server-side

  return (
    <div className="p-6">
      <SideNav />
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between gap-4 mb-4 md:flex-nowrap">
        <Link href="/add-product">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full md:w-auto">
            Add New Product
          </button>
        </Link>
        <Link href="/update-product">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full md:w-auto">
            Update Product
          </button>
        </Link>
        <Link href="/edit-product">
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 w-full md:w-auto">
            Edit Product
          </button>
        </Link>
        <Link href="/delete-product">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full md:w-auto">
            Delete Product
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        <Link href="/courses?category=english">
          <button
            className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${
              category === "english" ? "text-green-600" : "text-gray-600"
            }`}>
            English
          </button>
        </Link>
        <Link href="/courses?category=computer">
          <button
            className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${
              category === "computer" ? "text-green-600" : "text-gray-600"
            }`}>
            Computer
          </button>
        </Link>
        <Link href="/courses?category=others">
          <button
            className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${
              category === "others" ? "text-green-600" : "text-gray-600"
            }`}>
            Others
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <div
              key={product.id}
              className="relative flex flex-col items-center border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition">
              {/* Product Image */}
              <Image
                src={product.imageUri}
                alt={product.title}
                width={200}
                height={200}
                className="h-40 w-full object-cover rounded-md"
              />

              {/* Product Title */}
              <p className="mt-4 text-lg font-bold text-gray-700">
                {product.title}
              </p>

              {/* Product Price */}
              <div className="flex justify-between w-full">
                <p className="text-lg font-bold text-gray-700">
                  ₹{product.price}
                </p>
                <p className="text-lg font-bold text-gray-700">
                  {"⏱"}
                  {product.duration}
                </p>
              </div>

              {/* Enroll Button */}
              <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Enroll
              </button>
            </div>
          ))
        ) : (
          <div className="w-full">No products available in this category</div>
        )}
      </div>
    </div>
  );
}
