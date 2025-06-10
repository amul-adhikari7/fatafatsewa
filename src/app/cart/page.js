"use client";
import React from "react";
import Image from "next/image";
import { MainLayout } from "../components/layout";
import { useCart } from "../components/contexts/CartContext";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <FaShoppingCart className="w-full h-full" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 96px, 128px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-lg mb-4">
                      Rs {item.price?.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-l-lg"
                          aria-label="Decrease quantity">
                          <FaMinus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-100 rounded-r-lg"
                          aria-label="Increase quantity">
                          <FaPlus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-50 rounded-full group"
                        aria-label="Remove item">
                        <FaTrash className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-semibold text-gray-900">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      Rs {cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold text-blue-600">
                        Rs {cartTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>{" "}
                  <Link
                    href="/checkout"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98] mt-6 text-center">
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/"
                    className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
