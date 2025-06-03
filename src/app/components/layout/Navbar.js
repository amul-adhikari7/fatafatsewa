"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import AuthModal from "../features/auth/AuthModal";
import CartModal from "../features/cart/CartModal";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItemsCount, isCartOpen, setIsCartOpen } = useCart();
  const { getFavoriteProducts, toggleFavorite } = useFavorites();
  const favoritesRef = useRef(null);

  const favorites = getFavoriteProducts();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target)
      ) {
        setIsFavoritesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center py-2 lg:py-4 gap-3 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/assets/logo.svg"
                alt="Fatafat Logo"
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <FaSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Toggle */}
            <button
              className="lg:hidden text-gray-700 hover:text-blue-600"
              onClick={() => setIsSearchOpen(!isSearchOpen)}>
              {isSearchOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaSearch className="w-6 h-6" />
              )}
            </button>

            {/* Navigation Icons */}
            <nav className="flex items-center gap-1 sm:gap-2 lg:gap-4">
              <Link
                href="/account"
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative group">
                <FaUser className="w-6 h-6" />
                <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded mt-1">
                  Account
                </span>
              </Link>
              <Link
                href="/favorites"
                className="p-2 text-gray-700 hover:text-red-600 transition-colors relative group">
                <div className="relative">
                  <FaHeart className="w-6 h-6" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded mt-1">
                  Favorites
                </span>
              </Link>
              <Link
                href="/cart"
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative group">
                <div className="relative">
                  <FaShoppingCart className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded mt-1">
                  Cart
                </span>
              </Link>
            </nav>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                  <FaSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
