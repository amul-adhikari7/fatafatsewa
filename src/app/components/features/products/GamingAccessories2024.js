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
        const data = [
          {
            id: 1,
            name: 'Anker Soundcore Strike 1 Gaming Headphones',
            price: 8999,
            oldPrice: null,
            discount: null,
            tag: 'Fastest Delivery',
            image: '/assets/headphones.jpg',
          },
          {
            id: 2,
            name: 'Nintendo Switch - OLED Model White Joy-Con',
            price: 66499,
            oldPrice: 98490,
            discount: '32.6% Off',
            tag: 'Fastest Delivery',
            image: '/assets/switch.jpg',
          },
          {
            id: 3,
            name: 'Fantech Raigor II Wg10 Gaming Mouse in Red',
            price: 999,
            oldPrice: null,
            discount: null,
            tag: 'New',
            image: '/assets/fantech-red.jpg',
          },
          {
            id: 4,
            name: 'Onikuma k9 RGB Stereo Gaming Headsets',
            price: 3999,
            oldPrice: null,
            discount: null,
            tag: 'New',
            image: '/assets/onikuma-k9.jpg',
          },
          {
            id: 5,
            name: 'Fantech Raigor II Wg10 Gaming Mouse in Red & White',
            price: 999,
            oldPrice: null,
            discount: null,
            tag: 'Out Of Stock',
            image: '/assets/fantech-blackwhite.jpg',
          },
          {
            id: 6,
            name: 'Ajazz AK820PRO 75% Gasket Mount Hot Sw...',
            price: 9999,
            oldPrice: null,
            discount: null,
            tag: 'Out Of Stock',
            image: '/assets/ajazz-ak820pro.jpg',
          },
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
        <div className="flex items-center justify-between border-b-4 border-orange-500 pb-2">
          <h2 className="text-2xl font-bold">Gaming Accessories Of 2024</h2>
          <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
            More Products
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {accessories.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              {item.discount && (
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                  {item.discount}
                </span>
              )}
              {!item.discount && item.tag === 'New' && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                  New
                </span>
              )}
              <div className="relative mt-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={150}
                  className="w-full h-32 object-contain"
                />
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-1 right-1 p-1"
                >
                  <FaHeart
                    className={`text-lg ${
                      isFavorite(item.id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <h3 className="text-sm font-medium mt-2 mb-1 leading-tight">
                {item.name}
              </h3>
              {item.oldPrice && (
                <p className="text-gray-500 line-through text-sm">
                  Rs {item.oldPrice.toLocaleString()}
                </p>
              )}
              <p className="text-blue-600 font-semibold text-lg">
                Rs {item.price.toLocaleString()}
              </p>
              <p
                className={`mt-1 text-xs px-2 py-0.5 rounded-full inline-block ${
                  item.tag === 'Out Of Stock'
                    ? 'bg-red-100 text-red-600 border border-red-300'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {item.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GamingAccessories2024
