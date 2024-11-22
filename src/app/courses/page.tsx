/** @format */

// app/products/page.tsx
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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{category: string}>;
}) {
  const {category} = (await searchParams) || "COMPUTER"; // Default category
  console.log(category);
  const products = await fetchProducts(category.toUpperCase());
  const handleCheckboxChange = (id: string[]) => {
    // Handle checkbox change event
    console.log(id);
  };

  return (
    <div className="p-6">
      <SideNav />
      <div className="flex pt-[100px] flex-wrap justify-between gap-4 mb-4 md:flex-nowrap px-8"></div>
      <div className="flex justify-center space-x-4 mb-4">
        <Link href="/courses?category=english">
          <button
            className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${
              category.toLowerCase() === "english"
                ? "text-green-600"
                : "text-gray-600"
            }`}>
            English
          </button>
        </Link>
        <Link href="/courses?category=computer">
          <button
            className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${
              category.toLowerCase() === "computer"
                ? "text-green-600"
                : "text-gray-600"
            }`}>
            Computer
          </button>
        </Link>
        <Link href="/courses?category=others">
          <button
            className={`py-2 px-4 text-2xl text-gray-900 hover:text-blue-600 focus:outline-none ${
              category.toLowerCase() === "others"
                ? "text-green-600"
                : "text-gray-600"
            }`}>
            Others
          </button>
        </Link>
      </div>

      {/* Pass server-fetched products to the client-side component */}
      <ProductsGrid products={products} />
    </div>
  );
}
