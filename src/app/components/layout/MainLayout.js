"use client";
import React from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const Navmenu = dynamic(() => import("./Navmenu"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

const MainLayout = ({ children }) => {
  return (
    <div className="overflow-x-hidden touch-action-manipulation">
      <div
        className="flex flex-col min-h-screen"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "none",
          touchAction: "pan-y pinch-zoom",
        }}>
        <Navbar />
        <Navmenu />
        <main className="flex-1 bg-gray-50">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
