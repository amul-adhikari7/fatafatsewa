'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { useFavorites } from '../../../components/contexts/FavoritesContext'

const HomeAppliances = () => {
  const [appliances, setAppliances] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/products/home-appliances')
        if (!response.ok) throw new Error('Failed to fetch home appliances')
        const data = await response.json()
        setAppliances(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchAppliances()
  }, [])

  if (loading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Home Appliances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Home Appliances</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </section>
    )
  }

  // For development, using sample data if API is not ready
  const sampleAppliances = [
    {
      id: 1,
      name: 'Smart Refrigerator Pro',
      price: 89999,
      image: '/assets/products/fridge.jpg',
      description: 'Smart cooling technology with digital display',
    },
    {
      id: 2,
      name: 'AutoCook Rice Cooker',
      price: 12999,
      image: '/assets/products/rice-cooker.jpg',
      description: '10-cup capacity with multiple cooking modes',
    },
    // Add more sample items as needed
  ]

  const displayAppliances = appliances.length > 0 ? appliances : sampleAppliances

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Home Appliances</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayAppliances.map((appliance) => (
          <div
            key={appliance.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-square">
              <Image
                src={appliance.image}
                alt={appliance.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => toggleFavorite(appliance)}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm ${
                  isFavorite(appliance)
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/70 text-gray-600 hover:bg-pink-500 hover:text-white'
                } transition-colors duration-200`}
                aria-label={
                  isFavorite(appliance)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
              >
                <FaHeart size={16} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {appliance.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {appliance.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  Rs {appliance.price.toLocaleString()}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeAppliances
