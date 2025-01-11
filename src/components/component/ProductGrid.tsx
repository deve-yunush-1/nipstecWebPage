/** @format */
"use client";
import {useCallback, useState} from "react";
import Image from "next/image";
import {ActionButtons} from "@/components/component/ActionButtons";
import SearchBar from "./SearchBarComponet";
import {DB_URL} from "@/modal/db_url";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUri: string;
  duration: number;
  webPageUrl: string;
}

export default function ProductsGrid({products}: {products: Product[]}) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

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
    if (!title || title.trim() === "") {
      alert("Invalid title: cannot redirect to an empty or undefined URL.");
      return;
    }
    window.open(`${title}/`, "_blank");
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
          filteredProducts.map((product: Product) => (
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
                  onClick={() => redirect_new_page(product.webPageUrl)}
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

export const SelectItem = ({
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
    </div>
  );
};

const DeleteProductModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: any;
  onClose: any;
  onDelete: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          Are you sure you want to delete the selected products?
        </h2>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const DeleteSelectedProducts = ({courseId}: {courseId: any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([
    /* List of selected products */
  ]);

  // Function to open modal
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to delete selected products
  const handleDelete = async () => {
    try {
      // Make the API call to delete the products
      const response = await fetch(
        `${DB_URL()}/course/delete?courseId=${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({products: selectedProducts}), // Passing selected products in request body
        }
      );

      if (response.ok) {
        // On success, close modal and handle successful deletion
        alert("Products deleted successfully");
        setIsModalOpen(false);
        setSelectedProducts([]); // Optionally, clear the selection
      } else {
        alert("Error deleting products");
      }

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting products");
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 w-full md:w-auto">
        Delete Selected Products
      </button>

      {/* Modal */}
      <DeleteProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </div>
  );
};
