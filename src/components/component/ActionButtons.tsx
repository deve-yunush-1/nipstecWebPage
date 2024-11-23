/** @format */

// app/products/ActionButtons.tsx
import Link from "next/link";

interface ActionButtonsProps {
  selectedProductIds: string[];
  onDeleteSelected: () => void;
}

export default function ActionButtons({
  selectedProductIds,
  onDeleteSelected,
}: ActionButtonsProps) {
  return (
    <div className="flex  flex-wrap justify-between gap-4 mb-4 md:flex-nowrap px-8">
      {/* Add New Product Button */}
      <Link href="/add-course">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full md:w-auto">
          Add New Course
        </button>
      </Link>

      {/* Edit Product Button */}
      {selectedProductIds.length === 1 && (
        <Link href={`/edit-course?courseId=${selectedProductIds[0]}`}>
          <button className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 w-full md:w-auto">
            Edit Course
          </button>
        </Link>
      )}

      {/* Update Product Button */}
      {/* {selectedProductIds.length === 1 && (
        <Link href={`/update-product?courseId=${selectedProductIds[0]}`}>
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 w-full md:w-auto">
            Update Product
          </button>
        </Link>
      )} */}

      {/* Delete Product Button */}
      {/* {selectedProductIds.length === 1 && (
        <button
          onClick={onDeleteSelected}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 w-full md:w-auto">
          Delete Selected Products
        </button>
      )} */}
    </div>
  );
}
