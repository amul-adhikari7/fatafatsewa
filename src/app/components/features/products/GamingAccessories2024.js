'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { useFavorites } from '../../../components/contexts/FavoritesContext'

const GamingAccessories2024 = () => {
  const [accessories, setAccessories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        // Placeholder data - replace with your actual API call
        const data = [
          {
            id: 1,
            name: 'Razer DeathAdder V3 Pro',
            price: 19999,
            image: '/assets/razer-mouse.jpg',
            description: 'Professional Gaming Mouse'
          },
          {
            id: 2,
            name: 'SteelSeries Apex Pro',
            price: 25000,
            image: '/assets/steelseries-keyboard.jpg',
            description: 'Mechanical Gaming Keyboard'
          },
          // Add more accessories as needed
        ]
        setAccessories(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch gaming accessories')
        setLoading(false)
      }
    }

    fetchAccessories()
  }, [])

  if (loading) return <div className="text-center py-4">Loading...</div>
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Gaming Accessories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                {accessory.image && (
                  <Image
                    src={accessory.image}
                    alt={accessory.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                )}
                <button
                  onClick={() => toggleFavorite(accessory.id)}
                  className="absolute top-2 right-2 p-2"
                >
                  <FaHeart
                    className={`text-xl ${
                      isFavorite(accessory.id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{accessory.name}</h3>
                <p className="text-gray-600 mb-2">{accessory.description}</p>
                <p className="text-xl font-bold">Rs. {accessory.price}</p>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GamingAccessories2024