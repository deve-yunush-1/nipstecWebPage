/** @format */

// app/products/ProductsGrid.tsx
"use client";

import {useState} from "react";
import Image from "next/image";
import ActionButtons from "@/components/component/ActionButtons";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUri: string;
  duration: number;
}

export default function ProductsGrid({products}: {products: Product[]}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Handle checkbox change
  const handleCheckboxChange = (productId: string) => {
    const updatedSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelectedProducts);
  };

  // Handle delete selected products
  const handleDeleteSelected = () => {
    // Call your delete API here and refresh the list of products after deletion
    console.log("Deleting products:", selectedProducts);
    setSelectedProducts([]); // Reset selected products
  };

  return (
    <div>
      {/* Action Buttons */}
      <ActionButtons
        selectedProductIds={selectedProducts}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Product Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col items-left border border-gray-300 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 transition">
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id={`product-${product.id}`}
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                  className="mr-2 w-5 h-5 mb-2"
                />
                {/* <label
                  htmlFor={`product-${product.id}`}
                  className="text-gray-700">
                  Select
                </label> */}
              </div>
              <Image
                src={product.imageUri}
                alt={product.title}
                width={200}
                height={200}
                className="h-40 w-full object-cover rounded-md"
              />
              <p className="mt-4 text-lg font-bold text-gray-700">
                {product.title}
              </p>
              <div className="flex justify-between w-full">
                <p className="text-lg font-bold text-gray-700">
                  ₹ {product.price}
                </p>
                <p className="text-lg font-bold text-gray-700">
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
