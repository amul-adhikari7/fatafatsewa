'use client'
import React from 'react'
import Image from 'next/image'
import { FaTruck, FaCreditCard } from 'react-icons/fa'

const appliances = [
  {
    id: 1,
    title: 'Samsung 253L Double Door Refrigerator',
    price: 45000,
    image: '/appliances/fridge.jpg',
    label: '10% Off'
  },
  {
    id: 2,
    title: 'LG 7kg Front Load Washing Machine',
    price: 32000,
    image: '/appliances/washing-machine.jpg'
  },
  {
    id: 3,
    title: 'Philips Air Fryer HD9200',
    price: 11000,
    image: '/appliances/airfryer.jpg',
    label: 'New'
  },
  {
    id: 4,
    title: 'IFB 30L Convection Microwave Oven',
    price: 17000,
    image: '/appliances/microwave.jpg'
  }
]

const HomeAppliances2024 = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Home Appliances Of 2024</h2>
          <button className="text-sm bg-blue-100 text-blue-700 px-4 py-1 rounded-full hover:bg-blue-700 transition-colors shadow">
             More Products
          </button>
        </div>
        <div className="w-full h-1 bg-orange-500 mb-4 rounded"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {appliances.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border relative h-[360px] flex flex-col"
            >
              {item.label && (
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {item.label}
                </span>
              )}
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-2 space-y-1 mt-auto">
                <h3 className="text-xs font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-blue-600 font-bold text-xs">Rs {item.price.toLocaleString()}</p>
                <div className="flex flex-wrap items-center text-[10px] gap-1 text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaCreditCard className="text-primary" /> EMI
                  </div>
                  <div className="flex items-center gap-1">
                    <FaTruck className="text-primary" /> Fatafat Delivery
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeAppliances2024