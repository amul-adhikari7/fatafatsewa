"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart, FaGamepad } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";

const ITEMS_PER_PAGE = 5;

const accessories = [
  {
    id: 1,
    name: "Anker Soundcore Strike 1 Gaming Headphones",
    description: "RGB Gaming Headset with...",
    price: "Rs 8,999",
    tag: "Fastest Delivery",
    image: "/assets/headphones.webp",
  },
  {
    id: 2,
    name: "Nintendo Switch - OLED Model White Joy-Con",
    description: "Latest Gaming Console...",
    price: "Rs 66,499",
    oldPrice: "Rs 98,490",
    tag: "32% Off",
    image: "/assets/nintendo.png",
  },
  {
    id: 3,
    name: "Fantech Raigor II Wg10 Gaming Mouse",
    description: "RGB Gaming Mouse with...",
    price: "Rs 999",
    tag: "New",
    image: "/assets/fantech-red.jpg",
  },
  {
    id: 4,
    name: "Onikuma k9 RGB Stereo Gaming Headsets",
    description: "Professional Gaming...",
    price: "Rs 3,999",
    tag: "New",
    image:
      "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
  },
  {
    id: 5,
    name: "Onikuma k9 RGB Stereo Gaming Headsets",
    description: "Professional Gaming...",
    price: "Rs 3,999",
    tag: "New",
    image:
      "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
  },
  {
    id: 6,
    name: "Onikuma k9 RGB Stereo Gaming Headsets",
    description: "Professional Gaming...",
    price: "Rs 3,999",
    tag: "New",
    image:
      "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
  },
  {
    id: 7,
    name: "Onikuma k9 RGB Stereo Gaming Headsets",
    description: "Professional Gaming...",
    price: "Rs 3,999",
    tag: "New",
    image:
      "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
  },
];

const GamingAccessories2024 = () => {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const itemsPerPage = 2; // Show 2 items in mobile view
  const totalPages = Math.ceil(accessories.length / itemsPerPage);

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
    const container = containerRef;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef, handleScroll]);

  // Scroll to page
  const goToPage = useCallback(
    (pageNumber) => {
      if (containerRef) {
        const itemWidth = containerRef.clientWidth;
        containerRef.scrollTo({
          left: pageNumber * itemWidth,
          behavior: "smooth",
        });
        setCurrentPage(pageNumber);
      }
    },
    [containerRef]
  );

  const handleClick = (id) => router.push(`/product/${id}`);

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

  return (
    <div className="bg-white py-8 sm:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Update header styling */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 relative">
            Gaming Accessories
            <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-500 w-full sm:w-32 mt-2"></div>
          </h2>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="relative">
          {/* Add Scroll Buttons */}
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
              {accessories.map((item) => (
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
                  </div>

                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2.5">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {item.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {item.oldPrice}
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        {item.price}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                        {item.description}
                      </span>
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
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i
                    ? "bg-orange-500 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
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

export default GamingAccessories2024;
