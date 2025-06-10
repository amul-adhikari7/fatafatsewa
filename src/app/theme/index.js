"use client";

import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#e6f6ff",
      100: "#b3e0ff",
      200: "#80caff",
      300: "#4db3ff",
      400: "#1a9dff",
      500: "#0080e6",
      600: "#0066b3",
      700: "#004d80",
      800: "#00334d",
      900: "#001a26",
    },
  },
  fonts: {
    heading: "var(--font-poppins)",
    body: "var(--font-dm-sans)",
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
    FormLabel: {
      baseStyle: {
        fontWeight: "medium",
      },
    },
  },
});

export default theme;
