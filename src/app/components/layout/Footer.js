import React from 'react'
import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter
} from 'react-icons/fa'

const banks = [
  { src: '/assets/globalime.svg', alt: 'Global IME Bank' },
  { src: '/assets/nmb.svg', alt: 'NMB Bank' },
  { src: '/assets/nabil.svg', alt: 'Nabil Bank' },
  { src: '/assets/siddhartha.svg', alt: 'Siddhartha Bank' }
]

const Footer = () => (
  <footer className='bg-gradient-to-b from-[#FFF6ED] to-white pt-2 pb-8 border-t border-orange-100'>
    {/* Top bar with locations */}
    <div className='flex flex-wrap justify-center gap-8 py-3 border-b border-orange-200 text-[13px] text-black bg-gradient-to-r from-[#FFD9B3] to-[#FFF6ED]'>
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className='flex items-center gap-3 bg-white/70 rounded-xl shadow-sm px-5 py-2 border border-orange-100 hover:shadow-lg transition-all duration-200 min-w-[260px] max-w-xs'
        >
          <span className='flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-xl shadow'>
            <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
              <path
                d='M12 21s-6-5.686-6-10A6 6 0 0112 3a6 6 0 016 6c0 4.314-6 10-6 10z'
                stroke='#ef4444'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='#fff0f0'
              />
            </svg>
          </span>
          <div className='flex flex-col'>
            <span className='font-poppins font-semibold text-[16px] text-gray-900 mb-1 tracking-wide leading-tight'>
              Sitapaila - 15, Kathmandu
            </span>
            <span className='font-dm-sans text-[13px] text-gray-600 mb-1 tracking-wider'>
              01-010101, 9801010101
            </span>
            <span className='font-poppins text-[13px] text-blue-600 font-medium hover:text-blue-700 transition-colors'>
              info@fatafatsewa.com
            </span>
          </div>
        </div>
      ))}
    </div>
    {/* Main footer content */}
    <div className='max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row md:justify-between gap-10 bg-white rounded-b-3xl shadow-lg mt-2'>
      {/* Logo and social */}
      <div className='flex flex-col items-center md:items-start gap-3 md:w-1/4'>
        <Image
          src='/assets/logo.svg'
          alt='Fatafat Sewa'
          width={180}
          height={60}
          className='mb-2 drop-shadow-lg'
        />
        <div className='text-xs text-gray-700 mb-2 text-center md:text-left'>
          नेपालको अग्रणी अनलाइन सपिङ प्लेटफर्म
          <br />
          Making Quality Products Accessible To All
        </div>
        <div className='font-semibold text-xs mb-1 text-gray-700'>
          Do Follow Us
        </div>
        <div className='flex gap-3 text-xl'>
          <a
            href='#'
            className='bg-[#4267B2] text-white p-2 rounded-full shadow hover:scale-110 transition'
          >
            <FaFacebookF />
          </a>
          <a
            href='#'
            className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white p-2 rounded-full shadow hover:scale-110 transition'
          >
            <FaInstagram />
          </a>
          <a
            href='#'
            className='bg-[#E60023] text-white p-2 rounded-full shadow hover:scale-110 transition'
          >
            <FaPinterestP />
          </a>
          <a
            href='#'
            className='bg-[#1DA1F2] text-white p-2 rounded-full shadow hover:scale-110 transition'
          >
            <FaTwitter />
          </a>
        </div>
      </div>
      {/* Info links */}
      <div className='flex-1 flex flex-col md:flex-row justify-center gap-12 md:gap-20'>
        <div>
          <div className='font-bold text-black mb-3 text-lg tracking-wide'>
            Information
          </div>
          <ul className='text-sm text-gray-700 space-y-2'>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              About Us
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Term and Conditions
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Privacy Policy
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Return and Refund Policy
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Cookie Policy
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Exchange Policy
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              EMI Policy
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Partnered Institute
            </li>
          </ul>
        </div>
        <div>
          <div className='font-bold text-black mb-3 text-lg tracking-wide'>
            Quick Links
          </div>
          <ul className='text-sm text-gray-700 space-y-2'>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Work With Us
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Internship Program
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Apply For a Franchise
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Payment Partner
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              Help and Contact
            </li>
            <li className='hover:text-blue-600 transition cursor-pointer'>
              List Your Product
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* Bank logos */}
    <div className='max-w-7xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <h3 className='text-lg font-bold text-gray-800 mb-2 pt-14'>
          Our Banking Partners
        </h3>
        <div className='h-1 w-40 bg-gradient-to-r from-orange-400 to-blue-400 mx-auto rounded-full'></div>
      </div>
      <div className='flex flex-wrap justify-center items-center gap-x-12 gap-y-8 py-8 bg-white/80 rounded-2xl shadow-sm border border-gray-100'>
        {banks.map(bank => (
          <div
            key={bank.alt}
            className='group relative flex items-center h-16 transition-transform duration-300 hover:scale-105'
          >
            <div className='absolute inset-0 bg-blue-50/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10'></div>
            <Image
              src={bank.src}
              alt={bank.alt}
              height={48}
              width={160}
              className='object-contain h-12 w-auto filter hover:brightness-110 transition duration-300'
            />
          </div>
        ))}
      </div>
    </div>
    <div className='text-center text-xs text-gray-400 mt-8'>
      &copy; {new Date().getFullYear()} Fatafat Sewa. All rights reserved.
    </div>
  </footer>
)

export default Footer
