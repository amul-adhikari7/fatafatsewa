"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart, FaCartPlus, FaTruck } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/components/contexts/CartContext";
import { useFavorites } from "@/app/components/contexts/FavoritesContext";
import { fetchProducts } from "@/app/api/apiClient";
import { useScrollableCard } from "@/app/components/hooks/useScrollableCard";

const isValidLaptop = (product) => {
  if (!product || typeof product !== "object") return false;
  if (!product.id || !product.name || typeof product.name !== "string")
    return false;
  const name = product.name.toLowerCase();
  const category = (product.category || "").toLowerCase();
  const hasValidPrice =
    typeof product.price === "number" ||
    (typeof product.price === "string" && !isNaN(parseFloat(product.price)));
  return (
    hasValidPrice && (category.includes("laptop") || name.includes("laptop"))
  );
};

const ProductCard = ({
  laptop,
  onCardClick,
  onAddToCart,
  toggleFavorite,
  isFavorite,
}) => {
  const { touchHandlers } = useScrollableCard(() => onCardClick(laptop));

  return (
    <div
      {...touchHandlers}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col min-h-[320px] sm:min-h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto touch-pan-x snap-start border border-gray-100/50"
      onClick={() => onCardClick(laptop)}>
      {laptop.tag && (
        <span
          className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-md ${
            laptop.tag === "NEW"
              ? "bg-purple-500/90"
              : laptop.tag.includes("OFF")
              ? "bg-blue-500/90"
              : "bg-orange-500/90"
          } shadow-lg`}>
          {laptop.tag}
        </span>
      )}

      <div className="relative overflow-hidden aspect-square rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10" />
        <Image
          src={laptop.image || "/assets/placeholder.png"}
          alt={laptop.name}
          width={400}
          height={400}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(laptop);
            }}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <FaHeart
              className={`w-4 h-4 ${
                isFavorite ? "text-red-500" : "text-gray-600"
              }`}
            />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <MdOutlinePreview className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <IoGitCompareOutline className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-700 mb-1 line-clamp-2">
          {laptop.name}
        </h3>
        <div className="flex items-center gap-1 text-sm font-medium mt-auto">
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            NPR {laptop.price?.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaTruck className="w-3 h-3" />
            <span>Free Delivery</span>
          </div>
          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">
            EMI
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(laptop);
        }}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-b-2xl hover:from-blue-700 hover:to-violet-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
        <FaCartPlus className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
};

export default function Laptops() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [containerRef, setContainerRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadLaptops = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts("laptops");
        const validLaptops = data.filter(isValidLaptop);
        setLaptops(validLaptops);
      } catch (err) {
        setError(err.message || "Failed to fetch laptops");
      } finally {
        setLoading(false);
      }
    };
    loadLaptops();
  }, []);

  const handleCardClick = useCallback(
    (item) => {
      router.push(`/product/${item.id}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (e, item) => {
      e.stopPropagation();
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    },
    [addToCart]
  );

  const handleScroll = useCallback(
    (direction) => {
      if (!containerRef) return;
      const scrollAmount = containerRef.clientWidth * 0.8;
      const newScrollPosition =
        containerRef.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      containerRef.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    },
    [containerRef]
  );

  useEffect(() => {
    if (!containerRef) return;

    const handleScrollButtons = () => {
      setCanScrollLeft(containerRef.scrollLeft > 0);
      setCanScrollRight(
        containerRef.scrollLeft <
          containerRef.scrollWidth - containerRef.clientWidth
      );
    };

    containerRef.addEventListener("scroll", handleScrollButtons);
    handleScrollButtons();

    return () =>
      containerRef.removeEventListener("scroll", handleScrollButtons);
  }, [containerRef]);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 relative">
            Laptops
            <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-500 w-full sm:w-32 mt-2"></div>
          </h2>
          <button
            onClick={() => router.push("/category/laptops")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="relative">
          <div
            ref={setContainerRef}
            className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {laptops.map((laptop) => (
                <ProductCard
                  key={laptop.id}
                  laptop={laptop}
                  onCardClick={handleCardClick}
                  onAddToCart={handleAddToCart}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
