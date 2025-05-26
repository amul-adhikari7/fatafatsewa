'use client'
import React, { useState, useEffect } from 'react'
import { useCategories } from '../../components/contexts/Categories'

const SearchCategories = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const { categories } = useCategories()
  
  // Extract unique brand names from categories and ensure they're strings
  const brands = React.useMemo(() => {
    return [...new Set(categories
      .map(cat => {
        // Handle cases where brand might be an object or string
        if (!cat.brand) return '';
        if (typeof cat.brand === 'string') return cat.brand;
        return cat.brand?.name || ''; // Safely access name property if brand is an object
      })
      .filter(Boolean) // Remove empty strings
    )].sort();
  }, [categories]);

  useEffect(() => {
    const filtered = categories.filter(category => {
      const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase());
      // Handle cases where brand might be an object or string
      const categoryBrand = typeof category.brand === 'string' ? category.brand : (category.brand?.name || '');
      const matchesBrand = selectedBrand === 'all' || categoryBrand === selectedBrand;
      return matchesSearch && matchesBrand;
    })
    onFilter(filtered)
  }, [searchTerm, selectedBrand, categories, onFilter])

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
      >
        <option value="all">All Brands</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
    </div>
  )
}

export default SearchCategories