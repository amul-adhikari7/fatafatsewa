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
      <nav className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-blue-100/50">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="w-full sm:w-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium text-sm group">
              <FaThLarge className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>Browse Categories</span>
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-1 hide-scrollbar">
            <a
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50/80 text-sm whitespace-nowrap group">
              <span className="p-1.5 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <FaTags className="w-3.5 h-3.5 text-orange-600" />
              </span>
              Brands
            </a>
            <Link
              href="/emi-calculator"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50/80 text-sm whitespace-nowrap group">
              <span className="p-1.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <FaCalculator className="w-3.5 h-3.5 text-green-600" />
              </span>
              EMI Calculator
            </Link>
            <Link
              href="/blogs"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50/80 text-sm whitespace-nowrap group">
              <span className="p-1.5 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <FaBlog className="w-3.5 h-3.5 text-purple-600" />
              </span>
              Blogs
            </Link>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Categories Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85vw] sm:w-[380px] bg-white shadow-xl transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-lg font-semibold text-gray-800">
            Browse Categories
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90">
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-72px)] py-3">
          <div className="px-3">
            {categories.map((category) => (
              <div key={category.id} className="relative mb-2">
                <button
                  className={`w-full flex items-center justify-between p-3.5 text-left rounded-xl transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-blue-50/80 text-blue-600 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onClick={() => handleCategoryClick(category.id)}>
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-2 rounded-lg ${
                        activeCategory === category.id
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}>
                      <FaThLarge
                        className={`w-4 h-4 ${
                          activeCategory === category.id
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {category.children?.length > 0 && (
                    <FaAngleRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeCategory === category.id ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>

                {category.children && activeCategory === category.id && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-blue-100 space-y-1">
                    {category.children.map((subCategory) => (
                      <Link
                        key={subCategory.id}
                        href={`/category/${subCategory.id}`}
                        className="flex items-center gap-2 p-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
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
