"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaTimes,
  FaCalculator,
  FaBlog,
  FaHeadphones,
  FaMobile,
  FaLaptop,
  FaTv,
  FaThLarge,
  FaAngleRight,
} from "react-icons/fa";

const Navmenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    {
      icon: FaMobile,
      label: "Mobiles",
      href: "/category/mobiles",
      color: "blue",
    },
    {
      icon: FaLaptop,
      label: "Laptops",
      href: "/category/laptops",
      color: "purple",
    },
    {
      icon: FaHeadphones,
      label: "Audio",
      href: "/category/audio",
      color: "red",
    },
    {
      icon: FaTv,
      label: "Electronics",
      href: "/category/electronics",
      color: "green",
    },
  ];

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
    {
      icon: FaBlog,
      label: "Brands",
      href: "/blogs",
      color: "blue",
    },
  ];

  return (
    <>
      {/* Fixed height container to prevent layout shifts */}
      <nav className="w-full h-[60px] sm:h-[68px] bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-blue-100/50">
        <div className="container h-full px-4 mx-auto max-w-7xl">
          <div className="flex items-center h-full gap-3 sm:gap-6">
            {/* Browse Categories Button - Fixed width to prevent shifts */}
            <div className="w-[160px] flex-shrink-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium text-sm group whitespace-nowrap">
                <FaThLarge className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                <span>Browse Categories</span>
              </button>
            </div>

            {/* Quick Links - Fixed height to prevent vertical shifts */}
            <div className="flex items-center h-full gap-3 mx-5 overflow-x-auto sm:gap-6 hide-scrollbar">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center flex-shrink-0 gap-2 px-4 py-2 text-sm text-gray-600 transition-all duration-200 rounded-lg hover:text-blue-600 hover:bg-blue-50/80 whitespace-nowrap group">
                  <span
                    className={`w-[28px] h-[28px] flex items-center justify-center bg-${link.color}-100 rounded-lg group-hover:bg-${link.color}-200 transition-colors`}>
                    <link.icon
                      className={`w-3.5 h-3.5 text-${link.color}-600`}
                    />
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Categories Sidebar - Fixed dimensions and positioning */}
      {isSidebarOpen && (
        <>
          {/* Backdrop with fixed positioning */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
            style={{ willChange: "opacity" }}
          />

          {/* Sidebar with fixed width and height */}
          <aside
            className="fixed top-0 left-0 h-[100dvh] w-[85vw] sm:w-[380px] bg-white shadow-xl z-50"
            style={{ willChange: "transform" }}>
            {/* Header with fixed height */}
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

            {/* Category list with fixed item heights */}
            <div className="h-[calc(100dvh-64px)] overflow-y-auto">
              <div className="p-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={category.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center justify-between h-[56px] px-4 text-gray-700 transition-colors hover:bg-gray-50 group">
                    <div className="flex items-center gap-3">
                      <span className="w-[40px] h-[40px] flex items-center justify-center bg-${category.color}-100 rounded-lg group-hover:bg-${category.color}-200 transition-colors">
                        <category.icon className="w-5 h-5 text-${category.color}-600" />
                      </span>
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <FaAngleRight className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navmenu;
