"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaRegHeart, FaTruck } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useCart } from "../../../../components/contexts/CartContext";
import { useFavorites } from "../../../../components/contexts/FavoritesContext";
import { useProducts } from "../../../../components/contexts/ProductsContext";
import { MainLayout } from "../../../../components/layout";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { mobiles, laptops, homeAppliances, loading } = useProducts();
  const [selectedColor, setSelectedColor] = useState(0);

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

  // Find product across all sections
  const product = React.useMemo(() => {
    if (!mobiles || !laptops || !homeAppliances) return null;
    const allProducts = [...mobiles, ...laptops, ...homeAppliances];
    return allProducts.find((p) => p.id === parseInt(id)) || null;
  }, [id, mobiles, laptops, homeAppliances]);

  // Define availableColors after product is defined
  const availableColors = product ? getAvailableColors(product) : [];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500">Product not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 whitespace-nowrap overflow-x-auto">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/components/features/products"
            className="hover:text-blue-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/components/features/${
              product.category?.toLowerCase() || "products"
            }`}
            className="hover:text-blue-600">
            {product.category || "Products"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
            {/* Left Column - Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.tag && (
                  <div
                    className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
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
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {product.description || "No description available"}
                </p>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {product.price}
                </div>
                {product.oldPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      {product.oldPrice}
                    </span>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Select Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`group relative rounded-lg ${
                        selectedColor === index
                          ? "ring-2 ring-blue-600"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                      title={color.name}>
                      <div
                        style={{ backgroundColor: color.hex }}
                        className={`w-8 h-8 rounded-lg border border-gray-300 shadow-sm ${
                          color.textColor === "white"
                            ? "text-white"
                            : "text-black"
                        }`}>
                        {selectedColor === index && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span className="sr-only">{color.name}</span>
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {availableColors[selectedColor]?.name}
                </p>
              </div>

              {/* EMI Options */}
              <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2">
                <h3 className="font-semibold text-blue-900 text-sm sm:text-base">
                  EMI Options Available
                </h3>
                <p className="text-xs sm:text-sm text-blue-600">
                  Based on 12 months EMI
                </p>
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="border border-gray-300 text-orange-600 font-bold px-2 py-1 rounded-full">
                    EMI
                  </span>
                  <span className="border border-gray-300 text-blue-600 font-bold px-2 py-1 rounded-full">
                    <FaTruck className="inline-block mr-1" />
                    Fatafat Delivery
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={() =>
                    addToCart({
                      ...product,
                      selectedColor: availableColors[selectedColor]?.name,
                    })
                  }
                  className="flex-1 bg-blue-600 text-white py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition flex items-center justify-center gap-2 font-semibold shadow-lg shadow-blue-100 text-sm sm:text-base touch-manipulation">
                  <FaShoppingCart className="text-lg sm:text-xl" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-3.5 sm:p-4 rounded-xl border shadow-lg touch-manipulation ${
                    isFavorite(product.id)
                      ? "bg-pink-50 text-pink-600 border-pink-200 shadow-pink-100"
                      : "bg-gray-50 text-gray-600 border-gray-200 shadow-gray-100"
                  }`}
                  aria-label={
                    isFavorite(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }>
                  {isFavorite(product.id) ? (
                    <FaHeart className="text-xl" />
                  ) : (
                    <FaRegHeart className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description and Specifications */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mt-4 sm:mt-8">
          {/* Left Column - Product Description */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Product Description
            </h2>
            <div className="prose max-w-none">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.fullDescription ||
                  product.description ||
                  "No description available."}
              </p>
            </div>
          </div>

          {/* Right Column - Product Specifications */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Product Specifications
            </h2>
            <div className="space-y-4">
              {/* Key Features Section */}
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900">
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  {(product.features || []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              {product.specifications && (
                <div className="mt-6">
                  <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900">
                    Technical Details
                  </h3>
                  <div className="grid gap-3">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="grid grid-cols-2 text-sm sm:text-base">
                          <div className="text-gray-600">{key}</div>
                          <div className="text-gray-900">{value}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
