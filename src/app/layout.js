import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxProvider from "./ReduxProvider";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>

          <SocialFloat />
        </ReduxProvider>
      </body>
    </html>
  );
}