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
    <footer className="text-gray-600 bg-white border-t border-gray-100">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            {" "}
            <Image
              src="/assets/logo.svg"
              alt="Fatafat Logo"
              width={120}
              height={40}
              style={{ width: "auto", height: "40px" }}
              className="brightness-100"
            />
            <p className="text-sm">
              Your one-stop shop for all electronic needs. Quality products,
              competitive prices, and excellent customer service.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-500">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-blue-400">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-pink-500">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-red-500">
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-blue-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-blue-500">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-blue-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="flex-shrink-0 w-5 h-5 mt-1 text-blue-500" />
                <p>Sitapaila Road-4, Kathmandu, Nepal</p>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="flex-shrink-0 w-5 h-5 text-blue-500" />
                <a
                  href="tel:+977-982-875-7575"
                  className="transition-colors hover:text-blue-500">
                  +977-982-875-7575
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="flex-shrink-0 w-5 h-5 text-blue-500" />
                <a
                  href="mailto:info@fatafatsewa.com"
                  className="transition-colors hover:text-blue-500">
                  info@fatafatsewa.com
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Partners */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800">
              Payment Partners
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {paymentPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="p-2 transition-colors bg-white border border-gray-200 rounded-lg hover:border-blue-200">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={40}
                    className="object-contain w-full h-8"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="py-4 border-t border-gray-100">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Fatafat Sewa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
