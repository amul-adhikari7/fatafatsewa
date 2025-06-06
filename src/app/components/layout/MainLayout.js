"use client";
import React from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const Navmenu = dynamic(() => import("./Navmenu"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Navmenu />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
