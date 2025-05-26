'use client'
import React from 'react'

const NewOffers = () => {
  return (
    <section className='w-full min-h-[350px] flex flex-col items-center justify-center bg-gradient-to-r from-[#fdf6e3] via-[#e3fdf6] to-[#e3f0fd] py-12'>
      <div className='max-w-5xl w-full mx-auto flex flex-col items-center'>
        <h2 className='text-2xl md:text-3xl font-bold text-black mb-1 text-center'>
          New Year Offer
        </h2>
        <p className='text-gray-700 mb-8 text-center'>
          Grab the latest and greatest deal this New Year
        </p>
        <div className='flex flex-row gap-8 w-full justify-center'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='w-40 h-40 bg-white rounded-lg shadow border flex items-center justify-center'
            >
              {/* Product image or content goes here */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewOffers
