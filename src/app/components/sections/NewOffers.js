"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 208,
    hours: 16,
    minutes: 4,
    seconds: 55,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        if (newSeconds >= 0) return { ...prevTime, seconds: newSeconds };

        const newMinutes = prevTime.minutes - 1;
        if (newMinutes >= 0)
          return { ...prevTime, minutes: newMinutes, seconds: 59 };

        const newHours = prevTime.hours - 1;
        if (newHours >= 0)
          return { ...prevTime, hours: newHours, minutes: 59, seconds: 59 };

        const newDays = prevTime.days - 1;
        if (newDays >= 0)
          return { days: newDays, hours: 23, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 mt-4">
      <div className="flex flex-col items-center min-w-[80px]">
        <span className="text-2xl sm:text-3xl font-bold bg-white rounded-lg px-4 py-2 shadow-md w-full text-center">
          {timeLeft.days}
        </span>
        <span className="text-sm text-white mt-1 font-medium">Days</span>
      </div>
      <div className="flex flex-col items-center min-w-[80px]">
        <span className="text-2xl sm:text-3xl font-bold bg-white rounded-lg px-4 py-2 shadow-md w-full text-center">
          {timeLeft.hours}
        </span>
        <span className="text-sm text-white mt-1 font-medium">Hours</span>
      </div>
      <div className="flex flex-col items-center min-w-[80px]">
        <span className="text-2xl sm:text-3xl font-bold bg-white rounded-lg px-4 py-2 shadow-md w-full text-center">
          {timeLeft.minutes}
        </span>
        <span className="text-sm text-white mt-1 font-medium">Minutes</span>
      </div>
      <div className="flex flex-col items-center min-w-[80px]">
        <span className="text-2xl sm:text-3xl font-bold bg-white rounded-lg px-4 py-2 shadow-md w-full text-center">
          {timeLeft.seconds}
        </span>
        <span className="text-sm text-white mt-1 font-medium">Seconds</span>
      </div>
    </div>
  );
};

const appleProducts = [
  {
    id: "ipad-mini",
    name: "iPad Mini",
    price: 600.0,
    rating: 5,
    image: "/assets/MacBook-pro-retina.jpg",
  },
  {
    id: "apple-watch",
    name: "Apple Watch",
    price: 799.0,
    rating: 5,
    image: "/assets/Apple iPhone 15 Plus (Black, 128GB).jpeg",
  },
  {
    id: "macbook",
    name: "Apple MacBook",
    price: 999.0,
    rating: 5,
    image: "/assets/MacBook-pro-retina.jpg",
  },
  {
    id: "iphone-14",
    name: "Apple iPhone 14",
    price: 799.0,
    rating: 5,
    image: "/assets/Apple iPhone 15 Plus (Black, 128GB).jpeg",
  },
  {
    id: "imac-24",
    name: 'Apple iMac 24"',
    price: 1299.0,
    rating: 5,
    image: "/assets/MacBook-pro-retina.jpg",
  },
];

const NewOffers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const itemsPerPage = 2; // Show 2 items in mobile view
  const totalPages = Math.ceil(appleProducts.length / itemsPerPage);

  // Track scroll position for active dot
  const handleScroll = () => {
    if (containerRef) {
      const scrollLeft = containerRef.scrollLeft;
      const itemWidth = containerRef.clientWidth; // Full container width since we show 2 items
      const newPage = Math.round(scrollLeft / itemWidth);
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const container = containerRef;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef]);

  // Scroll to page
  const goToPage = (pageNumber) => {
    if (containerRef) {
      const itemWidth = containerRef.clientWidth;
      containerRef.scrollTo({
        left: pageNumber * itemWidth,
        behavior: "smooth",
      });
      setCurrentPage(pageNumber);
    }
  };
  return (
    <section className="w-full bg-gradient-to-b from-orange-200 via-blue-300 to-blue-400 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left side - Product Display */}
          <div className="relative h-[280px] md:h-[350px] flex items-center justify-center">
            <Image
              src="/assets/newofferbanner.png"
              alt="Apple Products Collection"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          {/* Right side - Content */}
          <div>
            {" "}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Apple Shopping Event
            </h1>
            <p className="text-lg text-white/90 mb-3">
              Hurry and get discounts on all Apple devices up to 20%
            </p>
            <CountdownTimer />
            <Link href="/product/apple-collection">
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Go Shopping
              </button>
            </Link>
          </div>{" "}
        </div>

        {/* Product Grid */}
        <div className="mt-6 relative">
          {" "}
          <div
            ref={setContainerRef}
            className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-3 px-3 scroll-smooth snap-x snap-mandatory">
            <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {appleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg p-3 flex-shrink-0 w-[calc(50%-6px)] sm:w-auto flex flex-col items-center hover:shadow transition-shadow snap-start">
                  <div className="relative w-full aspect-square mb-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(product.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xs font-semibold text-center mb-0.5">
                    {product.name}
                  </h3>
                  <span className="text-blue-600 font-bold text-sm">
                    ${product.price}
                  </span>
                </div>
              ))}{" "}
            </div>
          </div>
          {/* Pagination dots - Mobile only */}
          <div className="flex justify-center gap-2 mt-4 sm:hidden">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i
                    ? "bg-orange-500 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewOffers;
