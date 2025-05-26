'use client'
import { useState } from 'react'
import { FaTimes, FaEnvelope, FaLock, FaUser } from 'react-icons/fa'

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50'>
        <div className='relative bg-white rounded-2xl shadow-2xl overflow-hidden'>
          {/* Decorative top gradient */}
          <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' />

          <div className='p-8'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-3xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </h2>
              <button
                onClick={onClose}
                className='p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90'
              >
                <FaTimes className='w-5 h-5 text-gray-600' />
              </button>
            </div>

            <p className='text-gray-600 mb-8'>
              {isLogin
                ? 'Sign in to your account to continue'
                : 'Create an account to get started'}
            </p>

            <form className='space-y-6'>
              {!isLogin && (
                <div className='group'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors'>
                    Full Name
                  </label>
                  <div className='relative'>
                    <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors' />
                    <input
                      type='text'
                      placeholder='Enter your full name'
                      className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all'
                    />
                  </div>
                </div>
              )}

              <div className='group'>
                <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors'>
                  Email Address
                </label>
                <div className='relative'>
                  <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors' />
                  <input
                    type='email'
                    placeholder='Enter your email'
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all'
                  />
                </div>
              </div>

              <div className='group'>
                <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors'>
                  Password
                </label>
                <div className='relative'>
                  <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors' />
                  <input
                    type='password'
                    placeholder={
                      isLogin ? 'Enter your password' : 'Create a password'
                    }
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all'
                  />
                </div>
              </div>

              {!isLogin && (
                <div className='group'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors'>
                    Confirm Password
                  </label>
                  <div className='relative'>
                    <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors' />
                    <input
                      type='password'
                      placeholder='Confirm your password'
                      className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all'
                    />
                  </div>
                </div>
              )}

              <button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5'
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className='mt-6 text-center'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
                <div className='relative flex justify-center'>
                  <span className='px-4 text-sm text-gray-500 bg-white'>
                    Or
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className='mt-4 text-blue-600 hover:text-purple-600 text-sm font-semibold transition-colors'
              >
                {isLogin
                  ? "Don't have an account? Create one"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthModal
