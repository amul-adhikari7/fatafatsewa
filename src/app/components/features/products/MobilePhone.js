"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  FaHeart,
  FaCartPlus,
  FaTruck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";
import { useScrollableCard } from "../../../components/hooks/useScrollableCard";
import { fetchMobilePhones } from "../../../api/productsApi";

// Helper function to get available colors for a product
// const getAvailableColors = (product) => {
//   const name = product.name.toLowerCase();
//   if (name.includes("iphone")) {
//     return [
//       { name: "Space Black", hex: "#1F2937", textColor: "white" },
//       { name: "Natural Titanium", hex: "#E5E7EB", textColor: "black" },
//       { name: "Blue Titanium", hex: "#1E40AF", textColor: "white" },
//       { name: "White Titanium", hex: "#FFFFFF", textColor: "black" },
//     ];
//   } else if (name.includes("samsung")) {
//     return [
//       { name: "Titanium Gray", hex: "#4A4A4A", textColor: "white" },
//       { name: "Titanium Black", hex: "#1F2937", textColor: "white" },
//       { name: "Titanium Violet", hex: "#7E3AF2", textColor: "white" },
//       { name: "Titanium Yellow", hex: "#FCD34D", textColor: "black" },
//     ];
//   } else if (name.includes("nothing")) {
//     return [
//       { name: "White", hex: "#FFFFFF", textColor: "black" },
//       { name: "Black", hex: "#1F2937", textColor: "white" },
//     ];
//   }
//   return [
//     { name: "Black", hex: "#1F2937", textColor: "white" },
//     { name: "White", hex: "#FFFFFF", textColor: "black" },
//     { name: "Blue", hex: "#1E40AF", textColor: "white" },
//     { name: "Gold", hex: "#B45309", textColor: "white" },
//   ];
// };

