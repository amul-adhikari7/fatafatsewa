"use client";

import Link from "next/link";
import { FaHome, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

/**
 * Mobile navigation bar component that appears at the bottom of the screen on mobile devices
 */
const MobileNav = ({ cartItemsCount = 0, favoritesCount = 0, onCartClick }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/75 backdrop-blur-xl border-t border-gray-100/20 shadow-lg z-40">
      <div className="flex items-center justify-around px-1 max-w-md mx-auto">
        {/* Home Link */}
        <Link
          href="/"
          className="group flex flex-col items-center py-2 px-3 text-gray-600 active:scale-95 transition-all duration-200">
          <div className="relative p-2.5 rounded-2xl bg-gray-50/80 group-hover:bg-blue-50/90 group-hover:shadow-md transition-all duration-200">
            <FaHome className="w-[22px] h-[22px] group-hover:text-blue-600 transition-colors" />
          </div>
          <span className="text-[11px] mt-1.5 font-semibold tracking-wide opacity-90 group-hover:text-blue-600">
            Home
          </span>
        </Link>

        {/* Wishlist Link */}
        <Link
          href="/favorites"
          className="group flex flex-col items-center py-2 px-3 text-gray-600 active:scale-95 transition-all duration-200">
          <div className="relative p-2.5 rounded-2xl bg-gray-50/80 group-hover:bg-red-50/90 group-hover:shadow-md transition-all duration-200">
            <FaHeart className="w-[22px] h-[22px] group-hover:text-red-500 transition-colors" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md border-[1.5px] border-white">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1.5 font-semibold tracking-wide opacity-90 group-hover:text-red-500">
            Wishlist
          </span>
        </Link>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="group flex flex-col items-center py-2 px-3 text-gray-600 active:scale-95 transition-all duration-200"
          aria-label="Open cart">
          <div className="relative p-2.5 rounded-2xl bg-gray-50/80 group-hover:bg-blue-50/90 group-hover:shadow-md transition-all duration-200">
            <FaShoppingCart className="w-[22px] h-[22px] group-hover:text-blue-600 transition-colors" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md border-[1.5px] border-white">
                {cartItemsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1.5 font-semibold tracking-wide opacity-90 group-hover:text-blue-600">
            Cart
          </span>
        </button>

        {/* Account Link */}
        <Link
          href="/account"
          className="group flex flex-col items-center py-2 px-3 text-gray-600 active:scale-95 transition-all duration-200">
          <div className="relative p-2.5 rounded-2xl bg-gray-50/80 group-hover:bg-blue-50/90 group-hover:shadow-md transition-all duration-200">
            <FaUser className="w-[22px] h-[22px] group-hover:text-blue-600 transition-colors" />
          </div>
          <span className="text-[11px] mt-1.5 font-semibold tracking-wide opacity-90 group-hover:text-blue-600">
            Account
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
