"use client";
import React, { useState, useEffect } from "react";
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
  const handleClick = (id) => router.push(`/product/${id}`);

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
            Gadgets & Accessories
          </h2>
          <button className="bg-blue-100 text-blue-600 text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full hover:bg-blue-200">
            More Products
          </button>
        </div>
        <div className="h-1 bg-orange-500 w-[100%] sm:w-32 mb-4"></div>

        {/* Product Cards - Horizontal scroll on mobile */}
        <div className="relative">
          <div className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {gadgets.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 relative shadow-sm hover:shadow-xl hover:shadow-blue-200/100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col h-[360px] sm:h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[260px] sm:w-auto touch-pan-x"
                  onClick={() => router.push(`/product/${item.id}`)}>
                  {item.tag && (
                    <span
                      className={`absolute top-2 left-2 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded ${
                        item.tag.includes("%")
                          ? "bg-green-500"
                          : item.tag === "NEW"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }`}>
                      {item.tag}
                    </span>
                  )}
                  <div className="flex-1 flex flex-col items-center justify-center relative p-2 sm:p-3">
                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 z-10" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/product/${item.id}`);
                        }}
                        className="p-2 rounded-full bg-white shadow-lg hover:scale-110 transition-transform duration-200"
                        title="Quick View">
                        <MdOutlinePreview className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/compare?product=${item.id}`);
                        }}
                        className="p-2 rounded-full bg-white shadow-lg hover:scale-110 transition-transform duration-200"
                        title="Compare">
                        <IoGitCompareOutline className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={180}
                      height={180}
                      className="mx-auto object-contain max-h-32 sm:max-h-48 transform group-hover:scale-105 transition-transform duration-300"
                    />{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 touch-manipulation"
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
                  <div className="mt-auto space-y-1.5">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                      {item.name}
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
                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.features?.map((feature, index) => (
                        <span
                          key={index}
                          className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>{" "}
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                    <span className="border border-gray-300 text-orange-600 font-bold px-2 py-1 rounded-full">
                      EMI
                    </span>
                    <span className="border border-gray-300 text-blue-600 font-bold px-2 py-1 rounded-full">
                      Free Delivery
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
}
