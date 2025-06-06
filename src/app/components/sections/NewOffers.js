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
    <div className="flex gap-2 mt-2">
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold bg-white rounded px-3 py-1.5 shadow-sm">
          {timeLeft.days}
        </span>
        <span className="text-xs text-gray-600 mt-0.5">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold bg-white rounded px-3 py-1.5 shadow-sm">
          {timeLeft.hours}
        </span>
        <span className="text-xs text-gray-600 mt-0.5">Hr</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold bg-white rounded px-3 py-1.5 shadow-sm">
          {timeLeft.minutes}
        </span>
        <span className="text-xs text-gray-600 mt-0.5">Min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold bg-white rounded px-3 py-1.5 shadow-sm">
          {timeLeft.seconds}
        </span>
        <span className="text-xs text-gray-600 mt-0.5">Sc</span>
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
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {appleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-3 flex flex-col items-center hover:shadow transition-shadow">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewOffers;
