"use client";

import Link from "next/link";
import {
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaClipboardList,
  FaCog,
  FaMobile,
  FaLaptop,
  FaGamepad,
  FaHeadphones,
  FaTv,
} from "react-icons/fa";

const categories = [
  { name: "Mobiles", icon: FaMobile, href: "/category/mobiles" },
  { name: "Laptops", icon: FaLaptop, href: "/category/laptops" },
  { name: "Gaming", icon: FaGamepad, href: "/category/gaming" },
  { name: "Audio", icon: FaHeadphones, href: "/category/audio" },
  { name: "Electronics", icon: FaTv, href: "/category/electronics" },
];

/**
 * Mobile menu drawer component that slides in from the left
 */
const MobileMenu = ({
  isOpen,
  user,
  isAuthenticated,
  onAuthClick,
  onLogout,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden translate-x-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="Close menu">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            <div className="p-4 border-b">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              )}
            </div>

            {/* Main Navigation */}
            <nav className="p-2">
              <Link
                href="/"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={onClose}>
                <FaHome className="w-5 h-5 text-gray-500" />
                <span>Home</span>
              </Link>

              {/* Categories Section */}
              <div className="mt-2 border-t pt-2">
                <p className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">
                  Categories
                </p>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={onClose}>
                    <category.icon className="w-5 h-5 text-gray-500" />
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>

              {/* User Actions */}
              {isAuthenticated && (
                <div className="mt-2 border-t pt-2">
                  <p className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">
                    Account
                  </p>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={onClose}>
                    <FaClipboardList className="w-5 h-5 text-gray-500" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={onClose}>
                    <FaCog className="w-5 h-5 text-gray-500" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      onLogout?.();
                      onClose();
                    }}
                    className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
                    <FaSignOutAlt className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
