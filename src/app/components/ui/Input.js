'use client'
import React from 'react'

const Input = ({ 
  className = '', 
  error,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : ''

  return (
    <div>
      <input
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input