"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCategories } from "../../components/contexts/Categories";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 6;

const Popularcategories = () => {
  const { categories, loading, error } = useCategories();
  const [currentPage, setCurrentPage] = useState(0);

  const featuredCategories = React.useMemo(() => {
    return categories
      .filter((cat) => cat.featured === 1 && cat.category_image?.full)
      .map((cat) => ({
        ...cat,
        imageUrl: cat.category_image.full,
      }));
  }, [categories]);

  const totalPages = Math.ceil(featuredCategories.length / ITEMS_PER_PAGE);
  const visibleCategories = featuredCategories.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 lg:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              Popular Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Browse our top categories
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 hover:text-blue-700 font-medium shadow-sm hover:shadow-md transition-all duration-300 group text-sm sm:text-base">
            View All
            <FaChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 w-full flex-shrink-0">
                {visibleCategories.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    className="group relative overflow-hidden rounded-lg aspect-square bg-white shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="absolute inset-0">
                      <Image
                        src={category.imageUrl}
                        alt={category.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end p-4">
                      <h3 className="text-white text-sm font-medium">
                        {category.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Popularcategories;
