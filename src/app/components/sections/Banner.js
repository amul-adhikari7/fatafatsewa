"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const banners = [
    { id: 1, image: "/assets/home-banner.jpg", alt: "Banner 1" },
    { id: 2, image: "/assets/home-banner-2.webp", alt: "Banner 2" },
    { id: 3, image: "/assets/home-banner-3.webp", alt: "Banner 3" },
  ];

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setAutoPlay(false);
  };

  return (
    <section className="w-full bg-gradient-to-b from-blue-50/50 to-white py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Main Large Banner - Left Side */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[450px]">
            <div className="relative h-full">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    currentSlide === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  }`}>
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 hover:text-blue-600 transition-all transform hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="Previous slide">
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 hover:text-blue-600 transition-all transform hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="Next slide">
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setAutoPlay(false);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side Grid */}
          <div className="grid grid-rows-2 gap-3">
            {/* Top Large Banner */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[220px]">
              <Image
                src="/assets/iPhone-16-Series-in-EMI-Plans.jpg"
                alt="iPhone 16 Series"
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </div>

            {/* Bottom Two Equal Banners */}
            <div className="grid grid-cols-2 gap-3 h-[220px]">
              {[2, 3].map((num) => (
                <div
                  key={num}
                  className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={`/assets/side banner ${num}.png`}
                    alt={`Side Banner ${num}`}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
