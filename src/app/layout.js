import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Fatafat Sewa",
  description: "Nepals Leading Online Shopping Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${dmSans.variable}`}
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <body className="chakra-ui-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
