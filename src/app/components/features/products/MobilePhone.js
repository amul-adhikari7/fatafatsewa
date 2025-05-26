'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaHeart, FaSearch, FaSort } from 'react-icons/fa'
import { useFavorites } from '../../../components/contexts/FavoritesContext'
import { useProducts } from '../../../components/contexts/ProductsContext'

const MobilePhone = () => {
  const { mobiles: phones, loading, error } = useProducts()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [sortBy, setSortBy] = useState('default')
  const [filterBrand, setFilterBrand] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique brands for filter, ensuring no null/undefined values and sorting alphabetically
  const brands = React.useMemo(() => {
    const brandSet = new Set(
      phones
        ?.filter(phone => phone && typeof phone.brand === 'string')
        ?.map(phone => phone.brand.trim())
        ?.filter(Boolean) || []
    )
    return Array.from(brandSet).sort()
  }, [phones])

  // Filter and sort phones
  const filteredAndSortedPhones = React.useMemo(() => {
    return phones
      ?.filter(phone => 
        phone && 
        phone.name && 
        phone.brand && 
        typeof phone.name === 'string' &&
        (filterBrand === 'all' || phone.brand === filterBrand) &&
        phone.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      ?.sort((a, b) => {
        switch (sortBy) {
          case 'priceLow':
            return a.price - b.price
          case 'priceHigh':
            return b.price - a.price
          case 'name':
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
  }, [phones, filterBrand, searchQuery, sortBy])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold">Mobile Phones</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Brand Filter */}
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {filteredAndSortedPhones?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No phones match your search criteria
          </div>
        ) : (          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedPhones?.map((phone) => (
              <div key={`${phone.id}-${Date.now()}`} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="relative">
                  {phone.image && (
                    <Image
                      src={phone.image}
                      alt={phone.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <button
                    onClick={() => toggleFavorite(phone.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label={isFavorite(phone.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <FaHeart
                      className={`text-xl ${
                        isFavorite(phone.id) ? 'text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  {!phone.inStock && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{phone.name}</h3>
                  <p className="text-gray-600 mb-2">{phone.description}</p>
                  <div className="text-sm text-gray-500 mb-2">{phone.brand}</div>
                  <p className="text-xl font-bold text-blue-600">Rs. {phone.price.toLocaleString()}</p>
                  <button 
                    className={`mt-3 w-full py-2 px-4 rounded transition-colors ${
                      phone.inStock 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
                    disabled={!phone.inStock}
                  >
                    {phone.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MobilePhone