"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser, FaClock, FaChevronRight } from "react-icons/fa";

// Sample data for web stories
const webStories = [
  {
    id: 1,
    title: "Best Laptops of 2024",
    image: "/laptop-story.jpg",
    date: "June 10, 2024",
    duration: "5 min",
  },
  {
    id: 2,
    title: "Top Smartphones Under $500",
    image: "/smartphone-story.jpg",
    date: "June 8, 2024",
    duration: "3 min",
  },
  {
    id: 3,
    title: "Gaming Accessories Guide",
    image: "/gaming-story.jpg",
    date: "June 5, 2024",
    duration: "4 min",
  },
  {
    id: 4,
    title: "Smart Home Setup Tips",
    image: "/smarthome-story.jpg",
    date: "June 2, 2024",
    duration: "6 min",
  },
  {
    id: 5,
    title: "Budget Tech Finds",
    image: "/budget-tech-story.jpg",
    date: "May 30, 2024",
    duration: "4 min",
  },
];

// Sample data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Laptop for Your Needs",
    excerpt: "Confused about which laptop to buy? We break down the key factors to consider when making your decision...",
    image: "/laptop-guide.jpg",
    category: "Buying Guide",
    author: "Tech Expert",
    date: "June 12, 2024",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "The Future of Smartphone Technology in 2024",
    excerpt: "From foldable screens to AI-powered cameras, discover the cutting-edge features coming to smartphones this year...",
    image: "/smartphone-future.jpg",
    category: "Tech Trends",
    author: "Mobile Analyst",
    date: "June 9, 2024",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Best Budget Gaming Setups Under $1000",
    excerpt: "You don't need to break the bank for a great gaming experience. Here's how to build a complete gaming setup on a budget...",
    image: "/budget-gaming.jpg",
    category: "Gaming",
    author: "Gaming Guru",
    date: "June 7, 2024",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "How to Extend Your Device's Battery Life",
    excerpt: "Simple tips and tricks to make your smartphone, laptop, and tablet batteries last significantly longer...",
    image: "/battery-tips.jpg",
    category: "Tips & Tricks",
    author: "Tech Advisor",
    date: "June 5, 2024",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "The Best Smart Home Devices of 2024",
    excerpt: "Transform your home with these innovative smart devices that offer convenience, security, and energy efficiency...",
    image: "/smart-home.jpg",
    category: "Smart Home",
    author: "IoT Specialist",
    date: "June 3, 2024",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Understanding EMI Options for Electronics Purchases",
    excerpt: "Everything you need to know about EMI plans when buying electronics, including hidden costs and best practices...",
    image: "/emi-guide.jpg",
    category: "Finance",
    author: "Finance Expert",
    date: "June 1, 2024",
    readTime: "9 min read",
  },
];

export default function BlogsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest tech trends, buying guides, and expert tips to help you make informed decisions.
          </p>
        </div>

        {/* Web Stories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Web Stories</h2>
            <Link href="/webstories" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
              View All <FaChevronRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {webStories.map((story) => (
              <div key={story.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white group">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  {/* Use a placeholder image if you don't have actual images */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Story Image</span>
                  </div>
                  {/* If you have actual images, uncomment and use this:
                  <Image 
                    src={story.image} 
                    alt={story.title} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  /> */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded-full z-20">
                    {story.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">{story.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Latest Articles</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Most Recent
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Popular
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {/* Use a placeholder div if you don't have actual images */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Blog Image</span>
                  </div>
                  {/* If you have actual images, uncomment and use this:
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  /> */}
                  <div className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-medium py-1 px-2 rounded-lg">
                    {post.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaUser className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-1">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}