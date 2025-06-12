"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTags,
  FaCalculator,
  FaBlog,
  FaHeadphones,
  FaMobile,
  FaLaptop,
  FaTv,
  FaThLarge,
  FaTimes,
  FaAngleRight,
  FaHome,
  FaCamera,
  FaGamepad,
  FaTshirt,
  FaBook,
  FaShoppingBag,
  FaRegClock,
  FaTools,
  FaKitchenSet,
  FaSpinner,
} from "react-icons/fa";
import { fetchCategories } from "../../../api/categoriesApi";

const Navmenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const quickLinks = [
    {
      icon: FaCalculator,
      label: "EMI Calculator",
      href: "/emi-calculator",
      color: "orange",
    },
    {
      icon: FaBlog,
      label: "Blogs",
      href: "/blogs",
      color: "pink",
    },
  ];

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const getCategoryIcon = (categoryName) => {
    const normalizedName = categoryName.toLowerCase();
    const iconMap = {
      mobiles: FaMobile,
      phones: FaMobile,
      smartphones: FaMobile,
      laptops: FaLaptop,
      computers: FaLaptop,
      audio: FaHeadphones,
      headphones: FaHeadphones,
      speakers: FaHeadphones,
      electronics: FaTv,
      television: FaTv,
      cameras: FaCamera,
      photography: FaCamera,
      gaming: FaGamepad,
      games: FaGamepad,
      fashion: FaTshirt,
      clothing: FaTshirt,
      apparel: FaTshirt,
      books: FaBook,
      education: FaBook,
      bags: FaShoppingBag,
      accessories: FaShoppingBag,
      watches: FaRegClock,
      tools: FaTools,
      hardware: FaTools,
      appliances: FaKitchenSet,
      kitchen: FaKitchenSet,
      home: FaHome,
      default: FaTags,
    };

    // Try to find a matching icon by checking if any key is included in the category name
    const matchingKey = Object.keys(iconMap).find((key) =>
      normalizedName.includes(key)
    );

    return iconMap[matchingKey] || iconMap.default;
  };

  return (
    <nav className="w-full h-[60px] sm:h-[68px] bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-blue-100/50">
      <div className="container h-full px-4 mx-auto max-w-7xl">
        <div className="flex items-center h-full gap-3 sm:gap-6">
          {/* Browse Categories Button */}
          <div className="w-[160px] flex-shrink-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium text-sm group whitespace-nowrap">
              <FaThLarge className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
              <span>
                Browse {categories.length > 0 && `(${categories.length})`}
              </span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="flex items-center h-full gap-3 overflow-x-auto sm:gap-6 hide-scrollbar">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center flex-shrink-0 gap-2 px-4 py-2 text-sm text-gray-600 transition-all duration-200 rounded-lg hover:text-blue-600 hover:bg-blue-50/80 whitespace-nowrap group">
                <span
                  className={`w-[28px] h-[28px] flex items-center justify-center bg-${link.color}-100 rounded-lg group-hover:bg-${link.color}-200 transition-colors`}>
                  <link.icon className={`w-3.5 h-3.5 text-${link.color}-600`} />
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
            style={{ willChange: "opacity" }}
          />

          {/* Sidebar */}
          <aside
            className="fixed top-0 left-0 h-[100dvh] w-[85vw] sm:w-[380px] bg-white shadow-xl z-50"
            style={{ willChange: "transform" }}>
            {/* Header */}
            <div className="h-[64px] flex items-center justify-between px-6 border-b bg-gradient-to-r from-blue-50 to-white">
              <h2 className="text-lg font-semibold text-gray-800">
                Browse Categories
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 hover:rotate-90">
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Category list with loading and error states */}
            <div className="h-[calc(100dvh-64px)] overflow-y-auto">
              <div className="p-4">
                {isLoading ? (
                  // Loading skeleton with animation
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 h-[56px] px-4">
                        <div className="w-[40px] h-[40px] bg-gray-100 rounded-lg animate-pulse" />
                        <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  // Error state with retry button
                  <div className="p-8 space-y-4 text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                      onClick={loadCategories}
                      className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
                      Try Again
                    </button>
                  </div>
                ) : categories.length === 0 ? (
                  // Empty state
                  <div className="p-8 text-center text-gray-500">
                    No categories available
                  </div>
                ) : (
                  // Categories list
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const IconComponent = getCategoryIcon(category.name);
                      return (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center justify-between h-[56px] px-4 text-gray-700 rounded-lg transition-colors hover:bg-gray-50 group">
                          <div className="flex items-center gap-3">
                            <span className="w-[40px] h-[40px] flex items-center justify-center bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                            </span>
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <FaAngleRight className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </>
      )}
    </nav>
  );
};

export default Navmenu;
