"use client";

import Link from "next/link";
import {
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";

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
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu">
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1">
            {/* Account Section */}
            <div className="p-4 border-b">
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
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick();
                    onClose();
                  }}
                  className="w-full flex items-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaUser className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Navigation Links */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">MENU</h3>
              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={onClose}
                  className="w-full flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaHome className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/orders"
                  onClick={onClose}
                  className="w-full flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaClipboardList className="w-4 h-4" />
                  <span>My Orders</span>
                </Link>
                <Link
                  href="/account"
                  onClick={onClose}
                  className="w-full flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaCog className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
