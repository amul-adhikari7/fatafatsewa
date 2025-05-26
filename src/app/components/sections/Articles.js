import React from 'react'

const Articles = () => {
  // Placeholder data for articles
  const articles = [
    {
      id: 1,
      title: 'Lorem Ipsum dolor sit',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
      image: '/article-placeholder.png'
    },
    {
      id: 2,
      title: 'Lorem Ipsum dolor sit',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
      image: '/article-placeholder.png'
    },
    {
      id: 3,
      title: 'Lorem Ipsum dolor sit',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
      image: '/article-placeholder.png'
    },
    {
      id: 4,
      title: 'Lorem Ipsum dolor sit',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
      image: '/article-placeholder.png'
    }
  ]

  return (
    <section className='w-full max-w-7xl mx-auto px-2 md:px-6 mt-10 mb-16'>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2'>Our Articles</h2>
        <div className='w-full h-1 bg-gradient-to-r from-blue-500 via-white to-orange-500 mb-8 mt-1 rounded-full max-w-lg' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {articles.map(article => (
          <div
            key={article.id}
            className='bg-white rounded-xl shadow-md overflow-hidden flex flex-col'
          >
            <div className='h-36 md:h-40 w-full bg-gray-100 flex items-center justify-center'>
              <img
                src={article.image}
                alt={article.title}
                className='object-contain h-28 md:h-32'
                style={{ filter: 'grayscale(1)' }}
              />
            </div>
            <div className='p-4 flex-1 flex flex-col'>
              <h3 className='font-semibold text-base md:text-lg mb-2'>
                {article.title}
              </h3>
              <p className='text-gray-500 text-xs md:text-sm flex-1'>
                {article.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-6'>
        <div className='flex space-x-2'>
          <span className='w-2 h-2 bg-blue-500 rounded-full' />
          <span className='w-2 h-2 bg-gray-300 rounded-full' />
          <span className='w-2 h-2 bg-gray-300 rounded-full' />
        </div>
      </div>
    </section>
  )
}

export default Articles
