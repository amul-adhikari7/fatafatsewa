"use client";
import { MainLayout } from "./components/layout";
import {
  Banner,
  NewArrivals,
  CategoryPanel,
  NewOffers,
  LatestBlogs,
} from "./components/sections";
import {
  Laptops,
  MobilePhone,
  HomeAppliances,
  GamingAccessories2024,
} from "./components/features";
import { CartProvider } from "./components/contexts/CartContext";
import { FavoritesProvider } from "./components/contexts/FavoritesContext";
import SecondBanner from "./components/sections/secondBanner";
import Gadgets from "./components/features/products/Gadgets";
export default function Home() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <MainLayout>
          <Banner />
          <NewArrivals />
          <SecondBanner />
          <Gadgets />
          <Laptops />
          <NewOffers />
          <MobilePhone />
          <SecondBanner />

          <GamingAccessories2024 />
          <HomeAppliances />
          <LatestBlogs />
        </MainLayout>
      </FavoritesProvider>
    </CartProvider>
  );
}
