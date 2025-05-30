'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaSearch,
  FaTrash
} from 'react-icons/fa'
import AuthModal from '../features/auth/AuthModal'
import CartModal from '../features/cart/CartModal'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const { cartItemsCount, isCartOpen, setIsCartOpen } = useCart()
  const { getFavoriteProducts, toggleFavorite } = useFavorites()
  const favoritesRef = useRef(null)

  const favorites = getFavoriteProducts()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (favoritesRef.current && !favoritesRef.current.contains(event.target)) {
        setIsFavoritesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <nav className='w-full bg-white shadow-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <div className='flex-shrink-0 flex items-center pr-4 md:pr-8 lg:pr-12'>
              <Link href="/">
                <Image
                  src='/assets/logo.svg'
                  alt='logo'
                  width={120}
                  height={48}
                  className='object-contain'
                />
              </Link>
            </div>

            {/* Search bar and icons container */}
            <div className='flex-1 flex items-center justify-center'>
              {/* Search bar */}
              <div className='w-full max-w-md flex items-center'>
                <div className='flex items-center w-full border border-blue-200 rounded-lg overflow-hidden bg-white'>
                  <input
                    type='text'
                    placeholder='Search products, brands, categories...'
                    className='w-full px-4 py-2 outline-none text-sm bg-white'
                  />
                  <button className='bg-blue-600 hover:bg-blue-700 transition-colors text-white w-10 h-10 flex items-center justify-center rounded-r-lg'>
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>

            {/* Icons */}
            <div className='flex items-center space-x-4 ml-4'>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors'
                aria-label='User Info'
              >
                <FaUser />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors relative'
                aria-label='Cart'
              >
                <FaShoppingCart />
                {cartItemsCount > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center'>
                    {cartItemsCount}
                  </span>
                )}
              </button>              <div className="relative" ref={favoritesRef}>
                <button
                  onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors relative'
                  aria-label='Favourites'
                >
                  <FaHeart />
                  {favorites.length > 0 && (
                    <span className='absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center'>
                      {favorites.length}
                    </span>
                  )}
                </button>

                {/* Favorites Dropdown */}
                {isFavoritesOpen && favorites.length > 0 && (
                  <div className='absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50'>
                    <div className='p-2 border-b border-gray-100'>
                      <h3 className='text-sm font-semibold text-gray-700'>
                        Favorites ({favorites.length})
                      </h3>
                    </div>
                    <div className='max-h-96 overflow-y-auto'>
                      {favorites.map((product) => (
                        <div
                          key={product.id}
                          className='p-2 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100'
                        >
                          <div className='w-12 h-12 relative flex-shrink-0'>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className='object-cover rounded'
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {product.name}
                            </p>
                            <p className='text-sm text-gray-500'>
                              Rs {product.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(product)
                            }}
                            className='text-red-500 hover:text-red-700 p-2'
                            aria-label='Remove from favorites'
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isFavoritesOpen && favorites.length === 0 && (
                  <div className='absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50 p-4'>
                    <p className='text-center text-gray-500'>
                      No favorites yet
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors md:hidden'
                aria-label='Menu'
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className='absolute top-full left-0 w-full bg-white border-t border-blue-100 shadow-lg flex flex-col items-center py-4 gap-4 z-10 lg:hidden animate-fade-in'>
            <div className='flex items-center w-full max-w-md border border-blue-200 rounded-lg overflow-hidden bg-white'>
              <input
                type='text'
                placeholder='Search products, brands, categories...'
                className='w-full px-4 py-2 outline-none text-sm bg-white'
              />
              <button className='bg-blue-600 hover:bg-blue-700 transition-colors text-white w-10 h-10 flex items-center justify-center rounded-r-lg'>
                <FaSearch />
              </button>
            </div>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors'
                aria-label='User Info'
              >
                <FaUser />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors relative'
                aria-label='Cart'
              >
                <FaShoppingCart />
                {cartItemsCount > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center'>
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <div className='relative'>
                <button
                  onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors relative'
                  aria-label='Favourites'
                >
                  <FaHeart />
                  {favorites.length > 0 && (
                    <span className='absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center'>
                      {favorites.length}
                    </span>
                  )}
                </button>

                {/* Favorites Dropdown */}
                {isFavoritesOpen && favorites.length > 0 && (
                  <div className='absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50'>
                    <div className='p-2 border-b border-gray-100'>
                      <h3 className='text-sm font-semibold text-gray-700'>
                        Favorites ({favorites.length})
                      </h3>
                    </div>
                    <div className='max-h-96 overflow-y-auto'>
                      {favorites.map((product) => (
                        <div
                          key={product.id}
                          className='p-2 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100'
                        >
                          <div className='w-12 h-12 relative flex-shrink-0'>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className='object-cover rounded'
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {product.name}
                            </p>
                            <p className='text-sm text-gray-500'>
                              Rs {product.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(product)
                            }}
                            className='text-red-500 hover:text-red-700 p-2'
                            aria-label='Remove from favorites'
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isFavoritesOpen && favorites.length === 0 && (
                  <div className='absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-50 p-4'>
                    <p className='text-center text-gray-500'>
                      No favorites yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar
