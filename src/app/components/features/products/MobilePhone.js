"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart, FaTruck, FaCartPlus } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";

const ITEMS_PER_PAGE = 5;

export default function MobilePhones() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobilePhones, setMobilePhones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const itemsPerPage = 2; // Show 2 items in mobile view
  const totalPages = Math.ceil(mobilePhones.length / itemsPerPage);

  const handleClick = (id) => router.push(`/product/${id}`);

  const getAvailableColors = (product) => {
    const name = product.name.toLowerCase();
    if (name.includes("iphone")) {
      return [
        { name: "Space Black", hex: "#1F2937", textColor: "white" },
        { name: "Natural Titanium", hex: "#E5E7EB", textColor: "black" },
        { name: "Blue Titanium", hex: "#1E40AF", textColor: "white" },
        { name: "White Titanium", hex: "#FFFFFF", textColor: "black" },
      ];
    } else if (name.includes("samsung")) {
      return [
        { name: "Titanium Gray", hex: "#4A4A4A", textColor: "white" },
        { name: "Titanium Black", hex: "#1F2937", textColor: "white" },
        { name: "Titanium Violet", hex: "#7E3AF2", textColor: "white" },
        { name: "Titanium Yellow", hex: "#FCD34D", textColor: "black" },
      ];
    } else if (name.includes("nothing")) {
      return [
        { name: "White", hex: "#FFFFFF", textColor: "black" },
        { name: "Black", hex: "#1F2937", textColor: "white" },
      ];
    }
    return [
      { name: "Black", hex: "#1F2937", textColor: "white" },
      { name: "White", hex: "#FFFFFF", textColor: "black" },
      { name: "Blue", hex: "#1E40AF", textColor: "white" },
      { name: "Gold", hex: "#B45309", textColor: "white" },
    ];
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    const colors = getAvailableColors(item);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      selectedColor: colors[0].name,
      availableColors: colors,
    });
  };

  useEffect(() => {
    const fetchMobilePhones = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products/mobile");
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch");
        setMobilePhones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMobilePhones();
  }, []);

  // Track scroll position for active dot
  const handleScroll = useCallback(() => {
    if (containerRef) {
      const scrollLeft = containerRef.scrollLeft;
      const itemWidth = containerRef.clientWidth;
      const newPage = Math.round(scrollLeft / itemWidth);
      setCurrentPage(newPage);
    }
  }, [containerRef]);

  useEffect(() => {
    const current = containerRef;
    if (current) {
      current.addEventListener("scroll", handleScroll);
      return () => current.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef, handleScroll]);

  // Add scroll check function
  const checkScroll = useCallback(() => {
    if (containerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [containerRef, checkScroll]);

  const scroll = useCallback(
    (direction) => {
      if (containerRef) {
        const scrollAmount = containerRef.clientWidth * 0.8;
        containerRef.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [containerRef]
  );

  if (loading) {
    return (
      <div className="bg-white py-6 sm:py-10 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 min-w-[280px]">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-xl p-3 h-[370px] sm:h-[400px] animate-pulse flex-shrink-0 w-[280px] sm:w-auto">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 sm:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 relative">
            Mobile Phones
            <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-500 w-full sm:w-32 mt-2"></div>
          </h2>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className={`hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
              !canScrollLeft
                ? "opacity-0 cursor-default"
                : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollLeft}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className={`hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
              !canScrollRight
                ? "opacity-0 cursor-default"
                : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          <div
            ref={setContainerRef}
            className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory max-w-full">
            <div className="flex gap-3 sm:gap-4">
              {mobilePhones.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col min-h-[320px] sm:min-h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[calc(50%-8px)] sm:w-[280px] touch-pan-x snap-start border border-gray-100/50"
                  onClick={() => handleClick(item.id)}>
                  {item.tag && (
                    <span
                      className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-md ${
                        item.tag.includes("%")
                          ? "bg-green-500/90"
                          : item.tag === "New"
                          ? "bg-blue-500/90"
                          : "bg-orange-500/90"
                      } shadow-lg`}>
                      {item.tag}
                    </span>
                  )}

                  <div className="flex-1 flex items-center justify-center relative p-4 sm:p-6">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-90 group-hover:scale-100">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/product/${item.id}`);
                        }}
                        className="p-2 rounded-full bg-white/95 shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-sm"
                        title="Quick View">
                        <MdOutlinePreview className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/compare?product=${item.id}`);
                        }}
                        className="p-2 rounded-full bg-white/95 shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-sm"
                        title="Compare">
                        <IoGitCompareOutline className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={180}
                      height={180}
                      className="mx-auto object-contain w-full h-[160px] sm:h-[180px] transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/95 hover:bg-white shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 touch-manipulation active:scale-95 backdrop-blur-sm"
                      aria-label="Add to favorites">
                      <FaHeart
                        className={`w-4 h-4 ${
                          isFavorite(item.id)
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      />
                    </button>

                    {/* Color swatches */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center gap-1.5">
                      {getAvailableColors(item)
                        .slice(0, 4)
                        .map((color) => (
                          <div
                            key={color.name}
                            className="w-3 h-3 rounded-full shadow-sm border border-gray-200 transition-transform hover:scale-125 active:scale-95"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2.5">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {item.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          Rs {item.oldPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        Rs {item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                          EMI Available
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 active:scale-95 transition-all shadow-sm"
                        aria-label="Add to cart">
                        <FaCartPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots - Mobile only */}
          <div className="flex justify-center gap-2 mt-4 sm:hidden">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (containerRef) {
                    containerRef.scrollTo({
                      left: i * containerRef.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === i
                    ? "bg-blue-500 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
