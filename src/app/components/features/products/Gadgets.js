"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart, FaCartPlus, FaTruck } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../../components/contexts/FavoritesContext";
import { useCart } from "../../../components/contexts/CartContext";
import { useScrollableCard } from "../../../components/hooks/useScrollableCard";

const ProductCard = ({
  gadget,
  onCardClick,
  onAddToCart,
  toggleFavorite,
  isFavorite,
}) => {
  const { touchHandlers } = useScrollableCard(() => onCardClick(gadget));

  return (
    <div
      {...touchHandlers}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col min-h-[320px] sm:min-h-[400px] transform hover:-translate-y-1 flex-shrink-0 w-[180px] xs:w-[200px] sm:w-auto touch-pan-x snap-start border border-gray-100/50"
      onClick={() => onCardClick(gadget)}>
      {gadget.tag && (
        <span
          className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-md ${
            gadget.tag === "NEW"
              ? "bg-purple-500/90"
              : gadget.tag.includes("OFF")
              ? "bg-blue-500/90"
              : "bg-orange-500/90"
          } shadow-lg`}>
          {gadget.tag}
        </span>
      )}

      <div className="relative flex items-center justify-center flex-1 p-4 sm:p-6">
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-b from-gray-50 to-transparent group-hover:opacity-100 rounded-t-2xl" />

        <div className="absolute z-20 flex gap-2 transition-all duration-300 scale-90 -translate-x-1/2 -translate-y-1/2 opacity-0 left-1/2 top-1/2 group-hover:opacity-100 group-hover:scale-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCardClick(gadget);
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

        <Image
          src={gadget.image}
          alt={gadget.name}
          width={180}
          height={180}
          className="mx-auto object-contain w-full h-[160px] sm:h-[180px] transform group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(gadget);
          }}
          className="absolute z-30 p-2 transition-all rounded-full shadow-md opacity-100 top-3 right-3 bg-white/95 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation active:scale-95 backdrop-blur-sm"
          aria-label="Add to favorites">
          <FaHeart
            className={`w-4 h-4 ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2.5">
        <div className="space-y-1.5">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-snug">
            {gadget.name}
          </h3>
          <div className="flex items-center gap-2">
            {gadget.oldPrice && (
              <p className="text-xs text-gray-400 line-through">
                Rs {gadget.oldPrice}
              </p>
            )}
            <p className="text-sm font-semibold text-transparent sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text">
              Rs {gadget.price}
            </p>
          </div>
        </div>

        {gadget.features && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] sm:text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
              {gadget.features.join(" • ")}
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
    </div>
  );
};

export default function Gadgets() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gadgets, setGadgets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const itemsPerPage = 2; // Show 2 items in mobile view
  const totalPages = Math.ceil(gadgets.length / itemsPerPage);

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
        features: item.features,
      });
    },
    [addToCart]
  );

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulated data - replace with actual API call
        const data = [
          {
            id: "g1",
            name: "ONIKUMA K9 Gaming Headset",
            price: 2499,
            oldPrice: 2999,
            image:
              "/assets/ONIKUMA-K9-with-Cat-Ears-Elite-stereo-gaming-headset-for-PS4-Xbox-PC-and-Switch-5.webp",
            tag: "NEW",
            features: [
              "7.1 Surround Sound",
              "RGB Lighting",
              "Noise Cancellation",
            ],
          },
          {
            id: "g2",
            name: "Nintendo Switch OLED",
            price: 45999,
            image: "/assets/nintendo.png",
            tag: "20% OFF",
            features: ["7-inch OLED Screen", "64GB Storage", "Enhanced Audio"],
          },
          {
            id: "g3",
            name: "Fantech Gaming Mouse",
            price: 1899,
            oldPrice: 2299,
            image: "/assets/fantech-red.jpg",
            tag: "SALE",
            features: ["16000 DPI", "RGB Lighting", "8 Programmable Buttons"],
          },
          {
            id: "g4",
            name: "Gaming Headphones Pro",
            price: 3499,
            image: "/assets/headphones.webp",
            features: ["Wireless", "40hr Battery", "Low Latency"],
          },
        ];

        if (data.length === 0) {
          setError("No gadgets available");
          return;
        }

        setGadgets(data);
      } catch (err) {
        console.error("Error fetching gadgets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();
  }, []);

  // Track scroll position for navigation
  const handleScroll = useCallback(() => {
    if (containerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);

      // Update current page for dots
      const itemWidth = clientWidth;
      const newPage = Math.round(scrollLeft / itemWidth);
      setCurrentPage(newPage);
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

  const scrollTo = useCallback(
    (direction) => {
      if (containerRef) {
        const scrollAmount = containerRef.clientWidth;
        containerRef.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [containerRef]
  );

  if (loading)
    return (
      <div className="px-3 py-6 bg-white sm:py-10 sm:px-4">
        <div className="mx-auto max-w-7xl">
          <div className="px-3 -mx-3 overflow-x-auto hide-scrollbar sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 min-w-[280px]">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-xl p-3 h-[370px] sm:h-[400px] animate-pulse flex-shrink-0 w-[280px] sm:w-auto">
                  <div className="h-48 mb-4 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-3">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="px-3 py-8 bg-white sm:py-10 sm:px-4">
        <div className="mx-auto text-center max-w-7xl">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="px-3 py-6 bg-white sm:py-10 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="relative text-xl font-bold text-gray-900 sm:text-2xl">
            Gadgets
            <div className="w-full h-1 mt-2 bg-gradient-to-r from-orange-500 to-blue-500 sm:w-32"></div>
          </h2>
          <button
            onClick={() => router.push("/category/gadgets")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
            More Products
          </button>
        </div>

        <div className="relative">
          <div
            ref={setContainerRef}
            className="px-3 -mx-3 overflow-x-auto overscroll-x-contain hide-scrollbar sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory">
            <div className="flex gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
              {gadgets.map((gadget) => (
                <ProductCard
                  key={gadget.id}
                  gadget={gadget}
                  onCardClick={handleCardClick}
                  onAddToCart={handleAddToCart}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (containerRef) {
                    containerRef.scrollTo({
                      left: index * containerRef.clientWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  currentPage === index
                    ? "bg-gradient-to-r from-blue-600 to-blue-700"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
