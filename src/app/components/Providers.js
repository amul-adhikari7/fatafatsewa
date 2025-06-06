"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CartProvider>
    </Provider>
  );
}
