"use client";

import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiHeart,
  FiStar,
} from "react-icons/fi";

export default function FooterFull() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* International Packages */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b-2 border-blue-500/50 pb-2 inline-block">
              International
            </h4>
            <ul className="space-y-2.5">
              {[
                "Bali",
                "Dubai",
                "Maldives",
                "Singapore",
                "Thailand",
                "Vietnam",
                "Baku",
                "Almaty",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domestic Packages */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b-2 border-blue-500/50 pb-2 inline-block">
              Domestic
            </h4>
            <ul className="space-y-2.5">
              {[
                "Andaman",
                "Himachal",
                "Kashmir",
                "Kerala",
                "Ladakh",
                "North East",
                "Rajasthan",
                "Uttarakhand",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Honeymoon Packages */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b-2 border-blue-500/50 pb-2 inline-block">
              <span className="flex items-center gap-1">
                Honeymoon <FiHeart className="text-pink-400 text-xs" />
              </span>
            </h4>
            <ul className="space-y-2.5">
              {[
                "Singapore",
                "Baku",
                "Thailand",
                "Vietnam",
                "Himachal",
                "Kashmir",
                "Kerala",
                "North East",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour By Interest */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b-2 border-blue-500/50 pb-2 inline-block">
              By Interest
            </h4>
            <ul className="space-y-2.5">
              {[
                "Adventure",
                "Beach",
                "Cruise",
                "Family",
                "Luxury",
                "Wildlife",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b-2 border-blue-500/50 pb-2 inline-block">
              Company
            </h4>
            <ul className="space-y-2.5">
              {["About Us", "Contact Us", "Blogs", "Careers", "FAQ's"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Policies */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b-2 border-blue-500/50 pb-2 inline-block">
              Policies
            </h4>
            <ul className="space-y-2.5">
              {[
                "Terms & Conditions",
                "Privacy Policies",
                "Fraud Alert",
                "Secure Payment",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand Section - Primevista Journey */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Brand Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <FiStar className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Primevista Journey
                  </h3>
                  <p className="text-xs text-gray-400">
                    Travel Beyond Horizons
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                Crafting personalized travel experiences that reflect who you
                are and how you want to explore the world.
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FiMapPin className="text-blue-400 flex-shrink-0" />
                  <span>New Delhi, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FiPhone className="text-blue-400 flex-shrink-0" />
                  <span>+91 81784 20122</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FiMail className="text-blue-400 flex-shrink-0" />
                  <span>info@primevistajourney.com</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Get travel inspiration, exclusive offers, and updates straight
                to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Connect With Us
              </h4>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FiFacebook />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FiTwitter />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FiInstagram />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FiYoutube />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <FiLinkedin />
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-xs text-gray-400 mb-3">We Accept</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-gray-800 rounded-md text-xs text-gray-300">
                    Visa
                  </span>
                  <span className="px-3 py-1.5 bg-gray-800 rounded-md text-xs text-gray-300">
                    Mastercard
                  </span>
                  <span className="px-3 py-1.5 bg-gray-800 rounded-md text-xs text-gray-300">
                    UPI
                  </span>
                  <span className="px-3 py-1.5 bg-gray-800 rounded-md text-xs text-gray-300">
                    PayPal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear}{" "}
            <span className="text-white font-medium">Primevista Journey</span>.
            All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Brand Tagline */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
            Designed with <FiHeart className="text-pink-500" /> for travelers
            around the world
          </p>
        </div>
      </div>
    </footer>
  );
}
