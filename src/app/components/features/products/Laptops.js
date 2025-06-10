"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";
import { useCart } from "@/app/components/contexts/CartContext";
import { useFavorites } from "@/app/components/contexts/FavoritesContext";
import { fetchProducts } from "@/app/api/apiClient";

// Helper function to validate laptop data
const isValidLaptop = (product) => {
  if (!product || typeof product !== "object") return false;

  // Required fields must exist and be of correct type
  if (!product.id || !product.name || typeof product.name !== "string")
    return false;

  const name = product.name.toLowerCase();
  const category = (product.category || "").toLowerCase();

  // Must have a valid price and be identified as a laptop either by name or category
  const hasValidPrice =
    typeof product.price === "number" ||
    (typeof product.price === "string" && !isNaN(parseFloat(product.price)));

  return (
    hasValidPrice && (category.includes("laptop") || name.includes("laptop"))
  );
};

const Laptops = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [containerRef, setContainerRef] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Fetch laptops data
  useEffect(() => {
    const loadLaptops = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchProducts();
        if (!response || !response.data) {
          throw new Error("Invalid response from server");
        }

        const validProducts = Array.isArray(response.data) ? response.data : [];
        const laptopProducts = validProducts.filter(isValidLaptop);

        if (laptopProducts.length > 0) {
          const formattedLaptops = laptopProducts.map((laptop) => ({
            ...laptop,
            price:
              typeof laptop.price === "string"
                ? parseFloat(laptop.price.replace(/[^\d.]/g, ""))
                : laptop.price,
            oldPrice: laptop.oldPrice
              ? parseFloat(String(laptop.oldPrice).replace(/[^\d.]/g, ""))
              : null,
          }));
          setLaptops(formattedLaptops);
        } else {
          setLaptops([]);
          setError("No laptops found. Please try again later.");
        }
      } catch (err) {
        console.error("Error loading laptops:", err);
        setError(
          err.message === "Invalid response from server"
            ? "Unable to connect to the server. Please check your internet connection."
            : "Failed to load laptops. Please try again later."
        );
        setLaptops([]);
      } finally {
        setLoading(false);
      }
    };

    loadLaptops();
  }, []);

  const handleScroll = () => {
    if (containerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollTo = (direction) => {
    if (containerRef) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (containerRef) {
      handleScroll();
      containerRef.addEventListener("scroll", handleScroll);
      return () => containerRef.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef, handleScroll]);

  const handleClick = (id) => router.push(`/product/${id}`);

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Latest Laptops
            </h2>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 w-24 mt-2"></div>
          </div>
          <button
            onClick={() => router.push("/category/laptops")}
            className="hidden sm:flex items-center gap-2 px-5 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-all duration-300 font-medium text-sm">
            View All
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative group">
          {/* Desktop Navigation Arrows */}
          <button
            onClick={() => scrollTo("left")}
            className={`hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 ${
              !showLeftArrow && "opacity-0 pointer-events-none"
            } group-hover:opacity-100`}>
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scrollTo("right")}
            className={`hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 ${
              !showRightArrow && "opacity-0 pointer-events-none"
            } group-hover:opacity-100`}>
            <FaChevronRight className="w-5 h-5" />
          </button>

          {/* Products Container */}
          <div
            ref={setContainerRef}
            className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {laptops.map((laptop) => (
                <div
                  key={laptop.id}
                  onClick={() => handleClick(laptop.id)}
                  className="bg-white rounded-2xl p-4 relative shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group flex flex-col min-h-[320px] sm:min-h-[380px] transform hover:-translate-y-1 flex-shrink-0 w-[calc(50%-12px)] sm:w-auto border border-gray-100 hover:border-blue-100">
                  {laptop.tag && (
                    <span
                      className={`absolute top-4 left-4 text-white text-xs font-medium px-3 py-1 rounded-full z-10 shadow-lg backdrop-blur-sm ${
                        laptop.tag.includes("%")
                          ? "bg-green-500/90"
                          : laptop.tag === "New"
                          ? "bg-blue-500/90"
                          : "bg-orange-500/90"
                      }`}>
                      {laptop.tag}
                    </span>
                  )}

                  {/* Product Image */}
                  <div className="relative aspect-square mb-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
                    <Image
                      src={laptop.image || "/assets/placeholder.png"}
                      alt={laptop.name}
                      fill
                      className="object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Quick Action Buttons */}
                    <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(laptop);
                        }}
                        className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 text-gray-600 hover:text-red-500">
                        <FaHeart
                          className={
                            isFavorite(laptop.id) ? "text-red-500" : ""
                          }
                        />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                      {laptop.name}
                    </h3>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-blue-600">
                          Rs. {laptop.price?.toLocaleString()}
                        </span>
                        {laptop.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            Rs. {laptop.oldPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laptops;
