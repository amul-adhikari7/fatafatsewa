"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaTruck,
  FaCheck,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/components/contexts/CartContext";
import { useFavorites } from "@/app/components/contexts/FavoritesContext";
import { MainLayout } from "@/app/components/layout";
import { fetchProductById } from "@/app/api/fetchProducts";

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8 animate-pulse">
    <div className="h-6 bg-gray-200 w-1/3 rounded mb-6"></div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-square bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 w-1/4 rounded"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="h-16 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

// Sticky Add to Cart Bar Component
const StickyAddToCart = ({ product, quantity, addToCart, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform transition-transform duration-300 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12">
            <Image
              src={
                Array.isArray(product.image) ? product.image[0] : product.image
              }
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-blue-600 font-bold">
              Rs {(product.price * quantity).toLocaleString()}
            </p>
          </div>
        </div>{" "}
        <div className="flex gap-2">
          <button
            onClick={() => addToCart({ ...product, quantity })}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <FaShoppingCart />
            Add to Cart
          </button>
          <button
            onClick={() => alert("EMI application coming soon!")}
            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition flex items-center gap-2">
            Apply for EMI
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [products, setProducts] = useState([]);
  const [viewerCount, setViewerCount] = useState(18);

  // Fluctuating viewer count effect
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((current) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newCount = Math.max(15, Math.min(25, current + change)); // Keep between 15 and 25
        return newCount;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error loading similar products:", error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <ProductSkeleton />
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Product Not Found"}
          </h2>
          <p className="text-gray-600 mb-8">
            The product you are looking for does not exist or there was an error
            loading it.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Return to Home
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Helper function to format specifications based on product category
  const getSpecifications = (product) => {
    if (product.name.toLowerCase().includes("laptop")) {
      return [
        { label: "Processor", value: product.description.split(",")[0] },
        {
          label: "RAM",
          value: product.description.split(",")[1]?.trim() || "N/A",
        },
        {
          label: "Graphics",
          value: product.description.split(",")[2]?.trim() || "N/A",
        },
        { label: "Storage", value: "512GB SSD" },
        { label: "Display", value: '15.6" FHD IPS' },
        { label: "Operating System", value: "Windows 11" },
        { label: "Battery", value: "4-Cell Li-ion" },
        { label: "Warranty", value: "2 Years" },
      ];
    } else if (
      product.name.toLowerCase().includes("iphone") ||
      product.name.toLowerCase().includes("samsung") ||
      product.name.toLowerCase().includes("phone")
    ) {
      return [
        {
          label: "Storage",
          value: product.description.includes("GB")
            ? product.description.match(/\d+GB/)[0]
            : "N/A",
        },
        {
          label: "Display",
          value:
            product.name.includes("Plus") || product.name.includes("Ultra")
              ? "6.7-inch OLED"
              : "6.1-inch OLED",
        },
        {
          label: "Camera",
          value: product.name.includes("Ultra")
            ? "200MP Main + 12MP Ultra Wide"
            : "48MP Main + 12MP Ultra Wide",
        },
        {
          label: "Processor",
          value: product.name.includes("iPhone")
            ? "A17 Pro Chip"
            : "Snapdragon 8 Gen 3",
        },
        { label: "Battery", value: "5000mAh" },
        {
          label: "OS",
          value: product.name.includes("iPhone") ? "iOS 17" : "Android 14",
        },
        { label: "Charging", value: "Fast Charging Support" },
        { label: "Warranty", value: "1 Year" },
      ];
    } else if (
      product.name.toLowerCase().includes("headphone") ||
      product.name.toLowerCase().includes("earphone")
    ) {
      return [
        { label: "Type", value: "Over-ear" },
        { label: "Connection", value: "Wireless/Wired" },
        { label: "Battery Life", value: "Up to 20 hours" },
        { label: "Microphone", value: "Yes, Built-in" },
        { label: "Noise Cancellation", value: "Yes" },
        { label: "Warranty", value: "1 Year" },
      ];
    }
    return [];
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Product Image */}
            <div className="space-y-4">
              {" "}
              <div className="relative aspect-square bg-white rounded-xl border overflow-hidden">
                <Image
                  src={
                    Array.isArray(product.image)
                      ? product.image[selectedImage]
                      : product.image
                  }
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                  unoptimized={true}
                />
                {product.tag && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                      product.tag.includes("%")
                        ? "bg-green-100 text-green-600"
                        : product.tag === "New"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}>
                    {product.tag}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">{product.description}</p>

                {/* Product Information */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center text-blue-600"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">SKU:</span>
                      <span className="ml-2 font-medium">
                        {product.sku || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Brand:</span>
                      <span className="ml-2 font-medium">
                        {product.brand || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Available Stock:</span>
                      <span className="ml-2 font-medium">
                        {product.stock || 2}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  {product.price}
                </div>
                {product.oldPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through text-lg">
                      {product.oldPrice}
                    </span>
                    <span className="text-green-600 font-medium px-2 py-0.5 bg-green-50 rounded-full text-sm">
                      Save{" "}
                      {(
                        product.oldPrice.replace("Rs ", "").replace(",", "") -
                        product.price.replace("Rs ", "").replace(",", "")
                      ).toLocaleString()}
                      Rs
                    </span>
                  </div>
                )}
              </div>

              {/* EMI Options */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-900">
                  <span className="font-semibold">EMI Available</span>
                  <span className="text-sm bg-blue-100 px-2 py-0.5 rounded-full">
                    from Rs{" "}
                    {Math.ceil(
                      parseInt(product.price.replace(/[^0-9]/g, "")) / 12
                    ).toLocaleString()}
                    /month
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-blue-600" />
                  <span>Fatafat Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-600" />
                  <span>In Stock</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-l-lg"
                    disabled={quantity <= 1}>
                    <FaMinus
                      className={
                        quantity <= 1 ? "text-gray-300" : "text-gray-600"
                      }
                    />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-r-lg">
                    <FaPlus className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => addToCart({ ...product, quantity })}
                    className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold">
                    <FaShoppingCart />
                    Add to Cart ({quantity})
                  </button>
                  <button
                    onClick={() => alert("EMI application coming soon!")}
                    className="flex-1 bg-orange-500 text-white py-4 px-6 rounded-xl hover:bg-orange-600 transition flex items-center justify-center gap-2 font-semibold">
                    Apply for EMI
                  </button>
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`p-4 rounded-xl border ${
                      isFavorite(product.id)
                        ? "bg-pink-50 text-pink-600 border-pink-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}>
                    {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                {/* Live Viewer Count */}
                <div className="flex items-center justify-center gap-2 text-sm text-blue-600 bg-blue-50 py-2 px-4 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span>
                    {viewerCount} people are viewing this product right now!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Product Specifications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {getSpecifications(product).map((spec, index) => (
                <div key={index} className="flex border-b pb-4">
                  <div className="w-1/3 text-gray-600">{spec.label}</div>
                  <div className="w-2/3 font-medium">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings & Reviews */}
          <div className="mt-12 border-t pt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Write a Review
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Overall Rating */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold">4.5</div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on 128 reviews
                    </div>
                  </div>
                </div>
                {/* Rating Bars */}
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2 mb-2">
                    <div className="text-sm text-gray-600 w-6">{stars}</div>
                    <FaStar className="text-yellow-400 w-4" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${
                            stars === 5
                              ? "70"
                              : stars === 4
                              ? "20"
                              : stars === 3
                              ? "5"
                              : stars === 2
                              ? "3"
                              : "2"
                          }%`,
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 w-8">
                      {stars === 5
                        ? "70%"
                        : stars === 4
                        ? "20%"
                        : stars === 3
                        ? "5%"
                        : stars === 2
                        ? "3%"
                        : "2%"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {[1, 2].map((review) => (
                  <div key={review} className="border-b pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < 4 ? "text-yellow-400" : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">2 days ago</span>
                    </div>
                    <h4 className="font-medium mb-2">John Doe</h4>
                    <p className="text-gray-600">
                      Great product! The quality is excellent and it arrived
                      quickly. Would definitely recommend to others.
                    </p>
                  </div>
                ))}
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All Reviews
                </button>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-12 border-t pt-12">
            <h2 className="text-xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Link
                  key={item}
                  href={`/product/${item}`}
                  className="group bg-white rounded-xl border p-4 transition hover:shadow-md">
                  <div className="relative aspect-square mb-4">
                    {" "}
                    <Image
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={`Similar Product ${item}`}
                      fill
                      className="object-contain p-2"
                      unoptimized={true}
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                    Similar {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold mt-2">Rs 199,999</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart */}
      <StickyAddToCart
        product={product}
        quantity={quantity}
        addToCart={addToCart}
        visible={showStickyBar}
      />
    </MainLayout>
  );
}
