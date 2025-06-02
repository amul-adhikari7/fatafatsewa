'use client'
import React from 'react'
import Image from 'next/image'
import { FaHeart, FaTruck, FaCartPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useFavorites } from '../../../components/contexts/FavoritesContext'
import { useCart } from '../../../components/contexts/CartContext'

const laptops = [
    {
        id: 1,
        name: 'Acer Nitro 5 2023 Gaming Laptop',
        description: 'i7 12th Gen, RTX 3050, 16GB RAM',
        price: 'Rs 160,000',
        oldPrice: 'Rs 178,000',
        image: '/assets/Acer-Nitro-V-2023-I7-1260P-RTX-3050.jpg',
        tag: '10% Off'
    },
    {
        id: 2,
        name: 'Xiaomi RedmiBook 15',
        description: 'i3 11th Gen, 8GB RAM, 512GB SSD',
        price: 'Rs 79,900',
        image: '/assets/XIAOMI-REDMIBOOK.jpg',
        tag: 'Fastest Delivery'
    },
    {
        id: 3,
        name: 'MacBook Pro 16-inch 2023',
        description: 'M3 Pro, 12 Core CPU, 18 Core GPU',
        price: 'Rs 410,000',
        image: '/assets/MacBook-pro-retina.jpg',
        tag: 'New'
    },
    {
        id: 4,
        name: 'ASUS ROG Strix G513QE',
        description: 'Ryzen 7 5800H, 16GB RAM, RTX 3050Ti',
        price: 'Rs 79,900',
        oldPrice: 'Rs 89,900',
        image: '/assets/asus-rog-strix.png',
        tag: 'Limited Stock'
    },
    {
        id: 5,
        name: 'ASUS ROG Strix G513QE',
        description: 'Ryzen 7 5800H, 16GB RAM, RTX 3050Ti',
        price: 'Rs 79,900',
        oldPrice: 'Rs 89,900',
        image: '/assets/asus-rog-strix.png',
        tag: 'Limited Stock'
    }
]

const LaptopsOf2024 = () => {
    const router = useRouter()
    const { toggleFavorite, isFavorite } = useFavorites()
    const { addToCart } = useCart()

    const handleClick = (id) => {
        router.push(`/product/${id}`)
    }

    const handleAddToCart = (e, item) => {
        e.stopPropagation()
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
        })
    }

    return (
        <div className="bg-white py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Laptops Of 2024
                    </h2>
                    <button className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full hover:bg-blue-200">
                        More Products
                    </button>
                </div>
                <div className="h-1 bg-orange-500 w-32 mb-4"></div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {laptops.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border rounded-xl p-3 relative shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col h-[400px]"
                            onClick={() => handleClick(item.id)}
                        >
                            {item.tag && (
                                <span
                                    className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-0.5 rounded ${
                                        item.tag.includes('%')
                                            ? 'bg-green-500'
                                            : item.tag === 'New'
                                            ? 'bg-blue-500'
                                            : 'bg-orange-500'
                                    }`}
                                >
                                    {item.tag}
                                </span>
                            )}
                            <div className="flex-1 flex items-center justify-center relative">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={200}
                                    height={200}
                                    className="mx-auto object-contain max-h-48 transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleFavorite(item)
                                    }}
                                    className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <FaHeart
                                        className={`text-lg ${
                                            isFavorite(item.id)
                                                ? 'text-red-500'
                                                : 'text-gray-400 hover:text-red-500'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="mt-auto space-y-1">
                                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                    {item.name}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    {item.description}
                                </p>
                                <div>
                                    {item.oldPrice && (
                                        <p className="text-xs text-gray-400 line-through">
                                            {item.oldPrice}
                                        </p>
                                    )}
                                    <p className="text-blue-600 font-semibold text-base">
                                        {item.price}
                                    </p>
                                </div>
                                <div className="flex gap-2 text-xs text-gray-600">
                                    <span className="border border-gray-300 text-orange-600 font-bold px-2 py-0.5 rounded-full">
                                        EMI
                                    </span>
                                    <span className="border border-gray-300 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                                        <FaTruck className="inline-block mr-1" />
                                        Fatafat Delivery
                                    </span>
                                </div>
                                {/* <button
                                    onClick={(e) => handleAddToCart(e, item)}
                                    className="w-full bg-blue-600 text-white text-sm font-semibold px-2 py-1.5 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-2"
                                >
                                    <FaCartPlus />
                                    Add to Cart
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    {[0, 1, 2].map((_, i) => (
                        <span
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                                i === 0 ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LaptopsOf2024
