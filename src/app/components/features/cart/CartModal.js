'use client'
import React from 'react'
import Image from 'next/image'
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '../../contexts/CartContext'
import { FaShoppingCart } from 'react-icons/fa'
const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40'
        onClick={onClose}
      />

      {/* Sliding Cart Panel */}
      <div className='fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300'>
        {/* Header */}
        <div className='p-4 border-b flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Shopping Cart</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90'
          >
            <FaTimes className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        {/* Cart Items */}
        <div className='flex-1 overflow-y-auto p-4'>
          {cart.length === 0 ? (
            <div className='text-center py-8'>
              <div className='w-24 h-24 mx-auto mb-4 text-gray-300'>
                <FaShoppingCart className='w-full h-full' />
              </div>
              <p className='text-gray-500 text-center mb-6'>
                Your cart is empty. Add some products to get started!
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {cart.map(item => (
                <div
                  key={item.id}
                  className='flex items-center gap-4 p-3 border rounded-lg hover:shadow-md transition-shadow'
                >
                  <div className='relative w-20 h-20'>
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      fill
                      className='object-contain'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium text-gray-900'>{item.name}</h3>
                    <p className='text-blue-600 font-semibold'>
                      Rs {item.price?.toLocaleString()}
                    </p>
                    <div className='flex items-center gap-2 mt-2'>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className='p-1 rounded-full hover:bg-gray-100'
                      >
                        <FaMinus className='w-3 h-3 text-gray-600' />
                      </button>
                      <span className='w-8 text-center'>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className='p-1 rounded-full hover:bg-gray-100'
                      >
                        <FaPlus className='w-3 h-3 text-gray-600' />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='p-2 hover:bg-red-50 rounded-full group'
                  >
                    <FaTrash className='w-4 h-4 text-red-500 group-hover:text-red-600' />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart.length > 0 && (
          <div className='border-t p-4 bg-gray-50'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-gray-600'>Subtotal:</span>
              <span className='text-xl font-bold text-gray-900'>
                Rs {cartTotal?.toLocaleString()}
              </span>
            </div>
            <button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5'>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartModal
