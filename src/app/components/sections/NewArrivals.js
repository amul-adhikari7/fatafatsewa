"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/app/api/apiClient";
const ProductCard = ({
  product,
  index,
  onAddToCart,
  onToggleFavorite,
  favorites,
  onClick,
}) => (
  <div
    key={product.id}
    onClick={onClick}
    className="group border rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200 p-3 sm:p-4 flex flex-col items-center min-h-[450px] sm:min-h-[500px] cursor-pointer flex-shrink-0 sm:flex-shrink">
    {/* Image */}
    <div className="relative w-28 sm:w-36 h-40 sm:h-52 mb-3 sm:mb-4 flex items-center justify-center">
      {" "}
      <Image
        src={product.image || "/assets/logo.svg"}
        alt={product.name || "Product Image"}
        width={144}
        height={208}
        style={{ width: "auto", height: "auto" }}
        className="object-contain max-w-full max-h-full transition-transform duration-200 transform group-hover:scale-105"
        priority={index < 2}
        loading={index < 2 ? "eager" : "lazy"}
        onError={(e) => {
          e.target.src = "/assets/logo.svg";
        }}
      />
      {/* Buttons */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={(e) => onAddToCart(e, product)}
          className="bg-blue-600 text-white p-1.5 sm:p-2 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-blue-700"
          title="Add to Cart">
          <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={(e) => onToggleFavorite(e, product)}
          className={`p-1.5 sm:p-2 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 ${
            favorites.some((fav) => fav.id === product.id)
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-white text-gray-600 hover:text-pink-600"
          }`}>
          {favorites.some((fav) => fav.id === product.id) ? (
            <FaHeart className="w-3 h-3 sm:w-4 sm:h-4" />
          ) : (
            <FaRegHeart className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
        </button>
      </div>
    </div>

    {/* Info */}
    <div className="w-full text-center">
      <div className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 h-10">
        {product.name}
      </div>{" "}
      {product.created_at && (
        <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
          Added:{" "}
          {new Date(product.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          {new Date(product.created_at) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <span className="ml-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[8px] sm:text-[10px]">
              New
            </span>
          )}
        </div>
      )}
      <div className="flex justify-center gap-1 my-2">
        {[...Array(product.rating || 5)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-[10px] sm:text-xs">
            ★
          </span>
        ))}
      </div>{" "}
      <div className="text-blue-600 font-bold text-sm sm:text-base">
        Rs{" "}
        {typeof product.price === "number"
          ? product.price.toLocaleString()
          : "Price not available"}
      </div>
      {product.emi_available && (
        <div className="flex justify-center mt-2 sm:mt-3">
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-50 text-blue-600 text-[10px] sm:text-xs rounded-full font-medium flex items-center gap-1">
            <IoMdFlash className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            EMI Available
          </span>
        </div>
      )}
    </div>
  </div>
);

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts(1, 50); // Fetch more products to ensure we get enough new ones
        if (response && response.data) {
          // Get the current date
          const now = new Date();
          // Get date 30 days ago
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          const validProducts = response.data.filter((p) => {
            if (!p?.id || !p?.name) return false; // Basic validation
            if (!p.created_at) return false;
            const productDate = new Date(p.created_at);
            return !isNaN(productDate) && productDate >= thirtyDaysAgo;
          });

          const sortedProducts = validProducts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 10);
          setNewArrivals(sortedProducts);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!product?.id || !product?.name) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === "number" ? product.price : 0,
      image: product.image || "/assets/logo.svg",
      quantity: 1,
    });
  };

  const handleToggleFavorite = (e, product) => {
    e.stopPropagation();
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/assets/logo.svg",
    });
  };

  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-6 sm:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white py-6 sm:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-6 sm:py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            New Arrivals
          </h2>
          <div className="h-1 w-full bg-orange-400 mt-1 rounded" />
        </div>

        {/* Product Grid */}
        <div className="relative">
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {newArrivals.length === 0 ? (
                <div className="text-center text-gray-400 py-12 col-span-full">
                  No new arrivals found.
                </div>
              ) : (
                newArrivals.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                    onClick={() => handleClick(product.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
