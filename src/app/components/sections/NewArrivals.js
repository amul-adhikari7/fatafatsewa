"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart, FaTruck } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { useFavorites } from "../../components/contexts/FavoritesContext";

const ITEMS_PER_PAGE = 2; // Show 2 items in mobile view

// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra 5G",
    price: 189999,
    oldPrice: 199999,
    image: "/assets/Samsung-s24-ultra.png",
    description: "12GB RAM, 512GB Storage, Titanium Frame",
    created_at: "2025-06-01T00:00:00Z",
    tag: "New",
  },
  {
    id: 2,
    name: "Nothing Phone 2a",
    price: 56999,
    oldPrice: 59999,
    image: "/assets/nothing.png",
    description: "8GB RAM, 256GB Storage, Glyph Interface",
    created_at: "2025-06-02T00:00:00Z",
    tag: "10% Off",
  },
  {
    id: 3,
    name: "iPhone 16 Pro Max",
    price: 199999,
    image: "/assets/Iphone-16-pro-max-price-in-nepal.jpg",
    description: "A18 Pro Chip, 8GB RAM, 256GB Storage",
    created_at: "2025-06-03T00:00:00Z",
    tag: "New",
  },
  {
    id: 4,
    name: "Acer Nitro V Gaming Laptop 2025",
    price: 129999,
    oldPrice: 139999,
    image: "/assets/Acer-Nitro-V-2023-I7-1260P-RTX-3050.jpg",
    description: "Intel Core i7-14700H, RTX 4060, 16GB RAM",
    created_at: "2025-06-04T00:00:00Z",
    tag: "Gaming",
  },
  {
    id: 5,
    name: "MacBook Pro 16 M3 Max",
    price: 399999,
    image: "/assets/MacBook-pro-retina.jpg",
    description: "M3 Max, 32GB RAM, 1TB SSD",
    created_at: "2025-06-05T00:00:00Z",
    tag: "Premium",
  },
];

const NewArrivals = () => {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, setContainerRef] = useState(null);

  const handleScroll = () => {
    if (containerRef) {
      const scrollLeft = containerRef.scrollLeft;
      const itemWidth = containerRef.clientWidth;
      const newPage = Math.round(scrollLeft / itemWidth);
      setCurrentPage(newPage);
    }
  };
  useEffect(() => {
    const container = containerRef;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef, handleScroll]);

  const goToPage = (pageNumber) => {
    if (containerRef) {
      const itemWidth = containerRef.clientWidth;
      containerRef.scrollTo({
        left: pageNumber * itemWidth,
        behavior: "smooth",
      });
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setNewArrivals(sampleProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (id) => router.push(`/product/${id}`);
  const totalPages = Math.ceil(newArrivals.length / ITEMS_PER_PAGE);

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

  if (error) {
    return (
      <div className="bg-white py-8 sm:py-10 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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
            New Arrivals
            <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-500 w-full sm:w-32 mt-2"></div>
          </h2>
          <button
            onClick={() => router.push("/category/new-arrivals")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="relative">
          <div
            ref={setContainerRef}
            className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory max-w-full">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {newArrivals.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col min-h-[320px] sm:min-h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto touch-pan-x snap-start border border-gray-100/50"
                  onClick={() => handleClick(item.id)}>
                  {item.tag && (
                    <span
                      className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-md ${
                        item.tag === "Gaming"
                          ? "bg-purple-500/90"
                          : item.tag === "Premium"
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
                      {item.description && (
                        <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                          {item.description}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="inline-flex items-center gap-1 border border-orange-200 bg-orange-50 text-orange-600 font-medium px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                        <FaTruck className="w-2.5 h-2.5" />
                        EMI
                      </span>
                      <span className="inline-flex items-center gap-1 border border-blue-200 bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                        <FaTruck className="w-2.5 h-2.5" />
                        Free Delivery
                      </span>
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
};

export default NewArrivals;
