'use client'
import React from 'react'
import Image from 'next/image'
import { useCategories } from '../../components/contexts/Categories'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

const Popularcategories = () => {
  const { categories, loading, error } = useCategories()

  // Get featured categories and ensure they have images
  const featuredCategories = React.useMemo(() => {
    return categories
      .filter(cat => cat.featured === 1 && cat.category_image?.full)
      .map(cat => ({
        ...cat,
        imageUrl: cat.category_image.full,
      }))
      .slice(0, 6) // Limit to 6 categories
  }, [categories])

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="text-center text-red-500 py-4">
      {error}
    </div>
  )

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
          <Link
            href="/categories"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
          >
            View All
            <FaChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredCategories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.id}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="relative aspect-square p-4 flex items-center justify-center bg-gradient-to-b from-blue-50/50 to-transparent">
                  <Image
                    src={category.imageUrl}
                    alt={category.title}
                    width={100}
                    height={100}
                    className="object-contain w-24 h-24"
                  />
                </div>
                <div className="p-4 text-center bg-white border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                    {category.title}
                  </h3>
                  {category.parent_tree && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {category.parent_tree}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Popularcategories
