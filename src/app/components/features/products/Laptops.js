'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { useFavorites } from '../../../components/contexts/FavoritesContext'
import { Button, Card } from '../../ui'

const Laptops = () => {
  const [laptops, setLaptops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const data = [
          {
            id: 1,
            name: 'MacBook Pro M3',
            price: 199999,
            image: '/assets/macbook-pro.jpg',
            description: 'Latest MacBook Pro with M3 chip'
          },
          {
            id: 2,
            name: 'Dell XPS 15',
            price: 175000,
            image: '/assets/dell-xps.jpg',
            description: 'Premium Windows Laptop'
          },
        ]
        setLaptops(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch laptops')
        setLoading(false)
      }
    }

    fetchLaptops()
  }, [])

  if (loading) return (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  )

  if (error) return (
    <div className="text-center text-red-500 py-8">{error}</div>
  )

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Laptops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {laptops.map((laptop) => (
            <Card key={laptop.id} hover className="overflow-hidden">
              <div className="relative">
                {laptop.image && (
                  <Image
                    src={laptop.image}
                    alt={laptop.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                )}
                <button
                  onClick={() => toggleFavorite(laptop.id)}
                  className="absolute top-2 right-2 p-2"
                >
                  <FaHeart
                    className={`text-xl ${
                      isFavorite(laptop.id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{laptop.name}</h3>
                <p className="text-gray-600 mb-2">{laptop.description}</p>
                <p className="text-xl font-bold mb-4">Rs. {laptop.price}</p>
                <Button variant="primary" className="w-full">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Laptops