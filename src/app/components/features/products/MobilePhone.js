"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart, FaTruck, FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";

const ITEMS_PER_PAGE = 5;

export default function MobilePhones() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobilePhones, setMobilePhones] = useState([]);

  useEffect(() => {
    const fetchMobilePhones = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/products/mobile");
        const data = await response.json();

        // Log the response for debugging
        console.log("API Response:", {
          status: response.status,
          ok: response.ok,
          data: data,
        });

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch mobile phones");
        }

        // Validate the data structure
        if (!Array.isArray(data)) {
          console.error("Invalid data format:", data);
          throw new Error("Invalid data format received");
        }

        if (data.length === 0) {
          setError("No mobile phones available");
          return;
        }

        setMobilePhones(data);
      } catch (err) {
        console.error("Error fetching mobile phones:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMobilePhones();
  }, []);

  const totalPages = Math.ceil(mobilePhones.length / ITEMS_PER_PAGE);
  const visiblePhones = mobilePhones.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );
  const getProductUrl = (id) => `/product/${id}`;

  const handleClick = (id) => router.push(getProductUrl(id));
  // Get available colors based on product type
  const getAvailableColors = (product) => {
    if (product.name.toLowerCase().includes("iphone")) {
      return [
        { name: "Space Black", hex: "#1F2937", textColor: "white" },
        { name: "Natural Titanium", hex: "#E5E7EB", textColor: "black" },
        { name: "Blue Titanium", hex: "#1E40AF", textColor: "white" },
        { name: "White Titanium", hex: "#FFFFFF", textColor: "black" },
      ];
    } else if (product.name.toLowerCase().includes("samsung")) {
      return [
        { name: "Titanium Gray", hex: "#4A4A4A", textColor: "white" },
        { name: "Titanium Black", hex: "#1F2937", textColor: "white" },
        { name: "Titanium Violet", hex: "#7E3AF2", textColor: "white" },
        { name: "Titanium Yellow", hex: "#FCD34D", textColor: "black" },
      ];
    } else if (product.name.toLowerCase().includes("nothing")) {
      return [
        { name: "White", hex: "#FFFFFF", textColor: "black" },
        { name: "Black", hex: "#1F2937", textColor: "white" },
      ];
    }
    // Default colors for mobile phones
    return [
      { name: "Black", hex: "#1F2937", textColor: "white" },
      { name: "White", hex: "#FFFFFF", textColor: "black" },
      { name: "Blue", hex: "#1E40AF", textColor: "white" },
      { name: "Gold", hex: "#B45309", textColor: "white" },
    ];
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    // Get colors for this product
    const colors = getAvailableColors(item);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      selectedColor: colors[0].name, // Default to first color
      availableColors: colors,
    });
  };

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
    <div className="bg-white py-8 sm:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Mobile Phones
          </h2>
          <button className="bg-blue-100 text-blue-600 text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full hover:bg-blue-200">
            More Products
          </button>
        </div>
        <div className="h-1 bg-orange-500 w-[100%] sm:w-32 mb-4"></div>

        {/* Product Cards - Horizontal scroll on mobile */}
        <div className="relative">
          <div className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {visiblePhones.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 relative shadow-sm hover:shadow-xl hover:shadow-blue-200/100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col h-[360px] sm:h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[260px] sm:w-auto touch-pan-x"
                  onClick={() => handleClick(item.id)}>
                  {item.tag && (
                    <span
                      className={`absolute top-2 left-2 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded ${
                        item.tag.includes("%")
                          ? "bg-green-500"
                          : item.tag === "New"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}>
                      {item.tag}
                    </span>
                  )}{" "}
                  <div className="flex-1 flex flex-col items-center justify-center relative p-2 sm:p-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={180}
                      height={180}
                      className="mx-auto object-contain max-h-32 sm:max-h-48 transform group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Color Options */}
                    <div className="flex justify-center gap-1 mt-2">
                      {getAvailableColors(item).map((color, index) => (
                        <div
                          key={color.name}
                          className="w-4 h-4 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className="absolute top-0 right-0 p-2.5 sm:p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity touch-manipulation"
                      aria-label="Add to favorites">
                      <FaHeart
                        className={`w-4 h-4 sm:w-4 sm:h-4 ${
                          isFavorite(item.id)
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-auto space-y-1.5">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                      {item.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                    <div>
                      {item.oldPrice && (
                        <p className="text-[10px] sm:text-xs text-gray-400 line-through">
                          Rs {item.oldPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="text-blue-600 font-semibold text-sm sm:text-base">
                        Rs {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                      <span className="border border-gray-300 text-orange-600 font-bold px-2 py-1 rounded-full">
                        EMI
                      </span>
                      <span className="border border-gray-300 text-blue-600 font-bold px-2 py-1 rounded-full">
                        <FaTruck className="inline-block mr-1 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        Fatafat Delivery
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                page === i ? "bg-blue-600" : "bg-gray-300"
              } transition-colors`}
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
}
