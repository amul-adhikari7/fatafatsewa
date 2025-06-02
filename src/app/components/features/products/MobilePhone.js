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
        const response = await fetch("/api/products/mobile");
        if (!response.ok) {
          throw new Error("Failed to fetch mobile phones");
        }
        const data = await response.json();

        // Log the data to inspect its structure
        console.log("Fetched data:", data);

        // Ensure the data is an array before setting it
        if (Array.isArray(data)) {
          setMobilePhones(data);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format");
        }
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

  const handleClick = (id) => router.push(`/product/${id}`);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <div className="bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-3 h-[400px] animate-pulse">
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
    );
  }

  if (error) {
    return (
      <div className="bg-white py-10 px-4">
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
    <div className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Mobile Phones</h2>
          <button className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full hover:bg-blue-200">
            More Products
          </button>
        </div>
        <div className="h-1 bg-orange-500 w-32 mb-4"></div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {visiblePhones.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-3 relative shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col h-[400px]"
              onClick={() => handleClick(item.id)}>
              {item.tag && (
                <span
                  className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-0.5 rounded ${
                    item.tag.includes("%")
                      ? "bg-green-500"
                      : item.tag === "New"
                      ? "bg-blue-500"
                      : "bg-orange-500"
                  }`}>
                  {item.tag}
                </span>
              )}
              <div className="flex-1 flex items-center justify-center relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="mx-auto object-contain max-h-48 transform group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                  className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaHeart
                    className={`text-lg ${
                      isFavorite(item.id)
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  />
                </button>
              </div>
              <div className="mt-auto space-y-1">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {item.description}
                </p>
                <div>
                  {item.oldPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      Rs {item.oldPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-blue-600 font-semibold text-base">
                    Rs {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 text-xs text-gray-600">
                  <span className="border border-gray-300 text-orange-600 font-bold px-2 py-0.5 rounded-full">
                    EMI
                  </span>
                  <span className="border border-gray-300 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                    <FaTruck className="inline-block mr-1" />
                    Fatafat Delivery
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full ${
                page === i ? "bg-blue-600" : "bg-gray-300"
              } transition-colors`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
