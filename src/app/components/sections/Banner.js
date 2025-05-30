'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const sliderImages = [
  '/assets/home-banner.jpg',
  '/assets/home-banner-2.webp',
  '/assets/home-banner-3.webp',
]

const staticImages = [
  '/assets/side banner.png',
  '/assets/side banner 2.png',
  '/assets/side banner 3.png'
]

const Banner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])    

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))
  }

  return (
    <section className="w-full p-4">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-[60fr_40fr] gap-4">
          {/* Left large banner (1) */}
          <div className="relative h-[500px] group">
            <div className="flex w-full h-full transition-transform duration-700 ease-out overflow-hidden"
                style={{ transform: `translateX(-${current * 100}%)` }}>
              {sliderImages.map((img, idx) => (
                <div key={img} className="relative w-full h-full flex-shrink-0">
                  <Image
                    src={img}
                    alt={`Slider ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover rounded-lg"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Next slide"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    current === idx ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right banners container (2,3,4) */}
          <div className="grid grid-rows-[1fr_1fr] gap-4">
            {/* Top banner (2) */}
            <div className="relative h-[240px]">
              <Image
                src={staticImages[0]}
                alt="Top Banner"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover rounded-lg"
              />
            </div>
            {/* Bottom two banners (3,4) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[240px]">
                <Image
                  src={staticImages[1]}
                  alt="Bottom Left Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative h-[240px]">
                <Image
                  src={staticImages[2]}
                  alt="Bottom Right Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
