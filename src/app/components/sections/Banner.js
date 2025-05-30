'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const sliderImages = [
  '/assets/home-banner.jpg',


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

  return (
    <section className="w-full ">
      <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full min-h-[500px] px-4 md:px-8 lg:px-12">
        {/* Left slider */}
        <div className="col-span-3 row-span-5 relative overflow-hidden shadow-lg">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {sliderImages.map((img, idx) => (
              <div key={img} className="relative w-full  h-full flex-shrink-0 bg-white ">
                <Image
                  src={img}
                  alt={`Slider ${idx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-fill"
                  priority={idx === 0}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => setCurrent(prev => (prev - 1 + sliderImages.length) % sliderImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur hover:bg-white/50 flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent(prev => (prev + 1) % sliderImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur hover:bg-white/50 flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Top right image */}
        <div className="col-start-4 col-span-2 row-span-3 relative overflow-hidden shadow-md">
          <Image
            src={staticImages[0]}
            alt="Side Image 1"
            fill
            className="object-fill "
          />
        </div>

        {/* Bottom right left image */}
        <div className="col-start-4 row-start-4 row-span-2 relative overflow-hidden shadow-md">
          <Image
            src={staticImages[1]}
            alt="Side Image 2"
            fill
            className="object-fill"
          />
        </div>

        {/* Bottom right right image */}
        <div className="col-start-5 row-start-4 row-span-2 relative overflow-hidden shadow-md">
          <Image
            src={staticImages[2]}
            alt="Side Image 3"
            fill
            className="object-fill"
          />
        </div>
      </div>
    </section>
  )
}

export default Banner
