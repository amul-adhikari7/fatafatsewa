"use client";
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Memoized navigation button component
const NavButton = memo(({ onClick, icon: Icon, direction }) => (
  <button
    onClick={onClick}
    className="p-2 text-gray-800 transition-all transform rounded-full bg-white/80 hover:bg-white hover:text-blue-600 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
    aria-label={`${direction} slide`}>
    <Icon className="w-4 h-4" />
  </button>
));
NavButton.displayName = "NavButton";

// Memoized dot indicator component
const DotIndicator = memo(({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`h-1.5 rounded-full transition-all duration-300 ${
      active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
    }`}
    aria-label={`Go to slide ${active ? "active" : ""}`}
  />
));
DotIndicator.displayName = "DotIndicator";

// Memoized banner image component
const BannerImage = memo(({ image, alt, index, isActive }) => (
  <div
    className={`absolute inset-0 transition-all duration-700 transform ${
      isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
    }`}>
    <Image
      src={image}
      alt={alt}
      fill
      className="object-cover"
      priority={index === 0}
      sizes="(max-width: 1024px) 100vw, 50vw"
      quality={90}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
  </div>
));
BannerImage.displayName = "BannerImage";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Memoize banners array to prevent unnecessary re-renders
  const banners = useMemo(
    () => [
      { id: 1, image: "/assets/home-banner.webp", alt: "Banner 1" },
      { id: 2, image: "/assets/home-banner-2.webp", alt: "Banner 2" },
      { id: 3, image: "/assets/home-banner-3.webp", alt: "Banner 3" },
    ],
    []
  );

  // Memoize navigation handlers
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setAutoPlay(false);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setAutoPlay(false);
  }, [banners.length]);

  const setSlide = useCallback((index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  }, []);

  // Memoize autoplay effect
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, banners.length]);

  return (
    <section className="w-full py-4 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Main Large Banner - Left Side */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[450px]">
            <div className="relative h-full">
              {banners.map((banner, index) => (
                <BannerImage
                  key={banner.id}
                  image={banner.image}
                  alt={banner.alt}
                  index={index}
                  isActive={currentSlide === index}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-x-0 flex items-center justify-between px-4 -translate-y-1/2 top-1/2">
              <NavButton
                onClick={prevSlide}
                icon={FaChevronLeft}
                direction="Previous"
              />
              <NavButton
                onClick={nextSlide}
                icon={FaChevronRight}
                direction="Next"
              />
            </div>

            {/* Dots Navigation */}
            <div className="absolute left-0 right-0 flex justify-center gap-2 bottom-3">
              {banners.map((_, index) => (
                <DotIndicator
                  key={index}
                  active={currentSlide === index}
                  onClick={() => setSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Side Grid */}
          <div className="grid grid-rows-2 gap-3">
            {/* Top Large Banner */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[220px]">
              <Image
                src="/assets/side-banner.webp"
                alt="iPhone 16 Series"
                fill
                priority
                className="object-cover transition-transform duration-300 transform hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
              <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/20 to-transparent hover:opacity-100" />
            </div>

            {/* Bottom Two Equal Banners */}
            <div className="grid grid-cols-2 gap-3 h-[220px]">
              {useMemo(
                () =>
                  [1, 2].map((num) => (
                    <div
                      key={num}
                      className="relative overflow-hidden shadow-lg rounded-2xl">
                      <Image
                        src={`/assets/bottom-banner-${num}.webp`}
                        alt={`Bottom Banner ${num}`}
                        fill
                        priority
                        className="object-cover transition-transform duration-300 transform hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/20 to-transparent hover:opacity-100" />
                    </div>
                  )),
                []
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Banner);
