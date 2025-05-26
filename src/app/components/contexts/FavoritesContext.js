'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : {}
      } catch (e) {
        console.error('Error loading favorites from localStorage:', e)
        return {}
      }
    }
    return {}
  })

  useEffect(() => {
    // Save to localStorage whenever favorites change
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites))
      } catch (e) {
        console.error('Error saving favorites to localStorage:', e)
      }
    }
  }, [favorites])

  const toggleFavorite = (product) => {
    if (!product || !product.id) return;
    
    setFavorites(prev => {
      const newFavorites = { ...prev }
      if (newFavorites[product.id]) {
        delete newFavorites[product.id]
      } else {
        newFavorites[product.id] = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.image_urls?.default,
        }
      }
      return newFavorites
    })
  }

  const getFavoriteProducts = () => {
    return Object.values(favorites).filter(Boolean)
  }

  const isFavorite = (productId) => {
    return Boolean(favorites[productId])
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      getFavoriteProducts,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}