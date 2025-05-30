'use client'
import React from 'react'
import Image from 'next/image'
import { FaHeart, FaTruck, FaCartPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useFavorites } from '../../../components/contexts/FavoritesContext'
import { useCart } from '../../../components/contexts/CartContext'

const phones = [
	{
		id: 1,
		name: 'Apple iPhone 15 Plus',
		description: '256GB With Exchange..',
		price: 'Rs 173,000',
		oldPrice: 'Rs 199,499',
		badge: '20% Off',
		image: '/assets/Apple iPhone 15 Plus (Black, 128GB).jpeg',
	},
	{
		id: 2,
		name: 'Samsung Galaxy S24 Ultra',
		description: '12/512GB Flat Ti..',
		price: 'Rs 199,900',
		badge: 'New',
		image: '/assets/Samsung-s24-ultra.png',
	},
	{
		id: 3,
		name: 'Samsung Galaxy Z Flip 5',
		description: '8GB RAM | 256GB St..',
		price: 'Rs 139,900',
		image: '/assets/zflip.jpg',
	},
	{
		id: 4,
		name: 'Apple iPhone 16 Pro Max',
		description: '512GB With Exchange..',
		price: 'Rs 220,999',
		oldPrice: 'Rs 233,499',
		badge: '5%',
		image: '/assets/Iphone-16-pro-max-price-in-nepal.jpg',
	},
]

const MobilePhones2024 = () => {
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
			<div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
				{/* Promo Card */}
				<div className="w-full max-w-[300px] aspect-[9/16] relative bg-[#1E1B4B] rounded-2xl overflow-hidden">
					{/* Image Container */}
					<div className="h-[70%] relative">
						<Image
							src="/assets/nothing.jpg"
							alt="Nothing Phone 2A"
							width={400}
							height={400}
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 -rotate-[30deg] w-[120%] max-w-none"
							priority
						/>
					</div>
					{/* Text Container */}
					<div className="absolute bottom-0 left-0 right-0 bg-[#1E1B4B] p-6 text-white">
						<div className="space-y-2">
							<h3 className="font-mono text-2xl font-bold tracking-wider">
								Nothing
								<br />
								Phone 2A
							</h3>
							<p className="text-base">
								At just
								<br />
								<span className="text-xl font-bold">Rs.42,999/-</span>
							</p>
						</div>
						<button className="w-full bg-black text-white text-sm font-medium py-2.5 px-6 mt-4 rounded-full hover:bg-gray-900 transition">
							Buy Now
						</button>
					</div>
				</div>

				{/* Main Section */}
				<div className="flex-1">
					<div className="flex justify-between items-center mb-2">
						<h2 className="text-2xl font-bold text-gray-900">
							Mobile Phones Of 2024
						</h2>
						<button className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full hover:bg-blue-200">
							More Products
						</button>
					</div>
					<div className="h-1 bg-orange-500 w-32 mb-4"></div>

					{/* Product Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
						{phones.map((item) => (
							<div
								key={item.id}
								className="bg-white border rounded-xl p-3 relative shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col h-[400px]"
								onClick={() => handleClick(item.id)}
							>
								{item.badge && (
									<span
										className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-0.5 rounded ${
											item.badge.includes('%')
												? 'bg-green-500'
												: item.badge === 'New'
												? 'bg-blue-500'
												: 'bg-orange-500'
										}`}
									>
										{item.badge}
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
									<button
										onClick={(e) => handleAddToCart(e, item)}
										className="w-full bg-blue-600 text-white text-sm font-semibold px-2 py-1.5 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-2"
									>
										<FaCartPlus />
										Add to Cart
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Dots */}
					<div className="flex justify-center items-center gap-2 mt-4">
						{[0, 1, 2, 3, 4].map((_, i) => (
							<span
								key={i}
								className={`w-2 h-2 rounded-full ${
									i === 2 ? 'bg-blue-600' : 'bg-gray-300'
								}`}
							></span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MobilePhones2024