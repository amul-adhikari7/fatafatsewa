"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaTruck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";

const ITEMS_PER_PAGE = 5;

const appliances = [
  {
    id: 1,
    name: "Samsung 253L Double Door Refrigerator",
    description: "Digital Inverter Technology, 3 Star Rating",
    price: "Rs 45,000",
    oldPrice: "Rs 50,000",
    tag: "10% Off",
    image: "/assets/fridge.jpg",
  },
  {
    id: 2,
    name: "LG 7kg Front Load Washing Machine",
    description: "6 Motion Direct Drive, Steam Wash",
    price: "Rs 32,000",
    image: "/assets/washing-machine.jpg",
    tag: "Fastest Delivery",
  },
  {
    id: 3,
    name: "Philips Air Fryer HD9200",
    description: "Rapid Air Technology, 4.1L Capacity",
    price: "Rs 11,000",
    oldPrice: "Rs 13,999",
    image: "/assets/phillips.webp",
    tag: "New",
  },
  {
    id: 4,
    name: "IFB 30L Convection Microwave Oven",
    description: "Auto Cook Menu, Multi Stage Cooking",
    price: "Rs 17,000",
    image: "/assets/microwave.webp",
    tag: "Limited Stock",
  },
  {
    id: 5,
    name: "IFB 30L Convection Microwave Oven",
    description: "Auto Cook Menu, Multi Stage Cooking",
    price: "Rs 17,000",
    image: "/assets/microwave.webp",
    tag: "Limited Stock",
  },
  {
    id: 6,
    name: "IFB 30L Convection Microwave Oven",
    description: "Auto Cook Menu, Multi Stage Cooking",
    price: "Rs 17,000",
    image: "/assets/microwave.webp",
    tag: "Limited Stock",
  },
  {
    id: 7,
    name: "IFB 30L Convection Microwave Oven",
    description: "Auto Cook Menu, Multi Stage Cooking",
    price: "Rs 17,000",
    image: "/assets/microwave.webp",
    tag: "Limited Stock",
  },
];

const HomeAppliances2024 = () => {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(appliances.length / ITEMS_PER_PAGE);
  const visibleAppliances = appliances.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const handleClick = (id) => router.push(`/product/${id}`);

  return (
    <div className="bg-white py-8 sm:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Home Appliances Of 2024
          </h2>
          <button className="bg-blue-100 text-blue-600 text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full hover:bg-blue-200">
            More Products
          </button>
        </div>
        <div className="h-1 bg-orange-500 w-full sm:w-32 mb-4"></div>

        {/* Product Cards - Horizontal scroll on mobile */}
        <div className="relative">
          <div className="overflow-x-auto hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {visibleAppliances.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-xl p-3 relative shadow-sm hover:shadow-xl hover:shadow-blue-200/100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col h-[370px] sm:h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[280px] sm:w-auto"
                  onClick={() => handleClick(item.id)}>
                  {item.tag && (
                    <span
                      className={`absolute top-2 left-2 text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded ${
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
                      className="mx-auto object-contain max-h-36 sm:max-h-48 transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                      className="absolute top-0 right-0 p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaHeart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isFavorite(item.id)
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-auto space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                    <div>
                      {item.oldPrice && (
                        <p className="text-[10px] sm:text-xs text-gray-400 line-through">
                          {item.oldPrice}
                        </p>
                      )}
                      <p className="text-blue-600 font-semibold text-sm sm:text-base">
                        {item.price}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                      <span className="border border-gray-300 text-orange-600 font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                        EMI
                      </span>
                      <span className="border border-gray-300 text-blue-600 font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
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
};

export default HomeAppliances2024;
