"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTimes, FaBars, FaSearch } from "react-icons/fa";

// Components
import {
  Logo,
  MenuToggle,
  SearchBar,
  DesktopNav,
  MobileNav,
  MobileMenu,
} from "./navigation";
import AuthModal from "../features/auth/AuthModal";
import CartModal from "../features/cart/CartModal";

// Hooks and Context
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

/**
 * Main navigation component for the application
 * Handles both desktop and mobile layouts
 */
const Navbar = () => {
  // State Management
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Context Hooks
  const { cartItemsCount, isCartOpen, setIsCartOpen } = useCart();
  const { getFavoriteProducts } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();

  // Derived State
  const favorites = getFavoriteProducts();

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center py-2 lg:py-4 gap-3 lg:gap-8">
            <div className="w-full lg:w-auto flex items-center justify-between">
              {/* Mobile Menu Toggle */}
              <MenuToggle
                isOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {/* Logo */}
              <Logo />

              {/* Mobile Search Toggle */}
              <button
                className="lg:hidden p-2.5 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-blue-600 transition-all"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search">
                <FaSearch className="w-6 h-6" />
              </button>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-2xl w-full">
              <SearchBar isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
            </div>

            {/* Desktop Navigation */}
            <DesktopNav
              user={user}
              isAuthenticated={isAuthenticated}
              cartItemsCount={cartItemsCount}
              favoritesCount={favorites.length}
              onAuthClick={() => setIsAuthModalOpen(true)}
              onCartClick={() => setIsCartOpen(true)}
              onLogout={logout}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={menuOpen}
          user={user}
          isAuthenticated={isAuthenticated}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onLogout={logout}
          onClose={() => setMenuOpen(false)}
        />
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        cartItemsCount={cartItemsCount}
        favoritesCount={favorites.length}
        onCartClick={() => setIsCartOpen(true)}
      />

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
