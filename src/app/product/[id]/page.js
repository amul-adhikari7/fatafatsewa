'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useParams } from 'next/navigation'
import { useCart } from '@/app/components/contexts/CartContext'
import { useFavorites } from '@/app/components/contexts/FavoritesContext'
import { useProducts } from '@/app/components/contexts/ProductsContext'
import { MainLayout } from '@/app/components/layout'

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { mobiles, laptops, homeAppliances, loading } = useProducts()

  // Find product across all sections
  const product = React.useMemo(() => {
    const allProducts = [...mobiles, ...laptops, ...homeAppliances]
    return allProducts.find(p => p.id === parseInt(id)) || null
  }, [id, mobiles, laptops, homeAppliances])

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    )
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500">Product not found</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">{product.category || 'Products'}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
                {product.tag && (
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                    product.tag === 'Out Of Stock'
                      ? 'bg-red-100 text-red-600'
                      : product.tag === 'New'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {product.tag}
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {[product.image, product.image, product.image, product.image].map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg border hover:border-blue-500 cursor-pointer overflow-hidden">
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.description || 'No description available'}</p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  Rs {product.price.toLocaleString()}
                </div>
                {product.oldPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through text-lg">
                      Rs {product.oldPrice.toLocaleString()}
                    </span>
                    <span className="text-green-600 font-medium">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% Off
                    </span>
                  </div>
                )}
              </div>

              {/* EMI Options */}
              <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-blue-900">EMI Options Available</h3>
                <p className="text-blue-700 text-2xl font-bold">Rs {Math.ceil(product.price / 12).toLocaleString()} /month</p>
                <p className="text-sm text-blue-600">Based on 12 months EMI</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold shadow-lg shadow-blue-100"
                >
                  <FaShoppingCart className="text-xl" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-4 rounded-xl border shadow-lg ${
                    isFavorite(product.id)
                      ? 'bg-pink-50 text-pink-600 border-pink-200 shadow-pink-100'
                      : 'bg-gray-50 text-gray-600 border-gray-200 shadow-gray-100'
                  }`}
                >
                  {isFavorite(product.id) ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                </button>
              </div>

              {/* Key Features */}
              <div className="border-t pt-6 mt-8">
                <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 6.8&quot; Dynamic AMOLED 2X Display</li>
                  <li>• 200MP Wide Camera</li>
                  <li>• 12GB RAM + 256GB Storage</li>
                  <li>• 5000mAh Battery</li>
                  <li>• S Pen Included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Experience the power of AI with the Samsung Galaxy S24 Ultra. 
              Featuring a stunning 6.8-inch QHD+ Dynamic AMOLED 2X display with 
              adaptive 120Hz refresh rate, this flagship device delivers exceptional 
              visuals and smooth performance. The advanced quad camera system with 
              a 200MP main sensor captures incredible details in any lighting condition.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
