'use client'
import React from 'react'
import Image from 'next/image'
import { useCategories } from '../../components/contexts/Categories'
import Link from 'next/link'

const Popularcategories = () => {
  const { categories, loading, error, getFeaturedCategories } = useCategories()
  const featuredCategories = getFeaturedCategories()

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
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featuredCategories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.id}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                <div className="relative w-full aspect-square mb-3">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <h3 className="text-center text-sm font-medium text-gray-800">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Popularcategories
