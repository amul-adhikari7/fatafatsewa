'use client'
import React from 'react'
import Image from 'next/image'
import { useProducts } from '../contexts/ProductsContext'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa'
import { IoMdFlash } from 'react-icons/io'
import { useRouter } from 'next/navigation'

const NewArrivals = () => {
  const { newArrivals, loading, error } = useProducts()
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useFavorites()
  const router = useRouter()

  if (loading) return <div className='p-8 text-center'>Loading...</div>
  if (error) return <div className='p-8 text-center text-red-500'>{error}</div>

  const display = (newArrivals || [])
    .filter(p => p.created_at && !isNaN(new Date(p.created_at)))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  const handleAddToCart = (e, product) => {
    e.stopPropagation() // Prevent navigation when clicking add to cart
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image || '/Property 1=Slider_Component_2.svg'
    })
  }

  const handleToggleFavorite = (e, product) => {
    e.stopPropagation() // Prevent navigation when clicking favorite
    toggleFavorite(product)
  }

  const handleClick = (id) => {
    router.push(`/product/${id}`)
  }

  return (
    <div className='w-full bg-white py-8'>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        {/* Heading */}
        <div className='mb-6'>
          <h2 className='text-3xl font-bold text-black'>New Arrivals</h2>
          <div className='h-1 w-full bg-orange-400 mt-1 rounded'></div>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {display.length === 0 ? (
            <div className='text-center text-gray-400 py-12 col-span-full'>
              No new arrivals found.
            </div>
          ) : (
            display.map((product, index) => {
              const hasEmi =
                product.emi === true ||
                product.emi_available === true ||
                (typeof product.emi === 'string' &&
                  product.emi.toLowerCase() === 'yes')

              const formattedDate =
                product.created_at && !isNaN(new Date(product.created_at))
                  ? new Date(product.created_at).toLocaleDateString()
                  : 'Not Available'

              return (
                <div
                  key={product.id}
                  onClick={() => handleClick(product.id)}
                  className='group border rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200 p-4 flex flex-col items-center min-h-[500px] cursor-pointer'
                >
                  {/* Image */}
                  <div className='relative w-36 h-52 mb-4 flex items-center justify-center'>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={144}
                      height={208}
                      style={{ width: 'auto', height: 'auto' }}
                      className='object-contain max-w-full max-h-full transition-transform duration-200 transform group-hover:scale-105'
                      priority={index === 0}
                    />
                    {/* Buttons */}
                    <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200'>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className='bg-blue-600 text-white p-2 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-blue-700'
                        title='Add to Cart'
                      >
                        <FaShoppingCart className='w-4 h-4' />
                      </button>
                      <button
                        onClick={(e) => handleToggleFavorite(e, product)}
                        className={`p-2 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 
                          ${favorites[product.id]
                            ? 'bg-pink-600 text-white hover:bg-pink-700'
                            : 'bg-white text-gray-600 hover:text-pink-600'}`}
                      >
                        {favorites[product.id] ? (
                          <FaHeart className='w-4 h-4' />
                        ) : (
                          <FaRegHeart className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className='w-full text-center'>
                    <div className='text-base font-semibold text-gray-900 line-clamp-2 h-10'>
                      {product.name}
                    </div>
                    <div className='text-xs text-gray-500 mt-1'>
                      Added: {formattedDate}
                    </div>
                    <div className='flex justify-center gap-1 my-2'>
                      {[...Array(product.rating || 5)].map((_, i) => (
                        <span key={i} className='text-yellow-500 text-xs'>
                          ★
                        </span>
                      ))}
                    </div>
                    <div className='text-blue-600 font-bold text-base'>
                      Rs {product.price?.toLocaleString()}
                    </div>
                    {hasEmi && (
                      <div className='flex justify-center mt-3'>
                        <span className='px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium flex items-center gap-1'>
                          <IoMdFlash className='w-3 h-3' />
                          Fatafat Delivery
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default NewArrivals
