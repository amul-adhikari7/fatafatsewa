'use client'
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaShieldAlt, FaTruck, FaTags } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
import { GiReceiveMoney } from 'react-icons/gi'

const sliderImages = [
  '/iPhone-16-Series-in-EMI-Plans.jpg',
  '/assets/Slider1.svg',
  '/assets/Slider2.svg'

  // Add more image paths here, e.g. '/banner2.svg', '/banner3.svg'
]

const features = [
  {
    icon: <FaShieldAlt className='text-sky-500 text-2xl' />, // Genuine Products
    title: 'Genuine Products',
    subtitle: '24 months'
  },
  {
    icon: <GiReceiveMoney className='text-yellow-500 text-2xl' />, // EMI Available
    title: 'EMI Available',
    subtitle: '3-12 months'
  },
  {
    icon: <MdPayment className='text-blue-500 text-2xl' />, // Payments
    title: 'Payments',
    subtitle: 'Secured'
  },
  {
    icon: <FaTruck className='text-green-500 text-2xl' />, // Quick Delivery
    title: 'Quick Delivery',
    subtitle: 'One day delivery'
  },
  {
    icon: <FaTags className='text-pink-600 text-2xl' />, // Brands
    title: 'Brands',
    subtitle: 'Top Brands'
  }
]

const Banner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % sliderImages.length)
    }, 5000) // Changed to 5 seconds for better user experience
    return () => clearInterval(interval)
  }, [])

  return (
    <section className='relative w-full bg-gradient-to-b from-gray-50 to-white'>
      {/* Main banner section */}
      <div className='max-w-[2000px] mx-auto'>
        <div className='relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden rounded-b-3xl shadow-lg'>
          {/* Slider container */}
          <div
            className='flex w-full h-full transition-transform duration-700 ease-out'
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {sliderImages.map((img, idx) => (
              <div key={img} className='relative w-full h-full flex-shrink-0'>
                <Image
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
                  className='object-cover'
                  priority={idx === 0}
                  quality={90}
                />
                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-black/20 to-transparent' />
              </div>
            ))}
          </div>

          {/* Slide navigation dots */}
          <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === idx 
                    ? 'w-6 bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow navigation */}
          <button
            onClick={() => setCurrent(prev => (prev - 1 + sliderImages.length) % sliderImages.length)}
            className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group'
            aria-label='Previous slide'
          >
            <svg className='w-6 h-6 text-white transform group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </button>
          <button
            onClick={() => setCurrent(prev => (prev + 1) % sliderImages.length)}
            className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group'
            aria-label='Next slide'
          >
            <svg className='w-6 h-6 text-white transform group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>

      {/* Features section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm'>
          {features.map(feature => (
            <div
              key={feature.title}
              className='flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300'
            >
              <div className='flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center transform transition-transform group-hover:scale-110'>
                {feature.icon}
              </div>
              <div className='flex flex-col min-w-0'>
                <span className='text-sm font-semibold text-gray-900 truncate'>
                  {feature.title}
                </span>
                <span className='text-xs text-gray-500 truncate'>
                  {feature.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Banner
