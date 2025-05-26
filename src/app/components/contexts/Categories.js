'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const CategoriesContext = createContext()

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fatafatsewa.com/api/v1/categories', {
          headers: {
            'API-Key': 'pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I',
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }

        const data = await response.json()
        setCategories(data.categories)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const getCategoryBySlug = (slug) => {
    return categories.find(category => category.slug === slug)
  }

  const getCategoryById = (id) => {
    return categories.find(category => category.id === id)
  }

  const getFeaturedCategories = () => {
    return categories.filter(category => category.featured === 1)
  }

  return (
    <CategoriesContext.Provider value={{
      categories,
      loading,
      error,
      getCategoryBySlug,
      getCategoryById,
      getFeaturedCategories
    }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext)
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider')
  }
  return context
}