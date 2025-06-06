"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaTruck } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";
import { fetchProducts } from "@/app/api/apiClient";

const Laptops = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = 12; // We'll show 12 pages of laptops

  useEffect(() => {
    const loadLaptops = async () => {
      if (currentPage && itemsPerPage) {
        try {
          setLoading(true);
          const response = await fetchProducts(currentPage, itemsPerPage);

          // Check if response exists and contains data property
          if (response?.data && Array.isArray(response.data)) {
            // Filter for laptop products
            const laptopProducts = response.data.filter(
              (product) =>
                (product?.category?.toLowerCase()?.includes("laptop") ||
                  product?.name?.toLowerCase()?.includes("laptop")) &&
                product.id &&
                product.name // Ensure required fields exist
            );

            if (laptopProducts.length > 0) {
              setLaptops(laptopProducts);
              setError(null);
            } else {
              setError("No laptops found");
            }
          } else {
            setError("Invalid response format");
            console.error("Invalid response format:", response);
          }
        } catch (err) {
          setError("Failed to load laptops");
          console.error("Error loading laptops:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadLaptops();
  }, [currentPage]);

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

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {" "}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1 w-[90%] ">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Laptops
            </h2>
            <p className="text-gray-500 text-sm">
              Discover our latest collection of premium laptops
            </p>
            <div className="h-1 bg-gradient-to-r from-orange-600 to-orange-400 w-full mt-2 rounded-full"></div>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">
                {
                  laptops.filter((l) =>
                    l.category?.toLowerCase().includes("laptop")
                  ).length
                }
              </span>
              <span>products</span>
            </div> */}
            <button
              onClick={() => router.push("/category/laptops")}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md">
              View All
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-red-500">{error}</p>
          </div>
        ) : laptops.length === 0 ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-gray-500">No laptops available</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                {laptops
                  .filter(
                    (product) =>
                      product.category?.toLowerCase().includes("laptop") ||
                      product.name?.toLowerCase().includes("laptop")
                  )
                  .map((laptop) => (
                    <div
                      key={laptop.id}
                      className="bg-white rounded-2xl overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out group flex flex-col h-[380px] sm:h-[420px] transform hover:-translate-y-1 flex-shrink-0 w-[280px] sm:w-auto">
                      {/* Quick Action Buttons */}
                      <div className="absolute top-3 right-3 z-20 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(laptop);
                          }}
                          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200">
                          <FaHeart
                            className={`w-5 h-5 ${
                              isFavorite(laptop.id)
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>{" "}
                      {/* Image Section */}
                      <div
                        onClick={() => router.push(`/product/${laptop.id}`)}
                        className="relative h-48 sm:h-52 bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer group/image">
                        {laptop.tag && (
                          <div className="absolute top-3 left-3 z-10">
                            <div className="bg-orange-500 text-white px-3 py-1 text-xs font-medium rounded">
                              {laptop.tag}
                            </div>
                          </div>
                        )}

                        <Image
                          src={laptop.image}
                          alt={laptop.name}
                          fill
                          className="object-contain p-6 transition-transform duration-500 group-hover/image:scale-110"
                        />

                        {/* Hover Icons */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(`/product/${laptop.id}`);
                            }}
                            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                            title="Quick View">
                            <MdOutlinePreview className="w-5 h-5 text-gray-700" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Add compare functionality
                            }}
                            className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                            title="Compare">
                            <IoGitCompareOutline className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                      {/* Content Section */}
                      <div className="flex-1 p-4">
                        <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 min-h-[40px]">
                          {laptop.name}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-baseline gap-2">
                            <p className="text-xl font-bold text-blue-600">
                              Rs. {laptop.price.toLocaleString()}
                            </p>
                            {laptop.oldPrice && (
                              <p className="text-sm text-gray-400 line-through">
                                Rs. {laptop.oldPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                          {/* Specs Preview */}{" "}
                          <div className="text-xs text-gray-600 space-y-1">
                            {laptop.processor && (
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {laptop.processor}
                              </div>
                            )}
                            {laptop.ram && (
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {laptop.ram} RAM
                              </div>
                            )}
                            {laptop.storage && (
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {laptop.storage}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="p-4 pt-0 mt-auto">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(laptop);
                          }}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-orange-500 transition-all duration-300 font-medium">
                          Add to Cart
                        </button>
                        <div className="flex justify-between mt-3 text-[10px] sm:text-xs text-gray-600">
                          <span className="border border-gray-300 text-orange-600 font-bold px-2 py-1 rounded-full">
                            EMI Available
                          </span>
                          <span className="border border-gray-300 text-blue-600 font-bold px-2 py-1 rounded-full">
                            <FaTruck className="inline-block mr-1 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Fast Delivery
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>{" "}
            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                Prev
              </button>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Laptops;
