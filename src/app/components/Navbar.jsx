"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiStar,
  FiMapPin,
  FiGlobe,
  FiHome,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const menuRef = useRef(null);

  // Fetch destinations
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch(
        "https://api.primevistajourney.com/api/destinations",
      );
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const domestic = destinations.filter((item) => item.type === "domestic");

  const international = destinations.filter(
    (item) => item.type === "international",
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/pvjlogo.png"
                alt="Primevista Journey"
                className="lg:w-56 sm:w-36 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                <FiStar className="text-white text-xs" />
              </div>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div
            ref={menuRef}
            className="hidden md:flex items-center gap-8 font-medium text-gray-700 relative"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <FiHome className="text-sm" />
              <span>Home</span>
            </Link>

            {/* Domestic */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "domestic" ? null : "domestic")
                }
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeMenu === "domestic"
                    ? "text-blue-600 bg-blue-50"
                    : "hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <FiMapPin className="text-sm" />
                <span>Domestic</span>
                <FiChevronDown
                  className={`text-sm transition-transform duration-300 ${
                    activeMenu === "domestic" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMenu === "domestic" && (
                <div className="absolute top-12 left-0 bg-white shadow-xl rounded-2xl w-72 py-3 border border-gray-200 z-50">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-transparent">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Explore India
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1 p-2">
                    {domestic.map((place) => (
                      <Link
                        key={place.id}
                        href={`/packages/${place.id}`}
                        onClick={() => setActiveMenu(null)}
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      >
                        {place.state}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* International */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "international" ? null : "international",
                  )
                }
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeMenu === "international"
                    ? "text-blue-600 bg-blue-50"
                    : "hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <FiGlobe className="text-sm" />
                <span>International</span>
                <FiChevronDown
                  className={`text-sm transition-transform duration-300 ${
                    activeMenu === "international" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMenu === "international" && (
                <div className="absolute top-12 left-0 bg-white shadow-xl rounded-2xl w-72 py-3 border border-gray-200 z-50">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-transparent">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Explore World
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1 p-2">
                    {international.map((place) => (
                      <Link
                        key={place.id}
                        href={`/packages/${place.id}`}
                        onClick={() => setActiveMenu(null)}
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      >
                        {place.state}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              <FiPhone className="text-sm" />
              <span>Contact</span>
            </Link>

            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <FiStar className="text-yellow-300" />
              Book Now
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-2xl text-gray-700"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-500 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b">
            <img src="/pvjlogo.png" alt="Primevista Journey" className="w-44" />

            <button onClick={() => setDrawerOpen(false)} className="text-2xl">
              <FiX />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
              >
                <FiHome />
                Home
              </Link>

              {/* Domestic */}
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 px-4 py-3 font-semibold">
                  <FiMapPin className="text-blue-600" />
                  Domestic Travel
                </div>

                <div className="grid grid-cols-2 gap-2 pl-8">
                  {domestic.map((place) => (
                    <Link
                      key={place.id}
                      href={`/packages/${place.id}`}
                      onClick={() => setDrawerOpen(false)}
                      className="px-3 py-2 text-sm hover:bg-blue-50 rounded-lg"
                    >
                      {place.state}
                    </Link>
                  ))}
                </div>
              </div>

              {/* International */}
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 px-4 py-3 font-semibold">
                  <FiGlobe className="text-blue-600" />
                  International Travel
                </div>

                <div className="grid grid-cols-2 gap-2 pl-8">
                  {international.map((place) => (
                    <Link
                      key={place.id}
                      href={`/packages/${place.id}`}
                      onClick={() => setDrawerOpen(false)}
                      className="px-3 py-2 text-sm hover:bg-blue-50 rounded-lg"
                    >
                      {place.state}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
              >
                <FiPhone />
                Contact
              </Link>

              <Link
                href="/about"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
              >
                <FiMail />
                About Us
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <FiStar className="text-yellow-300" />
              Book Your Journey
            </button>

            <p className="text-center text-xs text-gray-500 mt-3">
              ✈️ 500+ destinations • 24/7 support
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
