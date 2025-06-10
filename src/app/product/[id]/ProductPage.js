"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaEye } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "@/app/store/productsSlice";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/components/contexts/CartContext";
import { useFavorites } from "@/app/components/contexts/FavoritesContext";
import { DeliveryInfo } from "@/app/components/ui";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [viewerCount, setViewerCount] = useState(18);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [emiAmount, setEmiAmount] = useState(0);

  const fallbackImage = "/assets/placeholder.png";

  // Handle color selection with visual feedback
  const handleColorSelect = (index) => {
    setSelectedColor(index);
  };

  // Generate 4 images for the thumbnails
  const thumbnailImages = Array(4).fill(product?.image);

  // Create an array of 4 identical images if no multiple images are provided
  const baseImageUrl = product?.images?.[0] || product?.image || fallbackImage;
  const productImages =
    product?.images?.length > 0 ? product.images : Array(4).fill(baseImageUrl);
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase or decrease the viewer count between 15-22
      setViewerCount((prev) => {
        const change = Math.random() < 0.5 ? -1 : 1;
        const newCount = prev + change;
        return newCount < 15 ? 16 : newCount > 22 ? 21 : newCount;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

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

  // Define availableColors after product is defined
  const availableColors = product ? getAvailableColors(product) : [];

  // Price calculations
  const hasDiscount = product?.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Stock info (simulate for now)
  const stock = product?.stock || 3;

  // Rating (simulate if not present)
  const rating = product?.rating || 4.5;
  const reviewCount = product?.reviewCount || 10;

  // SKU (simulate if not present)
  const sku = product?.sku || `FS_LP_${product?.id}`;
  // Handlers
  const handleAddToCart = () => {
    const selectedColorInfo = availableColors[selectedColor];
    addToCart({
      ...product,
      quantity,
      selectedColor: selectedColorInfo?.name,
      colorHex: selectedColorInfo?.hex,
    });
  };
  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  // Add this function to calculate EMI
  const calculateEMI = (price) => {
    const annualInterestRate = 11.5;
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const tenure = 12;
    const emi =
      (price *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenure)) /
      (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    return Math.round(emi);
  };

  useEffect(() => {
    if (product?.price) {
      setEmiAmount(calculateEMI(product.price));
    }
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
        {/* Main product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left: Image carousel */}
          <div className="flex flex-col items-center">
            <div className="relative w-full flex justify-center">
              <div className="relative w-full h-[400px] sm:h-[500px] bg-white rounded-2xl flex items-center justify-center overflow-hidden group cursor-zoom-in shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/5" />
                <Image
                  src={productImages[selectedImage] || fallbackImage}
                  alt={product?.name || "Product Image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                  style={{ objectFit: "contain" }}
                  className="transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            </div>
            {/* Thumbnail Gallery */}
            <div className="mt-4 flex gap-2 overflow-x-auto px-2 py-1 max-w-full">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary-500 shadow-md"
                      : "border-transparent hover:border-primary-300"
                  }`}>
                  <Image
                    src={productImages[index] || fallbackImage}
                    alt={`${product?.name || "Product"} - View ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 80px, 80px"
                    style={{ objectFit: "cover" }}
                    className="transition-opacity hover:opacity-80"
                  />
                </button>
              ))}
            </div>
            {/* Product Description in left column */}
            {product.description && (
              <div className="mt-12 w-full bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-600">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    Product Description
                  </h3>
                </div>
                <div className="relative">
                  <div
                    className={`p-6 prose prose-sm max-w-none text-gray-600 leading-relaxed ${
                      !isDescriptionExpanded ? "max-h-32 overflow-hidden" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  {!isDescriptionExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50/90 to-transparent" />
                  )}
                  <button
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="w-full mt-2 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 transition-colors">
                    {isDescriptionExpanded ? (
                      <>
                        Show Less
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        Read More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div className="flex flex-col gap-2">
            {/* Product Information Section */}
            <div className="mb-2">
              <table className="min-w-full text-sm text-gray-700">
                <tbody>
                  {product.brand && (
                    <tr>
                      <td className="pr-2 font-semibold">Brand:</td>
                      <td>{product.brand}</td>
                    </tr>
                  )}
                  {product.model && (
                    <tr>
                      <td className="pr-2 font-semibold">Model:</td>
                      <td>{product.model}</td>
                    </tr>
                  )}
                  {product.category && (
                    <tr>
                      <td className="pr-2 font-semibold">Category:</td>
                      <td>{product.category}</td>
                    </tr>
                  )}
                  {product.warranty && (
                    <tr>
                      <td className="pr-2 font-semibold">Warranty:</td>
                      <td>{product.warranty}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Badges */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium">
                Mega Deal
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-xs font-medium">
                Selling Out Fast
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-medium">
                Calculate EMI
              </span>
            </div>
            {/* SKU and Rating */}
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">SKU: {sku}</span>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-blue-600 font-medium">{rating}</span>
                <Link
                  href="#reviews"
                  className="text-blue-600 hover:text-blue-700 hover:underline">
                  {reviewCount} reviews
                </Link>
              </div>
            </div>
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>{" "}
            {/* Price section */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-700">
                    Rs. {product.price?.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-base text-gray-400 line-through">
                        Rs. {product.oldPrice?.toLocaleString()}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        {discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">EMI from</span>
                  <span className="text-base font-semibold text-blue-600">
                    Rs. {emiAmount?.toLocaleString()}/mo
                  </span>{" "}
                  <button
                    onClick={() => {
                      window.location.href = `/emi-application?productId=${
                        product.id
                      }&price=${product.price}&name=${encodeURIComponent(
                        product.name
                      )}`;
                    }}
                    className="text-xs py-1.5 px-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-full font-medium hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center gap-1">
                    Apply Now
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Quantity section */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Quantity:
                </span>
                <div className="flex border border-gray-200 rounded">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 py-0.5 text-gray-600 hover:bg-gray-50">
                    -
                  </button>
                  <span className="px-3 py-0.5 border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 py-0.5 text-gray-600 hover:bg-gray-50">
                    +
                  </button>
                </div>
              </div>{" "}
              {/* Colors section */}
              <div className="mt-6">
                <span className="text-sm font-medium text-gray-700 block mb-3">
                  Select Color:
                </span>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(idx)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          selectedColor === idx
                            ? "bg-blue-50 text-blue-700 border-2 border-blue-500"
                            : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                        }`}>
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Info cards section */}
            <div className="flex gap-3 mt-3">
              <div className="flex-1 bg-gray-50 rounded p-2 flex items-center gap-2 text-sm">
                {" "}
                <Image
                  src="/assets/logo.svg"
                  alt="Coupon"
                  width={20}
                  height={20}
                  sizes="20px"
                />
                <span>View available coupons</span>
              </div>
              <div className="flex-1 bg-pink-50 rounded p-2 flex flex-col text-sm">
                <span className="text-pink-600 font-medium">
                  Get in 4hr 10 Mins
                </span>
                <span className="text-xs text-gray-500">
                  Free delivery • Easy returns
                </span>
              </div>
            </div>
            {/* Live Viewer Count */}
            <div className="bg-blue-50 rounded p-2 mt-2">
              <div className="flex items-center gap-2">
                <FaEye className="w-4 h-4 text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-sm text-blue-700 font-medium">
                    {viewerCount} people are viewing this product
                  </span>
                  <span className="text-xs text-blue-600">
                    Only {stock} items left in stock
                  </span>
                </div>
              </div>
            </div>{" "}
            {/* Action buttons */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 flex-1 text-white font-medium bg-orange-500 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2">
                {" "}
                <span>Add to Cart</span>
              </button>{" "}
              <button
                onClick={() => {
                  window.location.href = `/emi-application?productId=${
                    product.id
                  }&price=${product.price}&name=${encodeURIComponent(
                    product.name
                  )}`;
                }}
                className="px-6 py-2.5 flex-1 text-white font-medium bg-blue-500 rounded-lg hover:bg-orange-600 transition duration-200">
                Apply Emi
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-2.5 rounded-lg border transition duration-200 ${
                    isFavorite(product.id)
                      ? "bg-red-50 border-red-500 text-red-500"
                      : "border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500"
                  }`}
                  title={
                    isFavorite(product.id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"
                  }>
                  <FaHeart
                    className={`w-6 h-6 ${
                      isFavorite(product.id) ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
                <button
                  onClick={() =>
                    (window.location.href = `/compare?product=${product.id}`)
                  }
                  className="p-2.5 rounded-lg border border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition duration-200"
                  title="Compare this product">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>{" "}
            {/* Ranking info */}
            <div className="text-xs text-gray-500 mt-2">
              Ranked #17 in Acer&apos;s Top Laptop • Explore other bestsellers
            </div>{" "}
            {/* Product Overview Section */}
            <div className="mt-8 border-t pt-6">
              {" "}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delivery & Returns
                </h3>
                <DeliveryInfo />
              </div>
            </div>{" "}
            {/* Product Specifications */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Specifications
              </h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-700">
                        Processor
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-600">
                        {product.specs?.processor || "Intel Core i7"}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-sm font-medium text-blue-700">
                        RAM
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-600">
                        {product.specs?.ram || "16GB"}
                      </td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-700">
                        Storage
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-600">
                        {product.specs?.storage || "512GB SSD"}
                      </td>
                    </tr>
                    {isSpecsExpanded && (
                      <>
                        <tr className="bg-white">
                          <td className="px-4 py-3 text-sm font-medium text-blue-700">
                            Display
                          </td>
                          <td className="px-4 py-3 text-sm text-blue-600">
                            {product.specs?.display || '15.6" FHD'}
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="px-4 py-3 text-sm font-medium text-blue-700">
                            Graphics
                          </td>
                          <td className="px-4 py-3 text-sm text-blue-600">
                            {product.specs?.graphics || "NVIDIA RTX 3050"}
                          </td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-3 text-sm font-medium text-blue-700">
                            Operating System
                          </td>
                          <td className="px-4 py-3 text-sm text-blue-600">
                            {product.specs?.os || "Windows 11"}
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="px-4 py-3 text-sm font-medium text-blue-700">
                            Battery
                          </td>
                          <td className="px-4 py-3 text-sm text-blue-600">
                            {product.specs?.battery || "Up to 8 hours"}
                          </td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-3 text-sm font-medium text-blue-700">
                            Weight
                          </td>
                          <td className="px-4 py-3 text-sm text-blue-600">
                            {product.specs?.weight || "2.1 kg"}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
                <button
                  onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
                  className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border-t border-gray-200 flex items-center justify-center gap-1 transition-colors">
                  {isSpecsExpanded ? (
                    <>
                      Show Less
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      View More Specifications
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customers Also Like - Full Width Section */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Customers Also Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {" "}
            {[
              {
                id: "rf-253",
                name: "Samsung 253L Double Door Refrigerator",
                price: 89999,
                oldPrice: 99999,
                image: "/assets/fridge.jpg",
                tag: "10% Off",
                description: "Digital Inverter Technology, Twin Cooling Plus",
              },
              {
                id: "iphone-15",
                name: "iPhone 15 Plus",
                price: 159999,
                oldPrice: 169999,
                image: "/assets/Apple iPhone 15 Plus (Black, 128GB).jpeg",
                tag: "EMI Available",
                description: "A16 Bionic, 48MP Camera System",
              },
              {
                id: "nothing-2",
                name: "Nothing Phone (2)",
                price: 89999,
                oldPrice: 99999,
                image: "/assets/nothing.webp",
                tag: "Fatafat Delivery",
                description: "Glyph Interface, 50MP Dual Camera",
              },
              {
                id: "s24-ultra",
                name: "Samsung S24 Ultra",
                price: 189999,
                oldPrice: 199999,
                image: "/assets/Samsung-s24-ultra.png",
                tag: "EMI Available",
                description: "200MP Camera, Galaxy AI",
              },
              {
                id: "zflip-5",
                name: "Samsung Galaxy Z Flip 5",
                price: 129999,
                oldPrice: 139999,
                image: "/assets/zflip.jpg",
                tag: "Fatafat Delivery",
                description: "5 Star Rating, Dual Inverter",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col">
                {/* Product Image and Tags */}
                <div className="relative p-4 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white rounded-t-xl">
                  {/* Tags */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {item.tag && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium 
                          ${
                            item.tag.includes("%")
                              ? "bg-green-500 text-white"
                              : item.tag === "New"
                              ? "bg-blue-500 text-white"
                              : item.tag === "Limited Stock"
                              ? "bg-orange-500 text-white"
                              : item.tag === "Fastest Delivery"
                              ? "bg-orange-500 text-white"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(item);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors">
                    <FaHeart
                      className={`w-4 h-4 transition-colors ${
                        isFavorite(item.id) ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <Link
                    href={`/product/${item.id}`}
                    className="relative aspect-square w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      style={{ objectFit: "contain" }}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-1">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {item.description}
                  </p>

                  {/* Price Section */}
                  <div className="mt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-blue-700">
                        Rs {item.price.toLocaleString()}
                      </span>
                      {item.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          Rs {item.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* EMI and Delivery Badges */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-medium rounded">
                      EMI
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded bg-blue-100 text-blue-800">
                      Fatafat Delivery
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar from the Brand - Full Width Section */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Similar from the Brand
          </h3>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                id: "acer-nitro",
                name: "Acer Nitro V Gaming",
                price: 149999,
                oldPrice: 159999,
                image: "/assets/Acer-Nitro-V-2023-I7-1260P-RTX-3050.jpg",
                tag: "New",
                description: "Intel Core i7, RTX 3050, 16GB RAM",
              },
              {
                id: "asus-rog",
                name: "Asus ROG Strix",
                price: 199999,
                oldPrice: 219999,
                image: "/assets/asus-rog-strix.png",
                tag: "EMI Available",
                description: "Gaming Beast, RGB Keyboard",
              },
              {
                id: "redmibook",
                name: "Xiaomi RedmiBook",
                price: 89999,
                oldPrice: 99999,
                image: "/assets/XIAOMI-REDMIBOOK.jpg",
                tag: "Limited Stock",
                description: "Powerful Performance, All-day Battery",
              },
              {
                id: "gaming-headset",
                name: "Onikuma K9 Gaming Headset",
                price: 4999,
                oldPrice: 5999,
                image:
                  "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
                tag: "EMI Available",
                description: "7.1 Surround Sound, RGB Lighting",
              },
              {
                id: "nintendo-switch",
                name: "Nintendo Switch OLED",
                price: 49999,
                oldPrice: 54999,
                image: "/assets/nintendo.png",
                tag: "Fatafat Delivery",
                description: "M2 chip, Compact Desktop",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col">
                {/* Product Image and Tags */}
                <div className="relative p-4 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white rounded-t-xl">
                  {/* Tags */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {" "}
                    {item.tag && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium 
                            ${
                              item.tag.includes("%")
                                ? "bg-green-500 text-white"
                                : item.tag === "New"
                                ? "bg-blue-500 text-white"
                                : item.tag === "Limited Stock"
                                ? "bg-orange-500 text-white"
                                : item.tag === "Fastest Delivery"
                                ? "bg-orange-500 text-white"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(item);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors">
                    <FaHeart
                      className={`w-4 h-4 transition-colors ${
                        isFavorite(item.id) ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>{" "}
                  {/* Product Image */}
                  <Link
                    href={`/product/${item.id}`}
                    className="relative aspect-square w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      style={{ objectFit: "contain" }}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-1">
                  {" "}
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {item.description}
                  </p>
                  {/* Price Section */}
                  <div className="mt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-blue-700">
                        Rs {item.price?.toLocaleString()}
                      </span>
                      {item.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          Rs {item.oldPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* EMI and Delivery Badges */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-medium rounded">
                      EMI
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded bg-blue-100 text-blue-800">
                      Fatafat Delivery
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
