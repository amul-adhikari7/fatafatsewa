"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart, FaCartPlus, FaTruck } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";
import { useScrollableCard } from "../../../components/hooks/useScrollableCard";

const accessories = [
  {
    id: 1,
    name: "Anker Soundcore Strike 1 Gaming Headphones",
    description: "RGB Gaming Headset with Surround Sound",
    price: "Rs 8,999",
    tag: "Fastest Delivery",
    image: "/assets/headphones.webp",
  },
  {
    id: 2,
    name: "Nintendo Switch - OLED Model White Joy-Con",
    description: "Latest Gaming Console with Enhanced Display",
    price: "Rs 45,999",
    oldPrice: "Rs 49,999",
    tag: "8% Off",
    image: "/assets/nintendo.png",
  },
  {
    id: 3,
    name: "ONIKUMA K9 Pro Gaming Headset",
    description: "7.1 Surround Sound with Cat Ears",
    price: "Rs 4,999",
    oldPrice: "Rs 5,999",
    tag: "New",
    image:
      "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
  },
  {
    id: 4,
    name: "Fantech Gaming Mouse",
    description: "16000 DPI with RGB Lighting",
    price: "Rs 1,899",
    oldPrice: "Rs 2,299",
    tag: "Limited Stock",
    image: "/assets/fantech-red.jpg",
  },
];

const ProductCard = ({
  accessory,
  onCardClick,
  onAddToCart,
  toggleFavorite,
  isFavorite,
}) => {
  const { touchHandlers } = useScrollableCard(() => onCardClick(accessory));

  return (
    <div
      {...touchHandlers}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col min-h-[380px] sm:min-h-[420px] transform hover:-translate-y-1 flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto touch-pan-x snap-start border border-gray-100/50"
      onClick={() => onCardClick(accessory)}>
      <div className="relative w-full overflow-hidden aspect-square rounded-t-2xl">
        {accessory.tag && (
          <span
            className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-md ${
              accessory.tag === "NEW"
                ? "bg-purple-500/90"
                : accessory.tag.includes("Off")
                ? "bg-blue-500/90"
                : "bg-orange-500/90"
            } shadow-lg`}>
            {accessory.tag}
          </span>
        )}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/5 to-transparent" />
        <Image
          src={accessory.image}
          alt={accessory.name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110"
        />
        <div className="absolute z-20 flex flex-col gap-2 transition-opacity opacity-0 top-3 right-3 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(accessory);
            }}
            className="p-2 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-50">
            <FaHeart
              className={
                isFavorite ? "w-4 h-4 text-red-500" : "w-4 h-4 text-gray-600"
              }
            />
          </button>
          <button className="p-2 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-50">
            <MdOutlinePreview className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-50">
            <IoGitCompareOutline className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="mb-1 text-sm font-medium text-gray-700 line-clamp-2">
          {accessory.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {accessory.description}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-lg font-semibold text-transparent bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text">
            {accessory.price}
          </span>
          {accessory.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {accessory.oldPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaTruck className="w-3 h-3" />
            <span>Free Delivery</span>
          </div>
          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">
            EMI
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(e, accessory);
        }}
        className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white transition-colors bg-gradient-to-r from-blue-600 to-violet-600 rounded-b-2xl hover:from-blue-700 hover:to-violet-700">
        <FaCartPlus className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
};

export default function GamingAccessories2024() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = useCallback(
    (item) => {
      router.push(`/product/${item.id}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (e, item) => {
      e.stopPropagation();
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    },
    [addToCart]
  );

  if (loading) {
    return (
      <div className="px-3 py-6 bg-white sm:py-10 sm:px-4">
        <div className="mx-auto max-w-7xl">
          <div className="px-3 -mx-3 overflow-x-auto hide-scrollbar sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 min-w-[280px]">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm h-[380px] sm:h-[420px] animate-pulse flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto">
                  <div className="h-48 bg-gray-200 rounded-t-2xl" />
                  <div className="p-4 space-y-4">
                    <div className="w-3/4 h-4 bg-gray-200 rounded" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded" />
                    <div className="w-1/4 h-4 bg-gray-200 rounded" />
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
    <div className="px-3 py-6 bg-white sm:py-10 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="relative text-xl font-bold text-gray-900 sm:text-2xl">
            Gaming Accessories
            <div className="w-full h-1 mt-2 bg-gradient-to-r from-orange-500 to-blue-500 sm:w-32" />
          </h2>
          <button
            onClick={() => router.push("/category/gaming")}
            className="px-4 py-2 text-xs transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-violet-600 sm:text-sm text-white rounded-full hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="px-3 -mx-3 overflow-x-auto hide-scrollbar sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 min-w-[280px]">
            {accessories.map((accessory) => (
              <ProductCard
                key={accessory.id}
                accessory={accessory}
                onCardClick={handleCardClick}
                onAddToCart={handleAddToCart}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite(accessory)}
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
