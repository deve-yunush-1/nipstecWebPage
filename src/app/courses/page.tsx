/** @format */

"use client";
import Link from "next/link";
import SideNav from "../Navbar";
import ProductsGrid from "@/components/component/ProductGrid";
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {Product} from "@/modal/Product";
import {DB_URL} from "@/modal/db_url";

// Fetch products from the server
const fetchProducts = async (category: string) => {
  const response = await fetch(
    `${DB_URL()}/course/category?c=${category}`,
    {cache: "default"} // Ensure fresh data
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "COMPUTER"; // Default category

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch products based on category
  const fetchProduct = async () => {
    setLoading(true); // Set loading to true when fetching
    try {
      const data: Product[] = await fetchProducts(category.toUpperCase());
      setProducts(data); // Update state with fetched products
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Effect to fetch products only when the category changes
  useEffect(() => {
    fetchProduct();
  }, [category]); // Dependency on category ensures the effect runs when category changes

  return (
    <div className="mt-40 mb-10">
      <SideNav />
      <div className="flex justify-between">
        <div className="flex justify-center space-x-4 mb-4 rounded-lg bg-gray-200 p-2">
          {/* Category filter buttons */}
          <Link
            href="/courses?category=english"
            className={`rounded-lg ${
              category.toLowerCase() === "english"
                ? "text-green-600 bg-white"
                : "text-gray-600"
            }`}>
            <button
              className={`py-2 px-4 font-bold text-2xl hover:text-blue-600 ${
                category.toLowerCase() === "english"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}>
              English
            </button>
          </Link>
          <Link
            href="/courses?category=computer"
            className={` rounded-lg ${
              category.toLowerCase() === "computer"
                ? "text-green-600 bg-white"
                : "text-gray-600"
            }`}>
            <button
              className={`py-2 px-4 font-bold text-2xl hover:text-blue-600 ${
                category.toLowerCase() === "computer"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}>
              Computer
            </button>
          </Link>
          <Link
            href="/courses?category=others"
            className={` rounded-lg  ${
              category.toLowerCase() === "others"
                ? "text-green-600 bg-white"
                : "text-gray-600"
            }`}>
            <button
              className={`py-2 px-4 font-bold text-2xl hover:text-blue-600 ${
                category.toLowerCase() === "others"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}>
              Others
            </button>
          </Link>
        </div>
        <button
          onClick={fetchProduct}
          className="bg-blue-500 text-white px-4 py-2 h-10 justify-center flex rounded-lg hover:bg-blue-600">
          Refresh
        </button>
      </div>
      {loading ? (
        <div>
          {" "}
          <div className="flex justify-center items-center max-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div> // Show loading while fetching data
      ) : (
        <ProductsGrid products={products} /> // Show products once they are loaded
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  );
}
