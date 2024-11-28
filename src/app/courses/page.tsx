/** @format */

import Link from "next/link";
import SideNav from "../Navbar";
import ProductsGrid from "@/components/component/ProductGrid";

const fetchProducts = async (category: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/course/category?c=${category}`,
    {cache: "no-store"} // Ensure fresh data
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

interface PageProps {
  searchParams: Promise<{category: string}>; // Fixed type
}

export default async function ProductsPage({searchParams}: PageProps) {
  // Extract category with a default fallback
  const {category} = (await searchParams) || "COMPUTER";
  const products = await fetchProducts(category.toUpperCase());

  return (
    <div className="p-6">
      <SideNav />
      <div className="flex justify-center space-x-4 mb-4">
        {/* Buttons to filter categories */}
        <Link href="/products?category=english">
          <button
            className={`py-2 px-4 text-2xl hover:text-blue-600 ${
              category.toLowerCase() === "english"
                ? "text-green-600"
                : "text-gray-600"
            }`}>
            English
          </button>
        </Link>
        <Link href="/products?category=computer">
          <button
            className={`py-2 px-4 text-2xl hover:text-blue-600 ${
              category.toLowerCase() === "computer"
                ? "text-green-600"
                : "text-gray-600"
            }`}>
            Computer
          </button>
        </Link>
        <Link href="/products?category=others">
          <button
            className={`py-2 px-4 text-2xl hover:text-blue-600 ${
              category.toLowerCase() === "others"
                ? "text-green-600"
                : "text-gray-600"
            }`}>
            Others
          </button>
        </Link>
      </div>
      <ProductsGrid products={products} />
    </div>
  );
}
