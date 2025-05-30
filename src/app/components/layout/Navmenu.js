'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaThLarge, FaTags, FaCalculator, FaBlog, FaTimes } from 'react-icons/fa'
import { useCategories } from '../../components/contexts/Categories'

const Navmenu = () => {
  const { categories, loading } = useCategories()
  const [isOpen, setIsOpen] = useState(false)

  const mainCategories = categories.filter(cat => !cat.parent_id)

  return (
    <>
      {/* Navigation Bar */}
      <nav className='w-full flex justify-center py-4 bg-gradient-to-r from-blue-200 via-blue-200 to-blue-200'>
        <div className='flex items-center gap-x-7 bg-white/60 backdrop-blur-lg rounded-xl px-8 py-2.5 shadow-md border border-blue-100/30 ring-1 ring-blue-100/10'>
          {/* Category Button */}
          <button
            onClick={() => setIsOpen(true)}
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-500 transition-all duration-200 font-medium text-sm'
          >
            <FaThLarge className='w-5 h-5' />
            <span>Category</span>
          </button>

          {/* Other Links */}
          <a href='#' className='flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-sm hover:scale-105'>
            <FaTags className='w-4 h-4' />
            Brands
          </a>
          <a href='#' className='flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-sm hover:scale-105'>
            <FaCalculator className='w-4 h-4' />
            EMI Calculator
          </a>
          <a href='#' className='flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 text-sm hover:scale-105'>
            <FaBlog className='w-4 h-4' />
            Blogs
          </a>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-lg font-semibold text-gray-800'>Categories</h2>
          <button
            onClick={() => setIsOpen(false)}
            className='text-gray-500 hover:text-red-500 transition-colors'
          >
            <FaTimes className='w-5 h-5' />
          </button>
        </div>

        <div className='p-4 space-y-2 overflow-y-auto max-h-[90vh]'>
          {loading ? (
            <p className='text-gray-500 text-sm'>Loading...</p>
          ) : (
            mainCategories.map(cat => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className='block text-gray-700 hover:text-blue-500 transition-all'
              >
                {cat.name}
              </Link>
            ))
          )}
        </div>
      </aside>
    </>
  )
}

export default Navmenu
