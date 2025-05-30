'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaClock, FaUser, FaArrowRight } from 'react-icons/fa'

// Sample blog data
const blogs = [
  {
    id: 1,
    title: 'Latest iPhone Features You Need to Know',
    excerpt: 'Discover the cutting-edge features of the newest iPhone models and how they can enhance your daily life.',
    featured_image: '/assets/Apple iPhone 15 Plus (Black, 128GB).jpeg',
    author: { name: 'Tech Team' },
    created_at: '2024-05-28',
    category: 'Smartphones'
  },
  {
    id: 2,
    title: 'Gaming Laptops Buying Guide 2024',
    excerpt: 'Everything you need to know about choosing the perfect gaming laptop for your needs and budget.',
    featured_image: '/assets/Acer-Nitro-V-2023-I7-1260P-RTX-3050.jpg',
    author: { name: 'Gaming Expert' },
    created_at: '2024-05-27',
    category: 'Gaming'
  },
  {
    id: 3,
    title: 'Smart Home Appliances That Save Time',
    excerpt: 'Explore the latest smart home appliances that can make your life easier and more efficient.',
    featured_image: '/assets/fridge.jpg',
    author: { name: 'Home Tech' },
    created_at: '2024-05-26',
    category: 'Appliances'
  }
]

const LatestBlogs = () => {
  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Latest Articles
          </h2>
          <Link href="/blogs" className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full hover:bg-blue-200">
            More Articles
          </Link>
        </div>
        <div className="h-1 bg-orange-500 w-32 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (            <Link
              href={`/blogs/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={blog.id}
              className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.featured_image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaUser className="w-4 h-4" />
                    <span>{blog.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestBlogs
