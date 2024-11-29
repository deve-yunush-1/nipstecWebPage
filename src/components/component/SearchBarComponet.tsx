/** @format */

import React, {useState} from "react";

interface SearchBarProps<T> {
  items: T[]; // The list of items to search/filter
  filterFunction: (items: T[], searchTerm: string) => T[]; // The function to filter items
  onFilterChange: (filteredItems: T[]) => void; // Callback function to update filtered items
  placeholder?: string; // Placeholder text for the input field
}

function SearchBar<T>({
  items,
  filterFunction,
  onFilterChange,
  placeholder = "Search...",
}: SearchBarProps<T>) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredItems = filterFunction(items, term);
    onFilterChange(filteredItems);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
