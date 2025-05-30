'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCategories } from '../contexts/Categories'
import { FaChevronRight } from 'react-icons/fa'
import { Card } from '../ui'

const CategoryPanel = () => {
  const { categories, loading, error } = useCategories()

  const getBrandName = (brand) => {
    if (!brand) return ''
    return typeof brand === 'string' ? brand : brand.name || ''
  }

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>
  }

  const mainCategories = categories
    .filter((cat) => !cat.parent_id)
    .map((cat) => ({
      ...cat,
      brandName: getBrandName(cat.brand)
    }))

  const fixedCategories = mainCategories.slice(0, 4)

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
          <Link
            href="/categories"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All
            <FaChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Only Top 4 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fixedCategories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.id}
              className="transform hover:scale-105 transition-transform duration-200"
            >
              <Card hover className="h-full">
                <div className="relative aspect-[4/3]">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold">{category.title}</h3>
                    <p className="text-xs text-white/80">
                      {categories.filter((cat) => cat.parent_id === category.id).length} Products
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryPanel
