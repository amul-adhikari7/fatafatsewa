"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const paymentPartners = [
    { name: "Global IME", logo: "/assets/globalime.svg" },
    { name: "Nabil Bank", logo: "/assets/nabil.svg" },
    { name: "NMB Bank", logo: "/assets/nmb.svg" },
    { name: "Siddhartha Bank", logo: "/assets/siddhartha.svg" },
  ];

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/assets/logo.svg"
              alt="Fatafat Logo"
              width={120}
              height={40}
              className="brightness-100" // Removed invert class since background is white
            />
            <p className="text-sm">
              Your one-stop shop for all electronic needs. Quality products,
              competitive prices, and excellent customer service.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <p>Sitapaila Road-4, Kathmandu, Nepal</p>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a
                  href="tel:+977-982-875-7575"
                  className="hover:text-blue-500 transition-colors">
                  +977-982-875-7575
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a
                  href="mailto:info@fatafatsewa.com"
                  className="hover:text-blue-500 transition-colors">
                  info@fatafatsewa.com
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Partners */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Payment Partners
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {paymentPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white p-2 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={40}
                    className="w-full h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-100 py-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Fatafat Sewa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
