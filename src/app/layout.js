import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import FooterFull from "./components/FooterFull";

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
    default:
      "Prime Vista Journey | Explore India & International Tour Packages",
    template: "%s | Prime Vista Journey",
  },
  description:
    "Prime Vista Journey offers premium domestic and international tour packages including Andaman, Himachal, Kerala, Dubai, Bali and more. Book your dream vacation today.",
  keywords: [
    "Prime Vista Journey",
    "Tour Packages India",
    "International Tour Packages",
    "Andaman Tour Package",
    "Himachal Tour",
    "Kerala Holiday",
    "Travel Agency India",
    "Holiday Packages",
  ],
  authors: [{ name: "Prime Vista Journey" }],
  creator: "Prime Vista Journey",
  publisher: "Prime Vista Journey",

  openGraph: {
    title: "Prime Vista Journey | Explore Dream Destinations",
    description:
      "Discover hand-crafted travel experiences across India and abroad. Beaches, mountains, adventure & luxury — all in one place.",
    url: "https://www.primevistajourney.com",
    siteName: "Prime Vista Journey",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prime Vista Journey Travel Packages",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prime Vista Journey | Premium Travel Experiences",
    description:
      "Book curated travel packages for Andaman, Himachal, Kerala, Bali, Dubai & more.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/pvjlogo.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <FooterFull />
      </body>
    </html>
  );
}
