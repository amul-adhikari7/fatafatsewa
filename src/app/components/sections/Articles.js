'use client'
import React from 'react'
import Image from 'next/image'

const articles = [
  {
    id: 1,
    title: 'Lorem Ipsum dolor sit',
    date: '11 March 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et ornare mi. Quisque lacinia, urna sed ultrices interdum, erat mi tristique lacus, sit amet suscipit libero.',
    image: '/assets/articles/article-1.jpg',
  },
  {
    id: 2,
    title: 'Lorem Ipsum dolor sit',
    date: '11 March 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et ornare mi. Quisque lacinia, urna sed ultrices interdum, erat mi tristique lacus, sit amet suscipit libero.',
    image: '/assets/articles/article-1.jpg',
  },
  {
    id: 3,
    title: 'Lorem Ipsum dolor sit',
    date: '11 March 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et ornare mi. Quisque lacinia, urna sed ultrices interdum, erat mi tristique lacus, sit amet suscipit libero.',
    image: '/assets/articles/article-1.jpg',
  },
  {
    id: 4,
    title: 'Lorem Ipsum dolor sit',
    date: '11 March 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et ornare mi. Quisque lacinia, urna sed ultrices interdum, erat mi tristique lacus, sit amet suscipit libero.',
    image: '/assets/articles/article-1.jpg',
  },
]

const ArticleSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <div className="flex items-center gap-4 my-6">
  <div className="flex-grow rounded-xl h-2 bg-blue-500" />
  <h2 className="text-2xl font-bold text-center whitespace-nowrap">Our Articles</h2>
  <div className="flex-grow rounded-xl h-2 bg-blue-500" />
</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-md font-bold text-black mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArticleSection
