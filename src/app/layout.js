import { Poppins, DM_Sans } from 'next/font/google'
import './globals.css'
import { ProductsProvider } from './components/contexts/ProductsContext'
import { CartProvider } from './components/contexts/CartContext'
import { FavoritesProvider } from './components/contexts/FavoritesContext'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

export const metadata = {
  title: 'Fatafat Sewa',
  description: 'Nepals Leading Online Shopping Platform'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className={`${poppins.variable} ${dmSans.variable}`}>
      <body className={poppins.className}>
        <ProductsProvider>
          <CartProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
