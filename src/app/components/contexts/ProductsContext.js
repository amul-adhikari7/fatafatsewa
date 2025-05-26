'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [productsBySection, setProductsBySection] = useState({
    mobiles: [],
    laptops: [],
    homeAppliances: [],
    newArrivals: [],
    popular: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiKey = 'pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I'
  
  // Helper to normalize brand data
  const normalizeBrand = (brand) => {
    if (!brand) return '';
    return typeof brand === 'string' ? brand : brand.name || '';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories (devices/products) from the new API
        const res = await fetch('https://fatafatsewa.com/api/v1/categories', {
          headers: { 'Api-Key': apiKey }
        })
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        const categories = data.categories || []

        // Debug: log categories to find the correct home appliances category
        if (typeof window !== 'undefined') {
          console.log('Fetched categories:', categories)
        }

        // Helper to find category by keyword
        const findCategoryId = keyword => {
          const cat = categories.find(cat =>
            (cat.title || '').toLowerCase().includes(keyword)
          )
          return cat ? cat.id : null
        }

        // Fetch products for a given category id
        const fetchProductsByCategory = async categoryId => {
          if (!categoryId) return []
          const res = await fetch(
            `https://fatafatsewa.com/api/v1/products?category_id=${categoryId}`,
            {
              headers: { 'Api-Key': apiKey }
            }
          )
          if (!res.ok) return []
          const data = await res.json()
          // Map image from API and normalize brand data
          return (data.products || []).map(product => ({
            ...product,
            image:
              (product.images && product.images[0]?.url) ||
              product.image ||
              '/placeholder.png',
            brand: normalizeBrand(product.brand)
          }))
        }

        // Get main category IDs
        // Use exact match for 'Laptop' category title
        const laptopCatId = categories.find(
          cat => (cat.title || '').toLowerCase() === 'laptop'
        )?.id
        const mobileCatId = findCategoryId('mobile')
        // Try more specific keywords for home appliances
        const applianceCatId =
          findCategoryId('home appliance') ||
          findCategoryId('appliance') ||
          findCategoryId('home')

        // Fetch products for each main category
        // Only fetch laptops if laptopCatId is found
        let laptops = []
        if (laptopCatId) {
          laptops = await fetchProductsByCategory(laptopCatId)
          // Filter out any products that are not laptops (e.g., mobiles)
          laptops = laptops.filter(product => {
            const name = (product.name || '').toLowerCase()
            return (
              name.includes('laptop') ||
              name.includes('notebook') ||
              name.includes('macbook') ||
              name.includes('dell') ||
              name.includes('hp') ||
              name.includes('lenovo') ||
              name.includes('asus') ||
              name.includes('acer') ||
              name.includes('surface')
            )
          })
        }
        const [mobiles, homeAppliances] = await Promise.all([
          fetchProductsByCategory(mobileCatId),
          fetchProductsByCategory(applianceCatId)
        ])

        // Aggregate all products for new arrivals
        const allProducts = [...mobiles, ...laptops, ...homeAppliances]
        const sortByDateDesc = (a, b) => {
          const dateA = new Date(a.created_at || a.updated_at || 0)
          const dateB = new Date(b.created_at || b.updated_at || 0)
          return dateB - dateA
        }
        const newArrivals = [...allProducts].sort(sortByDateDesc).slice(0, 10)

        setProductsBySection({
          mobiles,
          laptops,
          homeAppliances,
          newArrivals,
          popular: [] // You can refine this if API supports popular products
        })
      } catch (err) {
        setError('Error loading products: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <ProductsContext.Provider value={{ ...productsBySection, loading, error }}>
      {/* Only show error or children, no spinner */}
      {error ? (
        <div className='flex flex-col items-center justify-center min-h-[40vh] w-full'>
          <svg
            className='h-10 w-10 text-red-500 mb-4'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <circle
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='2'
              fill='none'
            />
            <path
              d='M15 9l-6 6M9 9l6 6'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='text-red-500 text-lg font-semibold'>{error}</span>
        </div>
      ) : (
        children
      )}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
