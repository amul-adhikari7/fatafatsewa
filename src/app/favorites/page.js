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

  // Get available colors based on product type
  const getAvailableColors = (product) => {
    if (product?.name?.toLowerCase().includes("iphone")) {
      return [
        { name: "Space Black", hex: "#1F2937", textColor: "white" },
        { name: "Natural Titanium", hex: "#E5E7EB", textColor: "black" },
        { name: "Blue Titanium", hex: "#1E40AF", textColor: "white" },
        { name: "White Titanium", hex: "#FFFFFF", textColor: "black" },
      ];
    } else if (product?.name?.toLowerCase().includes("samsung")) {
      return [
        { name: "Titanium Gray", hex: "#4A4A4A", textColor: "white" },
        { name: "Titanium Black", hex: "#1F2937", textColor: "white" },
        { name: "Titanium Violet", hex: "#7E3AF2", textColor: "white" },
        { name: "Titanium Yellow", hex: "#FCD34D", textColor: "black" },
      ];
    } else if (product?.name?.toLowerCase().includes("macbook")) {
      return [
        { name: "Space Gray", hex: "#1F2937", textColor: "white" },
        { name: "Silver", hex: "#E5E7EB", textColor: "black" },
      ];
    } else if (product?.name?.toLowerCase().includes("nothing")) {
      return [
        { name: "White", hex: "#FFFFFF", textColor: "black" },
        { name: "Black", hex: "#1F2937", textColor: "white" },
      ];
    } else if (product?.name?.toLowerCase().includes("laptop")) {
      return [
        { name: "Shadow Black", hex: "#1F2937", textColor: "white" },
        { name: "Arctic Silver", hex: "#E5E7EB", textColor: "black" },
        { name: "Mineral Blue", hex: "#1E40AF", textColor: "white" },
      ];
    }
    // Default colors for other products
    return [
      { name: "Black", hex: "#1F2937", textColor: "white" },
      { name: "Silver", hex: "#E5E7EB", textColor: "black" },
      { name: "Blue", hex: "#1E40AF", textColor: "white" },
      { name: "Gold", hex: "#B45309", textColor: "white" },
    ];
  };

  if (favoriteProducts.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">My Favorites</h1>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <FaHeart className="w-full h-full" />
            </div>
            <h2 className="text-xl font-semibold mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8">
              Start adding items to your favorites to keep track of products you
              love!
            </p>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block font-semibold hover:bg-blue-700 transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Favorites</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium">
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.tag && (
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                        product.tag === "Out Of Stock"
                          ? "bg-red-100 text-red-600"
                          : product.tag === "New"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                      {product.tag}
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link
                  href={`/product/${product.id}`}
                  className="block group-hover:text-blue-600">
                  {" "}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                {/* Color Display */}
                <div className="flex gap-2 items-center mb-3">
                  <span className="text-sm text-gray-600">
                    Available Colors:
                  </span>
                  <div className="flex gap-1">
                    {getAvailableColors(product).map((color, index) => (
                      <div
                        key={index}
                        style={{ backgroundColor: color.hex }}
                        className={`w-4 h-4 rounded-full border border-gray-200 shadow-sm ${
                          color.textColor === "white"
                            ? "text-white"
                            : "text-black"
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
                {/* Color display section */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Available Colors:
                  </span>
                  <div className="flex gap-2 mt-1">
                    {getAvailableColors(product).map((color) => (
                      <span
                        key={color.name}
                        className="flex items-center gap-1">
                        <span
                          className="block w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: color.hex,
                            borderColor:
                              color.textColor === "white"
                                ? "rgba(255, 255, 255, 0.6)"
                                : "rgba(0, 0, 0, 0.6)",
                            borderWidth: "2px",
                            borderStyle: "solid",
                          }}
                        />
                        <span
                          className={`text-xs ${
                            color.textColor === "white"
                              ? "text-white"
                              : "text-black"
                          }`}>
                          {color.name}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>{" "}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="w-full bg-red-50 text-red-600 py-2.5 px-4 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2 font-medium"
                    aria-label="Remove from favorites">
                    <FaHeart className="w-4 h-4" />
                    <span>Remove from Favorites</span>
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
