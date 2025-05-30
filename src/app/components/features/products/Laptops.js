'use client';
import React from 'react'
import Image from 'next/image'
import { FaTruck, FaCreditCard } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
const laptops = [
  {
    id: 1,
    title: 'Acer Nitro 5 2023 i7 12th/RTX 3050',
    price: 160000,
    image: '/laptops/acer.jpg',
    label: '10.00% Off'
  },
  {
    id: 2,
    title: 'Xiaomi RedmiBook 15 i3 11th Gen 8GB RAM',
    price: 79900,
    image: '/laptops/redmi.jpg'
  },
  {
    id: 3,
    title: 'MacBook Pro 16-inch M3 Pro 2023 - 12 Core',
    price: 410000,
    image: '/laptops/macbook.jpg',
    label: 'New'
  },
  {
    id: 4,
    title: 'ASUS G513QE-HN163T Ryzen 7 5800H, 16 GB',
    price: 79900,
    image: '/laptops/asus1.jpg'
  }
]

const LaptopsOf2024 = () => {
  const router = useRouter();
  const handleClick=(id)=>{
    router.push(`/product/${id}`)
  }
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Laptops Of 2024</h2>
          <button className="text-sm bg-blue-100 text-blue-700 px-4 py-1.5 rounded-md shadow hover:bg-blue-700 transition">
              More Products
          </button>
        </div>
        <div className="w-full h-1 bg-orange-500 mb-4 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {laptops.map((laptop) => (
            <div onClick={handleClick(laptop.id)}
              key={laptop.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border relative h-[420px] flex flex-col"
            >
              {laptop.label && (
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {laptop.label}
                </span>
              )}
              <div className="relative h-64 w-full">
                <Image
                  src={laptop.image}
                  alt={laptop.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-3 space-y-2 mt-auto">
                <h3 className="text-sm font-semibold line-clamp-2">{laptop.title}</h3>
                <p className="text-blue-600 font-bold text-sm">Rs {laptop.price.toLocaleString()}</p>
                <div className="flex flex-wrap items-center text-xs gap-2 text-gray-600">
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

export default LaptopsOf2024
