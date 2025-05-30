'use client'
import { MainLayout } from './components/layout'
import {
  Banner,
  NewArrivals,
  CategoryPanel,
  Popularcategories,
  NewOffers,
  LatestBlogs
} from './components/sections'
import {
  Laptops,
  MobilePhone,
  HomeAppliances,
  GamingAccessories2024
} from './components/features'
import { ProductsProvider } from './components/contexts/ProductsContext'
import { CartProvider } from './components/contexts/CartContext'
import { FavoritesProvider } from './components/contexts/FavoritesContext'
import { CategoriesProvider } from './components/contexts/Categories'

export default function Home() {
  return (
    <CategoriesProvider>
      <ProductsProvider>
        <CartProvider>
          <FavoritesProvider>
            <MainLayout>
              <Banner />
              <NewArrivals />
              <Popularcategories />
              <Laptops />
              <MobilePhone />
              <HomeAppliances />
              <LatestBlogs />
              <GamingAccessories2024 />
            </MainLayout>
          </FavoritesProvider>
        </CartProvider>
      </ProductsProvider>
    </CategoriesProvider>
  )
}
