"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser } from "react-icons/fa";

const ITEMS_PER_PAGE = 4;

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, setContainerRef] = useState(null);

  // Track scroll position for active dot
  const handleScroll = () => {
    if (containerRef) {
      const scrollLeft = containerRef.scrollLeft;
      const itemWidth = 280 + 16; // card width + gap
      const newPage = Math.round(scrollLeft / itemWidth);
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const container = containerRef;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef, handleScroll]);

  // Scroll to page
  const goToPage = (pageNumber) => {
    if (containerRef) {
      const itemWidth = 280 + 16; // card width + gap
      containerRef.scrollTo({
        left: pageNumber * itemWidth,
        behavior: "smooth",
      });
      setCurrentPage(pageNumber);
    }
  };

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
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

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

        {/* Blog Cards - Horizontal scroll on mobile */}
        <div className="relative">
          <div
            ref={setContainerRef}
            className="overflow-x-auto overscroll-x-contain hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {visibleBlogs.map((blog, index) => (
                <Link
                  href={`/blogs/${
                    blog.slug || blog.title?.toLowerCase().replace(/\s+/g, "-")
                  }`}
                  key={blog.id}
                  className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-[280px] sm:w-auto snap-start">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.featured_image || "/assets/placeholder.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
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
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" />
                        {blog.author || "Admin"}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination dots - Mobile only */}
          <div className="flex justify-center gap-2 mt-4 sm:hidden">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i
                    ? "bg-orange-500 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogs;

/* Custom scrollbar styles */
<style jsx global>{`
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>;
