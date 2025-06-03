"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaThLarge,
  FaTags,
  FaCalculator,
  FaBlog,
  FaTimes,
  FaAngleRight,
} from "react-icons/fa";
import { useCategories } from "../../components/contexts/Categories";

const Navmenu = () => {
  const { categories, loading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Organize categories into a tree structure
  const categoryTree = React.useMemo(() => {
    const mainCategories = categories.filter((cat) => !cat.parent_id);
    return mainCategories.map((cat) => ({
      ...cat,
      children: categories.filter((child) => child.parent_id === cat.id),
    }));
  }, [categories]);

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Navigation Bar JSX remains the same
  return (
    <>
      {/* Navigation Bar */}
      <nav className="w-full flex justify-center py-2 sm:py-4 bg-gradient-to-r from-blue-200 via-blue-200 to-blue-200">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-x-7">
          <div className="w-full sm:w-auto flex items-center justify-between">
            {/* Category Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 sm:px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-500 transition-all duration-200 font-medium text-sm">
              <FaThLarge className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Category</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <a
              href="#"
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-xs sm:text-sm whitespace-nowrap hover:scale-105">
              <FaTags className="w-3 h-3 sm:w-4 sm:h-4" />
              Brands
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-xs sm:text-sm whitespace-nowrap hover:scale-105">
              <FaCalculator className="w-3 h-3 sm:w-4 sm:h-4" />
              EMI Calculator
            </a>
            <Link
              href="/blogs"
              className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-xs sm:text-sm whitespace-nowrap hover:scale-105">
              <FaBlog className="w-3 h-3 sm:w-4 sm:h-4" />
              Blogs
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Enhanced Sidebar Panel */}
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
            className="text-gray-500 hover:text-red-500 transition-colors">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-64px)]">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="p-2">
              {categoryTree.map((category) => (
                <div key={category.id} className="mb-1">
                  <div
                    className="relative"
                    onMouseEnter={() =>
                      !isMobile && handleCategoryHover(category.id)
                    }
                    onMouseLeave={() => !isMobile && handleCategoryHover(null)}
                    onClick={() =>
                      isMobile &&
                      handleCategoryHover(
                        activeCategory === category.id ? null : category.id
                      )
                    }>
                    <Link
                      href={`/category/${category.slug}`}
                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all group"
                      onClick={(e) => {
                        if (isMobile && category.children?.length > 0) {
                          e.preventDefault();
                        }
                        setIsOpen(false);
                      }}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        {category.category_image?.full && (
                          <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                            <Image
                              src={category.category_image.full}
                              alt={category.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="text-sm sm:text-base font-medium">
                          {category.title}
                        </span>
                      </div>
                      {category.children?.length > 0 && (
                        <FaAngleRight
                          className={`w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-transform ${
                            activeCategory === category.id ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Subcategories - Mobile */}
                    {isMobile &&
                      category.children?.length > 0 &&
                      activeCategory === category.id && (
                        <div className="bg-blue-50/50 rounded-lg mt-1">
                          {category.children.map((subCategory) => (
                            <Link
                              key={subCategory.id}
                              href={`/category/${subCategory.slug}`}
                              className="block p-2 pl-12 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-100/50 transition-all"
                              onClick={() => setIsOpen(false)}>
                              {subCategory.title}
                            </Link>
                          ))}
                        </div>
                      )}

                    {/* Subcategories - Desktop */}
                    {!isMobile &&
                      category.children?.length > 0 &&
                      activeCategory === category.id && (
                        <div className="absolute left-full top-0 w-64 bg-white shadow-lg rounded-lg ml-2 border border-gray-100">
                          {category.children.map((subCategory) => (
                            <Link
                              key={subCategory.id}
                              href={`/category/${subCategory.slug}`}
                              className="block p-3 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all"
                              onClick={() => setIsOpen(false)}>
                              {subCategory.title}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Navmenu;
