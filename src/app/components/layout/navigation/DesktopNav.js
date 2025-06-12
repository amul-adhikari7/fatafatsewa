"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { CartIcon } from "./NavigationIcons";

/**
 * Desktop navigation component that appears in the header on larger screens
 */
const DesktopNav = ({
  isAuthenticated,
  user,
  logout,
  onAuthClick,
  cartItemsCount = 0,
  favoritesCount = 0,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="items-center hidden gap-4 lg:flex">
      {/* Account/Auth */}
      {isAuthenticated ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 p-2.5 text-gray-700 rounded-lg transition-all ${
              isMenuOpen
                ? "bg-gray-50 text-blue-600"
                : "hover:text-blue-600 hover:bg-gray-50"
            }`}>
            <FaUser className="w-6 h-6" />
            <span className="hidden text-sm font-medium sm:block">
              {user?.name || "Account"}
            </span>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-48 z-50`}>
            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              My Account
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              My Orders
            </Link>
            <button
              onClick={logout}
              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <FaSignOutAlt className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={onAuthClick}
          className="flex items-center gap-2 p-2.5 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
          aria-label="Sign in">
          <FaUser className="w-6 h-6" />
          <span className="hidden sm:block">Sign In</span>
        </button>
      )}

      {/* Wishlist */}
      <Link
        href="/favorites"
        className="flex items-center gap-2 p-2.5 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all relative"
        aria-label="Wishlist">
        <div className="relative">
          <FaHeart className="w-6 h-6" />
          {favoritesCount > 0 && (
            <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
              {favoritesCount}
            </span>
          )}
        </div>
        <span className="hidden sm:block">Wishlist</span>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="flex items-center gap-2 p-2.5 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all relative"
        aria-label="Shopping cart">
        <CartIcon count={cartItemsCount} />
        <span className="hidden sm:block">Cart</span>
      </Link>
    </nav>
  );
};

export default DesktopNav;
