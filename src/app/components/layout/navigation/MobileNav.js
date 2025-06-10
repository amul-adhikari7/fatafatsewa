"use client";

import Link from "next/link";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { SearchBar } from "./"; // Import from the same directory using the barrel file

/**
 * Mobile navigation bar component that appears at the bottom of the screen on mobile devices
 */
const MobileNav = ({
  isSearchOpen,
  setIsSearchOpen,
  cartItemsCount = 0,
  favoritesCount = 0,
  onCartClick,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex items-center justify-around">
        {/* Search Button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-blue-600 transition-colors relative"
          aria-label="Toggle search">
          <FaSearch className="w-6 h-6" />
          <span className="text-xs mt-1">Search</span>
          {isSearchOpen && (
            <div className="absolute bottom-full left-0 right-0 bg-white p-4 shadow-lg">
              <SearchBar autoFocus onOpenChange={setIsSearchOpen} />
            </div>
          )}
        </button>

        {/* Wishlist Link */}
        <Link
          href="/favorites"
          className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-red-600 transition-colors relative">
          <div className="relative">
            <FaHeart className="w-6 h-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">Wishlist</span>
        </Link>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-blue-600 transition-colors relative"
          aria-label="Open cart">
          <div className="relative">
            <FaShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">Cart</span>
        </button>

        {/* Account Link */}
        <Link
          href="/account"
          className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-blue-600 transition-colors">
          <FaUser className="w-6 h-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
