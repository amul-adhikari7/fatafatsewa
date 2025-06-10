"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";

const ITEMS_PER_PAGE = 5;

export default function Gadgets() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gadgets, setGadgets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const itemsPerPage = 2; // Show 2 items in mobile view
  const totalPages = Math.ceil(gadgets.length / itemsPerPage);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulated data - replace with actual API call
        const data = [
          {
            id: "g1",
            name: "ONIKUMA K9 Gaming Headset",
            price: 2499,
            oldPrice: 2999,
            image:
              "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
            tag: "NEW",
            features: [
              "7.1 Surround Sound",
              "RGB Lighting",
              "Noise Cancellation",
            ],
          },
          {
            id: "g2",
            name: "Nintendo Switch OLED",
            price: 45999,
            image: "/assets/nintendo.png",
            tag: "20% OFF",
            features: ["7-inch OLED Screen", "64GB Storage", "Enhanced Audio"],
          },
          {
            id: "g3",
            name: "Fantech Gaming Mouse",
            price: 1899,
            oldPrice: 2299,
            image: "/assets/fantech-red.jpg",
            tag: "SALE",
            features: ["16000 DPI", "RGB Lighting", "8 Programmable Buttons"],
          },
          {
            id: "g4",
            name: "Gaming Headphones Pro",
            price: 3499,
            image: "/assets/headphones.webp",
            features: ["Wireless", "40hr Battery", "Low Latency"],
          },
        ];

        if (data.length === 0) {
          setError("No gadgets available");
          return;
        }

        setGadgets(data);
      } catch (err) {
        console.error("Error fetching gadgets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();
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

  if (loading) {
    return (
      <div className="bg-white py-6 sm:py-10 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 min-w-[280px]">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-3 h-[320px] sm:h-[400px] animate-pulse flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto shadow-sm">
                  <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-8 sm:py-10 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 relative">
            Gadgets & Accessories
            <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-500 w-full sm:w-32 mt-2"></div>
          </h2>
          <button
            onClick={() => router.push("/category/gadgets")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="relative">
          {/* Scroll Buttons - Only visible on desktop */}
          <button
            onClick={() => scroll("left")}
            className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
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
            className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
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
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {gadgets.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col min-h-[320px] sm:min-h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto touch-pan-x snap-start border border-gray-100/50"
                  onClick={() => handleClick(item.id)}>
                  {item.tag && (
                    <span
                      className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-md ${
                        item.tag.includes("%")
                          ? "bg-green-500/90"
                          : item.tag === "NEW"
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
                    <div className="space-y-1.5">
                      <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-snug">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {item.oldPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            Rs {item.oldPrice.toLocaleString()}
                          </p>
                        )}
                        <p className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                          Rs {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.features?.map((feature, index) => (
                        <span
                          key={index}
                          className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-6 sm:hidden">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i
                    ? "w-6 bg-gradient-to-r from-blue-600 to-blue-700"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

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
}
