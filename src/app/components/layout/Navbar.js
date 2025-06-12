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
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const { getFavoriteProducts } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();

  // Derived State
  const favorites = getFavoriteProducts();
  const cartItemsCount = cart?.length || 0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-3 py-2 lg:flex-row lg:py-4 lg:gap-8">
            <div className="flex items-center justify-between w-full lg:w-auto">
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
            <div className="flex-1 hidden w-full max-w-2xl lg:block">
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
