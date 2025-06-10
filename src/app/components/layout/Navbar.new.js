"use client";

import { useState } from "react";

// Components
import {
  Logo,
  MenuToggle,
  DesktopNav,
  MobileNav,
  MobileMenu,
} from "./navigation";
import SearchBar from "./navigation/SearchBar";
import AuthModal from "../features/auth/AuthModal";
import CartModal from "../features/cart/CartModal";

// Hooks and Context
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

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
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center py-2 lg:py-4 gap-3 lg:gap-8">
            <div className="w-full lg:w-auto flex items-center justify-between">
              <MenuToggle
                isOpen={menuOpen}
                onToggle={() => setMenuOpen(!menuOpen)}
              />
              <Logo />
              <div className="lg:hidden w-10" />
            </div>

            <div className="hidden lg:block flex-1 max-w-2xl w-full">
              <SearchBar />
            </div>

            <DesktopNav
              isAuthenticated={isAuthenticated}
              user={user}
              logout={logout}
              setIsAuthModalOpen={setIsAuthModalOpen}
              favorites={favorites}
              cartItemsCount={cartItemsCount}
            />
          </div>
        </div>
      </header>

      <MobileNav
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        isAuthenticated={isAuthenticated}
        setMenuOpen={setMenuOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
        favorites={favorites}
        cartItemsCount={cartItemsCount}
      />

      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />

      {/* Bottom spacer for mobile navigation */}
      <div className="lg:hidden h-16" />

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
