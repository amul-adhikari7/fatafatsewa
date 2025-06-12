"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { MainLayout } from "./components/layout";
import { CartProvider } from "./components/contexts/CartContext";
import { FavoritesProvider } from "./components/contexts/FavoritesContext";

// Critical components loaded immediately
import Banner from "./components/sections/Banner";
import NewArrivals from "./components/sections/NewArrivals";

// Dynamic imports for non-critical components
const CategoryPanel = dynamic(
  () => import("./components/sections/CategoryPanel"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const NewOffers = dynamic(() => import("./components/sections/NewOffers"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] animate-pulse bg-gray-100 rounded-lg" />
  ),
});

const LatestBlogs = dynamic(() => import("./components/sections/LatestBlogs"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
  ),
});

const SecondBanner = dynamic(
  () => import("./components/sections/secondBanner"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const Gadgets = dynamic(
  () => import("./components/features/products/Gadgets"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const Laptops = dynamic(
  () => import("./components/features/products/Laptops"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const MobilePhone = dynamic(
  () => import("./components/features/products/MobilePhone"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const GamingAccessories2024 = dynamic(
  () => import("./components/features/products/GamingAccessories2024"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

const HomeAppliances = dynamic(
  () => import("./components/features/products/HomeAppliances"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    ),
  }
);

export default function Home() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <MainLayout>
          {/* Critical above-the-fold content */}
          <Banner />
          <NewArrivals />

          {/* Dynamically loaded content */}
          <Suspense
            fallback={
              <div className="h-[200px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <SecondBanner />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <Gadgets />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <Laptops />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[300px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <NewOffers />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <MobilePhone />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[200px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <SecondBanner />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <GamingAccessories2024 />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <HomeAppliances />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
            }>
            <LatestBlogs />
          </Suspense>
        </MainLayout>
      </FavoritesProvider>
    </CartProvider>
  );
}
