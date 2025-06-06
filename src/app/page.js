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
export default function Home() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <MainLayout>
          <Banner />
          <NewArrivals />
          <CategoryPanel />
          <Laptops />
          <MobilePhone />
          <NewOffers />
          <HomeAppliances />
          <GamingAccessories2024 />
          <LatestBlogs />
        </MainLayout>
      </FavoritesProvider>
    </CartProvider>
  );
}
