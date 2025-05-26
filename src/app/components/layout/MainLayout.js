'use client'
import React from 'react'
import Navbar from './Navbar'
import Navmenu from './Navmenu'
import Footer from './Footer'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Navmenu />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default MainLayout