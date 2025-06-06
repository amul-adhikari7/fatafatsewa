"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../components/contexts/CartContext";
import { useFavorites } from "../../components/contexts/FavoritesContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const getProductUrl = (id) => `/product/${id}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex-shrink-0 w-[280px] sm:w-auto">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Link href={getProductUrl(product.id)}>
          <div className="relative w-full h-full p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transform group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>
        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-all transform hover:scale-110 shadow-sm"
          aria-label="Add to favorites">
          <FaHeart
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              isFavorite(product.id) ? "text-red-500" : "text-current"
            }`}
          />
        </button>
        {product.tag && (
          <span className="absolute top-2 left-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-blue-500 text-white rounded-full">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <Link href={getProductUrl(product.id)}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 space-y-1.5 sm:space-y-2">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                Rs. {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-3 sm:p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 transition-colors group-hover:shadow-md active:scale-[0.98]">
          <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
