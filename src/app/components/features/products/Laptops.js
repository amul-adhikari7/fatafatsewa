"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaTruck, FaCartPlus, FaCalculator } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";
import { useProducts } from "../../../components/contexts/ProductsContext";

const ITEMS_PER_PAGE = 5;

const Laptops = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { laptops, loading } = useProducts();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil((laptops?.length || 0) / ITEMS_PER_PAGE);
  const visibleLaptops =
    laptops?.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
    ) || [];

  const handleFavoriteClick = (e, laptop) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(laptop);
  };

  const handleAddToCart = (e, laptop) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(laptop);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getProductUrl = (id) => `/components/features/products/${id}`;

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Laptops
            </h2>
            <div className="h-1 bg-orange-500 w-24 mt-2"></div>
          </div>
          <button
            onClick={() => router.push("/category/laptops")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors text-sm">
            View All
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : laptops?.length === 0 ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-gray-500">No laptops available</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                {visibleLaptops.map((laptop) => (
                  <div
                    key={laptop.id}
                    onClick={() => router.push(getProductUrl(laptop.id))}
                    className="bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 relative shadow-sm hover:shadow-xl hover:shadow-blue-200/100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col h-[360px] sm:h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[260px] sm:w-auto touch-pan-x">
                    <button
                      onClick={(e) => handleFavoriteClick(e, laptop)}
                      className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                      <FaHeart
                        className={`w-5 h-5 ${
                          isFavorite(laptop.id)
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    {laptop.tag && (
                      <span className="absolute top-2 left-2 z-10 px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
                        {laptop.tag}
                      </span>
                    )}

                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={laptop.image}
                        alt={laptop.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {laptop.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {laptop.description}
                      </p>

                      <div className="space-y-1 mb-2">
                        <div className="font-bold text-lg text-gray-900">
                          {laptop.price}
                        </div>
                        {laptop.oldPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {laptop.oldPrice}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`${getProductUrl(laptop.id)}#emi`);
                          }}
                          className="border font-bold border-gray-200 text-orange-500 px-2 py-0.5 rounded-full">
                          EMI
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`${getProductUrl(laptop.id)}#delivery`);
                          }}
                          className="border font-bold border-gray-200 text-blue-500 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <FaTruck className="w-2.5 h-2.5" />
                          <span>Fatafat Delivery</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pagination Dots - Only visible on mobile */}
        <div className="flex sm:hidden justify-center items-center gap-1.5 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentPage === i
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default Laptops;
