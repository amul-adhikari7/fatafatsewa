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
  FaSignOutAlt,
} from "react-icons/fa";
import AuthModal from "../features/auth/AuthModal";
import CartModal from "../features/cart/CartModal";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItemsCount, isCartOpen, setIsCartOpen } = useCart();
  const { getFavoriteProducts, toggleFavorite } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();
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
            <div className="w-full lg:w-auto flex items-center justify-between">
              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2.5 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-blue-600 transition-all"
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/assets/logo.svg"
                  alt="Fatafat Logo"
                  width={120}
                  height={40}
                  className="h-8 sm:h-10 w-auto transform hover:scale-105 transition-transform"
                />
              </Link>
              {/* Search Toggle - Desktop */}
              <div className="lg:hidden w-10" />{" "}
              {/* Spacer for mobile layout balance */}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 relative max-w-2xl">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2.5 px-5 pr-12 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-600 bg-gray-50 hover:bg-white focus:bg-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 p-2 hover:bg-gray-100 rounded-full transition-all">
                <FaSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Icons - Desktop Only */}
            <nav className="hidden lg:flex items-center gap-2 sm:gap-3">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="p-2.5 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all">
                    <div className="flex items-center gap-2">
                      <FaUser className="w-6 h-6" />
                      <span className="text-sm hidden sm:block">
                        {user?.name}
                      </span>
                    </div>
                  </button>
                  <div className="hidden group-hover:block absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <FaSignOutAlt className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="p-2.5 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all relative group">
                  <FaUser className="w-6 h-6" />
                  <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded mt-1">
                    Account
                  </span>
                </button>
              )}
              <Link
                href="/favorites"
                className="p-2.5 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all relative group">
                <div className="relative">
                  <FaHeart className="w-6 h-6" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded mt-1">
                  Wishpot
                </span>
              </Link>
              <Link
                href="/cart"
                className="p-2.5 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all relative group">
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
        </div>
      </header>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-blue-600 transition-colors relative">
            <FaSearch className="w-6 h-6" />
            <span className="text-xs mt-1">Search</span>
            {isSearchOpen && (
              <div className="absolute bottom-full left-0 right-0 bg-white shadow-lg p-3 border-t border-gray-100 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2.5 px-5 pr-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-600 bg-gray-50/50 focus:bg-white"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 p-2 hover:bg-gray-100 rounded-full transition-all">
                    <FaSearch className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </button>

          <Link
            href="/favorites"
            className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-red-600 transition-colors relative">
            <div className="relative">
              <FaHeart className="w-6 h-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Wishpot</span>
          </Link>

          <Link
            href="/cart"
            className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-blue-600 transition-colors relative">
            <div className="relative">
              <FaShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link>

          {isAuthenticated ? (
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-blue-600 transition-colors">
              <FaUser className="w-6 h-6" />
              <span className="text-xs mt-1">Account</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center py-3 px-5 text-gray-500 hover:text-blue-600 transition-colors">
              <FaUser className="w-6 h-6" />
              <span className="text-xs mt-1">Sign In</span>
            </button>
          )}
        </div>
      </nav>
      {/* Add bottom padding to main content on mobile */}
      <div className="lg:hidden h-16" /> {/* Spacer for mobile bottom nav */}
      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 py-4">
            <div className="px-4 pb-4 border-b">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                ACCOUNT
              </h3>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                    <FaUser className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        Signed In
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaUser className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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
