"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaThLarge,
  FaTags,
  FaCalculator,
  FaBlog,
  FaTimes,
  FaAngleRight,
} from "react-icons/fa";

const categories = [
  {
    id: "laptops",
    name: "Laptops",
    children: [
      { id: "gaming-laptops", name: "Gaming Laptops" },
      { id: "business-laptops", name: "Business Laptops" },
      { id: "macbooks", name: "MacBooks" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile Phones",
    children: [
      { id: "smartphones", name: "Smartphones" },
      { id: "basic-phones", name: "Basic Phones" },
      { id: "tablets", name: "Tablets" },
    ],
  },
  {
    id: "appliances",
    name: "Home Appliances",
    children: [
      { id: "refrigerators", name: "Refrigerators" },
      { id: "washing-machines", name: "Washing Machines" },
      { id: "microwaves", name: "Microwaves" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming & Accessories",
    children: [
      { id: "consoles", name: "Gaming Consoles" },
      { id: "accessories", name: "Gaming Accessories" },
      { id: "games", name: "Games" },
    ],
  },
];

const Navmenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryHover = (categoryId) => {
    if (!isMobile) {
      setActiveCategory(categoryId);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (isMobile) {
      setActiveCategory(activeCategory === categoryId ? null : categoryId);
    }
  };

  return (
    <>
      <nav className="w-full flex justify-center py-2 sm:py-4 bg-gradient-to-r from-blue-200 via-blue-200 to-blue-200">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-x-7">
          <div className="w-full sm:w-auto flex items-center justify-between">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 sm:px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-500 transition-all duration-200 font-medium text-sm">
              <FaThLarge className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Category</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <a
              href="#"
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-xs sm:text-sm whitespace-nowrap hover:scale-105">
              <FaTags className="w-3 h-3 sm:w-4 sm:h-4" />
              Brands
            </a>
            <Link
              href="/emi-calculator"
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-xs sm:text-sm whitespace-nowrap hover:scale-105">
              <FaCalculator className="w-3 h-3 sm:w-4 sm:h-4" />
              EMI Calculator
            </Link>
            <Link
              href="/blogs"
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-xs sm:text-sm whitespace-nowrap hover:scale-105">
              <FaBlog className="w-3 h-3 sm:w-4 sm:h-4" />
              Blogs
            </Link>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[85vw] sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Categories
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <div className="p-2">
            {categories.map((category) => (
              <div key={category.id} className="relative">
                <button
                  className={`w-full flex items-center justify-between p-3 text-left text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onClick={() => handleCategoryClick(category.id)}>
                  <span>{category.name}</span>
                  {category.children?.length > 0 && (
                    <FaAngleRight
                      className={`w-4 h-4 transition-transform ${
                        activeCategory === category.id ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>

                {category.children && activeCategory === category.id && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.children.map((subCategory) => (
                      <Link
                        key={subCategory.id}
                        href={`/category/${subCategory.id}`}
                        className="block p-2 text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50/50 rounded-lg transition-colors">
                        {subCategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navmenu;
