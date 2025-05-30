import React from 'react';
import Image from 'next/image';

const phones = [
  {
    id: 1,
    name: 'Apple iPhone 15 Plus',
    description: '256GB With Exchange..',
    price: 'Rs 173,000',
    oldPrice: 'Rs 199,499',
    badge: '20% Off',
    image: '/iphone15.jpg',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    description: '12/512GB Flat Ti..',
    price: 'Rs 199,900',
    badge: 'New',
    image: '/galaxy-s24.jpg',
  },
  {
    id: 3,
    name: 'Samsung Galaxy Z Flip 5',
    description: '8GB RAM | 256GB St..',
    price: 'Rs 139,900',
    image: '/galaxy-zflip.jpg',
  },
  {
    id: 4,
    name: 'Apple iPhone 15 Plus',
    description: '512GB With Exchange..',
    price: 'Rs 220,999',
    oldPrice: 'Rs 233,499',
    badge: '5%',
    image: '/iphone15plus.jpg',
  },
];

const MobilePhones2024 = () => {
  return (
    <div className="bg-white py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Promo Card */}
        <div className="bg-gradient-to-br from-[#3b1d8a] to-[#5753c9] rounded-xl p-6 text-white flex flex-col justify-between w-full max-w-xs">
          <div>
            <Image src="/nothing-phone.png" alt="Nothing Phone 2A" width={180} height={180} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold leading-tight text-center">Nothing<br />Phone 2A</h3>
            <p className="text-center mt-2 text-sm">At just<br />42,999/-</p>
          </div>
          <button className="bg-black text-white text-sm py-2 mt-4 rounded-full hover:bg-gray-800 transition w-full">
            Buy Now
          </button>
        </div>

        {/* Main Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Mobile Phones Of 2024</h2>
            <button className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full hover:bg-blue-200">More Products</button>
          </div>
          <div className="h-1 bg-orange-500 w-32 mb-4"></div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {phones.map((phone) => (
              <div key={phone.id} className="bg-white border rounded-xl p-3 relative shadow-sm hover:shadow-md">
                {phone.badge && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    {phone.badge}
                  </span>
                )}
                <Image src={phone.image} alt={phone.name} width={200} height={200} className="mx-auto object-contain" />
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{phone.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{phone.description}</p>
                  {phone.oldPrice && (
                    <p className="text-xs text-gray-400 line-through mt-1">{phone.oldPrice}</p>
                  )}
                  <p className="text-blue-600 font-semibold text-base">{phone.price}</p>
                  <div className="flex gap-2 mt-2 text-xs text-gray-600">
                    <span className="border border-gray-300 px-2 py-0.5 rounded-full">EMI</span>
                    <span className="border border-gray-300 px-2 py-0.5 rounded-full">Fatafat Delivery</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {[0, 1, 2, 3, 4].map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePhones2024;