const ProductCard = ({
  phone,
  onCardClick,
  onAddToCart,
  toggleFavorite,
  isFavorite,
}) => {
  const { touchHandlers } = useScrollableCard(() => onCardClick(phone));
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!phone.inStock || phone.quantity === 0) {
      setNotificationMessage("Sorry, this item is out of stock");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    onAddToCart(phone);
  };

  return (
    <div
      {...touchHandlers}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col min-h-[320px] sm:min-h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto touch-pan-x snap-start border border-gray-100/50 relative"
      onClick={() => onCardClick(phone)}>
      {showNotification && (
        <div className="absolute z-50 px-4 py-2 text-sm text-white transform -translate-x-1/2 bg-red-500 rounded-full shadow-lg top-3 left-1/2 whitespace-nowrap">
          {notificationMessage}
        </div>
      )}
      {phone.tag && (
        <span
          className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-md ${
            phone.tag === "NEW"
              ? "bg-purple-500/90"
              : phone.tag.includes("OFF")
              ? "bg-blue-500/90"
              : "bg-orange-500/90"
          } shadow-lg`}>
          {phone.tag}
        </span>
      )}
      <div className="relative flex items-center justify-center flex-1 p-4 sm:p-6">
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-b from-gray-50 to-transparent group-hover:opacity-100 rounded-t-2xl" />

        <div className="absolute z-20 flex gap-2 transition-all duration-300 scale-90 -translate-x-1/2 -translate-y-1/2 opacity-0 left-1/2 top-1/2 group-hover:opacity-100 group-hover:scale-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCardClick(phone);
            }}
            className="p-2 transition-all duration-200 rounded-full shadow-lg bg-white/95 hover:scale-110 active:scale-95 backdrop-blur-sm"
            title="Quick View">
            <MdOutlinePreview className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="p-2 transition-all duration-200 rounded-full shadow-lg bg-white/95 hover:scale-110 active:scale-95 backdrop-blur-sm"
            title="Compare">
            <IoGitCompareOutline className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
          </div>
        )}

        {imageError ? (
          <div className="flex items-center justify-center w-full h-[160px] sm:h-[180px] bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-500">Image not available</span>
          </div>
        ) : (
          <Image
            src={phone.image}
            alt={phone.name}
            width={180}
            height={180}
            className={`mx-auto object-contain w-full h-[160px] sm:h-[180px] transform group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(phone);
          }}
          className="absolute z-30 p-2 transition-all rounded-full shadow-md opacity-100 top-3 right-3 bg-white/95 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation active:scale-95 backdrop-blur-sm"
          aria-label="Add to favorites">
          <FaHeart
            className={`w-4 h-4 ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>{" "}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2.5">
        <div className="space-y-1.5">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-snug">
            {phone.name}
          </h3>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-transparent sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text">
              Rs. {phone.price.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              {phone.quantity === 0 ? (
                <span className="text-xs text-red-500">Out of Stock</span>
              ) : (
                <span className="text-xs text-green-600">In Stock</span>
              )}
              {phone.averageRating > 0 && (
                <span className="text-xs text-gray-500">
                  Rating: {phone.averageRating.toFixed(1)}★
                </span>
              )}
            </div>
          </div>
        </div>

        {phone.features && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
              {phone.features.join(" • ")}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1 border border-orange-200 bg-orange-50 text-orange-600 font-medium px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
            <FaTruck className="w-2.5 h-2.5" />
            EMI
          </span>
          <span className="inline-flex items-center gap-1 border border-blue-200 bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
            <FaTruck className="w-2.5 h-2.5" />
            Free Delivery
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-2 transition-all duration-300 translate-y-full border-t border-gray-100 opacity-0 bg-white/95 group-hover:translate-y-0 group-hover:opacity-100 backdrop-blur-sm">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(phone);
          }}
          className={`p-2 transition-all duration-200 rounded-full ${
            isFavorite
              ? "bg-red-50 text-red-500"
              : "bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50"
          }`}
          title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}>
          <FaHeart className="w-5 h-5" />
        </button>

        <button
          onClick={handleAddToCart}
          disabled={!phone.inStock || phone.quantity === 0}
          className={`flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
            !phone.inStock || phone.quantity === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
          }`}
          title={
            !phone.inStock || phone.quantity === 0
              ? "Out of Stock"
              : "Add to Cart"
          }>
          <FaCartPlus className="w-4 h-4" />
          {!phone.inStock || phone.quantity === 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default function MobilePhone() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phones, setPhones] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 20,
  });
  const [containerRef, setContainerRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const containerEndRef = useRef(null);

  // Fetch products
  const loadPhones = useCallback(
    async (page = 1, isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError(null);

        const result = await fetchMobilePhones(page, meta.limit);

        if (!result.data || result.data.length === 0) {
          setError("No mobile phones available");
          return;
        }

        const processedPhones = result.data.map((phone) => ({
          ...phone,
          price: parseFloat(String(phone.price).replace(/[^\d.]/g, "")) || 0,
          oldPrice: phone.oldPrice
            ? parseFloat(String(phone.oldPrice).replace(/[^\d.]/g, ""))
            : null,
          quantity: phone.inStock ? 1 : 0,
          inStock: phone.inStock ?? true,
          features: [
            phone.storage,
            phone.specs?.processor,
            phone.specs?.camera?.split("+")[0]?.trim(),
          ].filter(Boolean),
        }));

        setPhones((prev) =>
          isLoadMore ? [...prev, ...processedPhones] : processedPhones
        );
        setMeta(result.meta);
        setHasMore(page < result.meta.totalPages);
      } catch (err) {
        console.error("Error fetching phones:", err);
        setError(err.message || "Failed to load mobile phones");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [meta.limit]
  );

  // Initial load
  useEffect(() => {
    loadPhones(1);
  }, [loadPhones]);

  // Intersection Observer for infinite loading
  useEffect(() => {
    if (!containerEndRef.current || loading || loadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPhones(meta.currentPage + 1, true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerEndRef.current);
    return () => observer.disconnect();
  }, [loading, loadingMore, hasMore, meta.currentPage, loadPhones]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (containerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, [containerRef]);

  useEffect(() => {
    const currentRef = containerRef;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef, handleScroll]);

  const handleCardClick = useCallback(
    (item) => {
      router.push(`/product/${item.id}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (e, item) => {
      e.stopPropagation();
      if (item.quantity === 0) {
        console.log("Product is out of stock");
        return;
      }
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        maxQuantity: item.quantity,
      });
    },
    [addToCart]
  );

  const scrollContainer = useCallback(
    (direction) => {
      if (!containerRef) return;

      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    },
    [containerRef]
  );

  if (loading && phones.length === 0) {
    return (
      <div className="px-3 py-6 bg-white sm:py-10 sm:px-4">
        <div className="mx-auto max-w-7xl">
          <div className="px-3 -mx-3 overflow-x-auto hide-scrollbar sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 min-w-[280px]">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-xl p-3 h-[370px] sm:h-[400px] animate-pulse flex-shrink-0 w-[280px] sm:w-auto">
                  <div className="h-48 mb-4 bg-gray-200 rounded-lg" />
                  <div className="space-y-3">
                    <div className="w-3/4 h-4 bg-gray-200 rounded" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded" />
                    <div className="w-1/4 h-6 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && phones.length === 0) {
    return (
      <div className="px-3 py-8 bg-white sm:py-10 sm:px-4">
        <div className="mx-auto text-center max-w-7xl">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => loadPhones(1)}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-6 bg-white sm:py-10 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="relative text-xl font-bold text-gray-900 sm:text-2xl">
              Mobile Phones
              <div className="w-full h-1 mt-2 bg-gradient-to-r from-orange-500 to-blue-500 sm:w-32"></div>
            </h2>
            {meta.total > 0 && (
              <p className="mt-1 text-sm text-gray-600">
                Showing {phones.length} of {meta.total} products
              </p>
            )}
          </div>
          <button
            onClick={() => router.push("/category/mobile-phones")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="relative group">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => scrollContainer("left")}
              className="absolute left-0 z-10 items-center hidden h-full px-2 transition-all duration-300 opacity-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:flex group-hover:opacity-100 hover:opacity-100"
              aria-label="Scroll left">
              <FaChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={() => scrollContainer("right")}
              className="absolute right-0 z-10 items-center hidden h-full px-2 transition-all duration-300 opacity-0 bg-gradient-to-l from-white via-white/90 to-transparent sm:flex group-hover:opacity-100 hover:opacity-100"
              aria-label="Scroll right">
              <FaChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}

          <div
            ref={setContainerRef}
            className="relative px-3 -mx-3 overflow-x-auto overscroll-x-contain hide-scrollbar sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory">
            <div className="flex gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
              {phones.map((phone) => (
                <ProductCard
                  key={phone.id}
                  phone={phone}
                  onCardClick={handleCardClick}
                  onAddToCart={(e) => handleAddToCart(e, phone)}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(phone)}
                />
              ))}
            </div>

            {/* Loading more indicator */}
            {loadingMore && (
              <div className="flex justify-center w-full py-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500" />
                  <span className="text-sm text-gray-500">
                    Loading more products...
                  </span>
                </div>
              </div>
            )}

            {/* Load more trigger */}
            {!loadingMore && hasMore && (
              <div
                ref={containerEndRef}
                className="flex justify-center w-full py-6">
                <div className="h-10 transition-all duration-300 opacity-0">
                  Loading more...
                </div>
              </div>
            )}

            {/* End of results */}
            {!hasMore && phones.length > 0 && (
              <div className="flex justify-center w-full py-6">
                <p className="text-sm text-gray-500">
                  No more products to load
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
