'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaThLarge, FaTags, FaCalculator, FaBlog } from 'react-icons/fa'
import { useCategories } from '../../components/contexts/Categories'
import CategoryPanel from '../sections/CategoryPanel'

const Navmenu = () => {
  const { categories, loading } = useCategories()
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const mainCategories = categories.filter(cat => !cat.parent_id)

  return (
    <>
      <nav className='w-full flex justify-center py-4 bg-gradient-to-r from-blue-200 via-blue-200 to-blue-200'>
        <div className='flex items-center gap-x-7 bg-white/60 backdrop-blur-lg rounded-xl px-8 py-2.5 shadow-md border border-blue-100/30 ring-1 ring-blue-100/10'>
          {/* Category Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-500 transition-all duration-200 font-medium text-sm'
          >
            <FaThLarge className='w-5 h-5' />
            <span>Category</span>
          </button>
          {/* Brands */}
          <a
            href='#'
            className='flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 font-normal text-sm hover:scale-105'
          >
            <FaTags className='w-4 h-4' />
            Brands
          </a>
          {/* EMI Calculator */}
          <a
            href='#'
            className='flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 font-normal text-sm hover:scale-105'
          >
            <FaCalculator className='w-4 h-4' />
            EMI Calculator
          </a>
          {/* Blogs */}
          <a
            href='#'
            className='flex items-center gap-1.5 text-gray-600 hover:text-blue-500 px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-50/70 font-normal text-sm hover:scale-105'
          >
            <FaBlog className='w-4 h-4' />
            Blogs
          </a>
        </div>
      </nav>

      {/* Category Panel for Mobile */}
      <div className='md:hidden'>
        <CategoryPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          categories={mainCategories}
          loading={loading}
        />
      </div>

      {/* Category Panel for Desktop */}
      <div className='hidden md:block'>
        <nav className='bg-white border-b'>
          <div className='container mx-auto px-4'>
            <div className='flex items-center h-14'>
              <div className='relative group'>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='flex items-center px-4 py-2 text-gray-700 hover:text-blue-600'
                >
                  <svg
                    className='w-6 h-6 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                  All Categories
                </button>

                {isOpen && (
                  <div className='absolute z-50 w-64 py-2 mt-1 bg-white rounded-md shadow-xl'>
                    {loading ? (
                      <div className='px-4 py-2'>Loading categories...</div>
                    ) : (
                      mainCategories.map((category) => (
                        <div key={category.id} className='group/item relative'>
                          <Link
                            href={`/category/${category.slug}`}
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                          >
                            {category.title}
                          </Link>
                          {/* Subcategories */}
                          {categories
                            .filter(cat => cat.parent_id === category.id)
                            .length > 0 && (
                            <div className='hidden group-hover/item:block absolute left-full top-0 w-64 bg-white shadow-xl rounded-md'>
                              {categories
                                .filter(cat => cat.parent_id === category.id)
                                .map(subCat => (
                                  <Link
                                    key={subCat.id}
                                    href={`/category/${subCat.slug}`}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                  >
                                    {subCat.title}
                                  </Link>
                                ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Quick links */}
              <div className='hidden md:flex space-x-8 ml-8'>
                <Link
                  href='/new-arrivals'
                  className='text-gray-700 hover:text-blue-600'
                >
                  New Arrivals
                </Link>
                <Link href='/deals' className='text-gray-700 hover:text-blue-600'>
                  Deals
                </Link>
                <Link
                  href='/clearance'
                  className='text-gray-700 hover:text-blue-600'
                >
                  Clearance
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navmenu
