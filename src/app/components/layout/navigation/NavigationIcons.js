"use client";

import { FaShoppingCart, FaHeart } from "react-icons/fa";

/**
 * Cart icon component with optional count badge
 */
export const CartIcon = ({ count }) => (
  <div className="relative">
    <FaShoppingCart className="w-6 h-6" />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {count}
      </span>
    )}
  </div>
);

/**
 * Wishlist icon component with optional count badge
 */
export const WishlistIcon = ({ count }) => (
  <div className="relative">
    <FaHeart className="w-6 h-6" />
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {count}
      </span>
    )}
  </div>
);
