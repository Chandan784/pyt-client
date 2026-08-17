import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import LayoutWrapper from "./components/LayoutWrapper";
import SocialFloat from "./components/SocialFloat";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.primevistajourney.com"),

  title: {
    default: "Prime Vista Journey | Explore India & International Tour Packages",
    template: "%s | Prime Vista Journey",
  },

  description:
    "Prime Vista Journey offers premium domestic and international tour packages including Andaman, Himachal, Kerala, Dubai, Bali and more.",

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <SocialFloat/>
      </body>
    </html>
  );
}
