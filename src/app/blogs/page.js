'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaClock, FaUser } from 'react-icons/fa'

// Sample blog data since API is not accessible
const sampleBlogs = [
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

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Using sample data instead of API call for now
    setBlogs(sampleBlogs)
    setLoading(false)
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }

        const data = await response.json()
        setBlogs(data.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h1>
          <p className="text-lg text-gray-600">Stay updated with our latest news and product insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id}>
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.featured_image || '/assets/placeholder.jpg'}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-blue-600 font-medium">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                    {blog.category && (
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {blog.excerpt || blog.content.substring(0, 150)}...
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    {blog.author && (
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {blog.author.avatar ? (
                            <Image
                              src={blog.author.avatar}
                              alt={blog.author.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-600">
                              {blog.author.name?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {blog.author.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogsPage
