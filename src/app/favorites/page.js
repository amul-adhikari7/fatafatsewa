"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useFavorites } from "../components/contexts/FavoritesContext";
import { useCart } from "../components/contexts/CartContext";
import { MainLayout } from "../components/layout";

export default function FavoritesPage() {
  const { getFavoriteProducts, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const favoriteProducts = getFavoriteProducts();

  if (favoriteProducts.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl sm:text-3xl font-bold mb-12 text-gray-800">
            My Favorites
          </h1>
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-200 animate-pulse">
              <FaHeart className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Start adding items to your favorites to keep track of products you
              love!
            </p>
            <Link
              href="/"
              className="bg-orange-500 text-white px-8 py-3 rounded-xl inline-flex items-center gap-2 font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <span>Browse Products</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              My Favorites
            </h1>
            <p className="text-gray-600">
              {favoriteProducts.length}{" "}
              {favoriteProducts.length === 1 ? "item" : "items"}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors">
            <span>Continue Shopping</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
              <div className="relative aspect-square bg-white overflow-hidden rounded-t-2xl">
                <Link
                  href={`/product/${product.id}`}
                  className="block w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={product.image || "/assets/logo.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-all duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                      {product.tag}
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="absolute top-4 right-16 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => toggleFavorite(product)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group/btn"
                  title="Remove from favorites">
                  <FaHeart className="w-5 h-5 text-red-500 group-hover/btn:text-red-600" />
                </button>
              </div>

              <div className="p-6">
                <Link
                  href={`/product/${product.id}`}
                  className="block group/title">
                  <h3 className="font-semibold text-gray-800 group-hover:title:text-orange-500 transition-colors line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-orange-500">
                    Rs. {product.price?.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {product.oldPrice?.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount || 0})
                    </span>
                  </div>
                )}{" "}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-all duration-300 font-medium group/delete w-1/3">
                    <FaHeart className="w-4 h-4 transition-transform duration-300 group-hover/delete:scale-110" />
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-orange-500 transition-all duration-300 font-medium group/cart flex-1">
                    <FaShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/cart:scale-110" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
