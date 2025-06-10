"use client";

import { FaSearch } from "react-icons/fa";

const SearchBar = ({ className = "" }) => {
  return (
    <div
      className={`bg-white shadow-lg p-3 border-t border-gray-100 mb-2 ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full py-2.5 px-5 pr-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-600 bg-gray-50/50 focus:bg-white"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 p-2 hover:bg-gray-100 rounded-full transition-all">
          <FaSearch className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
