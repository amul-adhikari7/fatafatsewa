'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaCalendar, FaUser, FaTag } from 'react-icons/fa'

const BlogPost = ({ params }) => {
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://fatafatsewa.com/api/v1/blogs/${params.slug}`, {
          headers: {
            'Authorization': 'Bearer pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I'
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog post')
        }

        const data = await response.json()
        setBlog(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchBlog()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error || 'Blog post not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={blog.featured_image || '/assets/placeholder.jpg'}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <FaCalendar />
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
              {blog.author && (
                <span className="flex items-center gap-2">
                  <FaUser />
                  {blog.author.name}
                </span>
              )}
              {blog.category && (
                <span className="flex items-center gap-2">
                  <FaTag />
                  {blog.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/blogs" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <FaArrowLeft /> Back to Articles
        </Link>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-bold mb-4">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default BlogPost
