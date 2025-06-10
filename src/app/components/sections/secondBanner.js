import React from "react";
import Image from "next/image";
import Link from "next/link";
const SecondBanner = () => {
  const banners = [
    { id: 1, image: "/assets/mobile-below-banner-2.png", alt: "Banner 1" },
    { id: 2, image: "/assets/mobile-below-banner.png", alt: "Banner 2" },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-3 mx-3">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="flex-1 rounded-lg overflow-hidden shadow-lg relative">
          <Image
            src={banner.image}
            alt={banner.alt}
            className="object-cover w-full h-full"
            layout="responsive"
            width={450}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default SecondBanner;
