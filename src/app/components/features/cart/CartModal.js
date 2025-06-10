"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTimes, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";
const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* Sliding Cart Panel */}
      <div className="fixed top-0 right-0 h-full w-[95vw] sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
            aria-label="Close cart">
            <FaTimes className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {cart.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 text-gray-300">
                <FaShoppingCart className="w-full h-full" />
              </div>
              <p className="text-gray-500 text-center mb-4 sm:mb-6 px-4">
                Your cart is empty. Add some products to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm sm:text-base">
                      Rs {item.price?.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Decrease quantity">
                        <FaMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600" />
                      </button>
                      <span className="w-8 text-center text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Increase quantity">
                        <FaPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2.5 hover:bg-red-50 rounded-full group"
                    aria-label="Remove item">
                    <FaTrash className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart.length > 0 && (
          <div className="sticky bottom-0 border-t p-3 sm:p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-sm sm:text-base text-gray-600">
                Subtotal:
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                Rs {cartTotal?.toLocaleString()}
              </span>
            </div>
            <div className="space-y-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full text-center bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200">
                View Cart
              </Link>
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 sm:py-3 px-4 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98] touch-manipulation"
                aria-label="Proceed to checkout"
                onClick={() => {
                  onClose();
                  // Add any additional logic for proceeding to checkout
                  router.push("/checkout");
                }}>
                Proceed to Checkout
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
