"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const domestic = [
    "Goa",
    "Kashmir",
    "Kerala",
    "Rajasthan",
    "Himachal",
    "Andaman",
  ];

  const international = [
    "Thailand",
    "Dubai",
    "Singapore",
    "Bali",
    "Maldives",
    "Europe",
  ];

  // Close dropdown when clicking outside (desktop)
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
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/pyt-logo.jpg"
              alt="Plan Your Trip"
              className="w-11 h-11 rounded-full object-cover shadow"
            />
            <span className="text-sm md:text-xl font-semibold text-gray-800">
              PrimeVistaJourney
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div
            ref={menuRef}
            className="hidden md:flex items-center gap-10 font-medium text-gray-700 relative"
          >
            <Link href="/" className="hover:text-[var(--theme)] transition">
              Home
            </Link>

            {/* Domestic */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "domestic" ? null : "domestic")
                }
                className="hover:text-[var(--theme)] transition"
              >
                Domestic ▾
              </button>

              {activeMenu === "domestic" && (
                <div className="absolute top-12 left-0 bg-white shadow-2xl rounded-2xl w-60 py-4 border z-50">
                  {domestic.map((place) => (
                    <Link
                      key={place}
                      href={`/domestic/${place.toLowerCase()}`}
                      onClick={() => setActiveMenu(null)}
                      className="block px-6 py-2 hover:bg-gray-100"
                    >
                      {place}
                    </Link>
                  ))}
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
                className="hover:text-[var(--theme)] transition"
              >
                International ▾
              </button>

              {activeMenu === "international" && (
                <div className="absolute top-12 left-0 bg-white shadow-2xl rounded-2xl w-60 py-4 border z-50">
                  {international.map((place) => (
                    <Link
                      key={place}
                      href={`/international/${place.toLowerCase()}`}
                      onClick={() => setActiveMenu(null)}
                      className="block px-6 py-2 hover:bg-gray-100"
                    >
                      {place}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button className="bg-[var(--theme)] text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition">
              Book Now
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-3xl text-gray-700"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* MOBILE DRAWER */}
      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-white z-50 shadow-2xl 
  transform transition-transform duration-300 ${
    drawerOpen ? "translate-x-0" : "translate-x-full"
  }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b shrink-0">
            <span className="font-semibold text-lg">Menu</span>
            <button onClick={() => setDrawerOpen(false)} className="text-2xl">
              ✕
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 font-medium text-gray-700">
            <Link href="/" onClick={() => setDrawerOpen(false)}>
              Home
            </Link>

            {/* Domestic Mobile */}
            <details>
              <summary className="cursor-pointer">Domestic Travel</summary>
              <div className="ml-4 mt-3 flex flex-col gap-2 text-sm">
                {domestic.map((place) => (
                  <Link
                    key={place}
                    href={`/domestic/${place.toLowerCase()}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {place}
                  </Link>
                ))}
              </div>
            </details>

            {/* International Mobile */}
            <details>
              <summary className="cursor-pointer">International Travel</summary>
              <div className="ml-4 mt-3 flex flex-col gap-2 text-sm">
                {international.map((place) => (
                  <Link
                    key={place}
                    href={`/international/${place.toLowerCase()}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {place}
                  </Link>
                ))}
              </div>
            </details>

            <button className="mt-4 bg-[var(--theme)] text-white py-3 rounded-full shadow">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
