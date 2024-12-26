/** @format */
"use client";
import {useCallback, useState} from "react";
import Image from "next/image";
import {ActionButtons} from "@/components/component/ActionButtons";
import SearchBar from "./SearchBarComponet";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUri: string;
  duration: number;
}

export default function ProductsGrid({products}: {products: Product[]}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Handle checkbox change
  const handleCheckboxChange = useCallback((productId: string) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelectedProducts);
  }, []);

  // Handle delete selected products
  const handleDeleteSelected = () => {
    // Call your delete API here and refresh the list of products after deletion
    setSelectedProducts([]); // Reset selected products
  };

  const updateFilteredProducts = (filteredItems: Product[]) => {
    setFilteredProducts(filteredItems);
  };
  const filterProductsByTitle = (
    products: Product[],
    searchTerm: string
  ): Product[] => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const redirect_new_page = (title: string) => {
    window.open(
      `https://www.nipstec.com/malviya-nagar/${title
        .trim()
        .split(" ")
        .join("-")
        .toLowerCase()}/`,
      "_blank"
    );
  };

  return (
    <div>
      {/* Action Buttons */}
      <ActionButtons
        selectedProductIds={selectedProducts}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Search Bar */}
      <SearchBar
        items={products}
        filterFunction={filterProductsByTitle}
        onFilterChange={updateFilteredProducts}
        placeholder="Search for courses..."
      />
      {/* Product Grid */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-2 sm:grid-cols-2 sm:grid-center gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col items-left border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition">
              <SelectItem
                handleCheckboxChange={handleCheckboxChange}
                selectedProducts={selectedProducts}
                product={product}
              />

              <div className="border-2 border-blue-300 rounded-md">
                <Image
                  src={product.imageUri} // 1920 x 1080
                  alt={product.title}
                  width={200}
                  onClick={() => redirect_new_page(product.title)}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="https://placehold.co/1920x1080"
                  height={200}
                  className="h-40 w-full flex justify-center rounded-md"
                />
              </div>

              <CourseTitle title={product.title} className={`mt-2 h-50`} />

              <div className="mt-3 bottom-4 flex justify-between w-full">
                <p className="text-md font-bold text-gray-700">
                  ₹ {product.price}
                </p>
                <p className="text-md font-bold text-gray-700">
                  Duration: {product.duration} hr.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No course available in this category</div>
        )}
      </div>
    </div>
  );
}

export const CourseTitle = ({
  title,
  className = "text-md",
}: {
  title: string;
  className: any;
}) => (
  <div
    className={`truncate-two-lines text-md text-gray-800 h-10 font-bold md:whitespace-normal wrap-text ${className}`}
    title={title.length < 40 ? title : ""}>
    {title}
  </div>
);

const SelectItem = ({
  selectedProducts,
  product,
  handleCheckboxChange,
}: {
  selectedProducts: any;
  product: any;
  handleCheckboxChange: any;
}) => {
  return (
    <div className="flex items-center mt-4">
      <input
        type="checkbox"
        id={`product-${product.id!}`}
        checked={selectedProducts.includes(product.id!)}
        onChange={() => handleCheckboxChange(product.id!)}
        className="mr-2 w-5 h-5 mb-2"
      />
      {/* <label
                  htmlFor={`product-${product.id}`}
                  className="text-gray-700">
                  Select
                </label> */}
    </div>
  );
};
