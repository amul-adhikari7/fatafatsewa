'use client'
import React from 'react'

const Card = ({ 
  children, 
  hover = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm'
  const hoverClasses = hover ? 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300' : ''

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card