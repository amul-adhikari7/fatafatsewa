"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme} resetCSS={false}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>{children}</FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}
