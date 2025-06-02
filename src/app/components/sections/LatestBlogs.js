"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser } from "react-icons/fa";
// import DOMPurify from "dompurify"; // Uncomment if needed for sanitizing HTML

const ITEMS_PER_PAGE = 4;

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://fatafatsewa.com/api/v1/blogs", {
          headers: {
            "API-key": "pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const visibleBlogs = blogs.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <Link
            href="/blogs"
            className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full hover:bg-blue-200">
            More Articles
          </Link>
        </div>
        <div className="h-1 bg-orange-500 w-32 mb-6"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleBlogs.map((blog) => (
            <Link
              href={`/blogs/${
                blog.slug || blog.title?.toLowerCase().replace(/\s+/g, "-")
              }`}
              key={blog.id}
              className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.featured_image || "/assets/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {blog.category && (
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <div
                  className="text-gray-600 text-sm line-clamp-2 mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.excerpt ||
                      blog.content?.slice(0, 300) + "..." ||
                      "No description available.",
                  }}
                  // To sanitize HTML, you can enable this instead:
                  // dangerouslySetInnerHTML={{
                  //   __html: DOMPurify.sanitize(blog.excerpt || blog.content?.slice(0, 300) + "..."),
                  // }}
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaUser className="w-4 h-4" />
                    <span>{blog.author?.name || blog.author || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full ${
                page === i ? "bg-blue-600" : "bg-gray-300"
              } transition-colors`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogs;
