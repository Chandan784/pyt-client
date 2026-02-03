"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/pyt-logo.jpg"
              alt="Plan Your Trip"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover"
            />

            <span className="text-lg font-semibold text-gray-800">
              Plan Your Trip
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <a className="hover:text-[var(--theme)] transition" href="#">
              Home
            </a>
            <a className="hover:text-[var(--theme)] transition" href="#">
              Packages
            </a>
            <a className="hover:text-[var(--theme)] transition" href="#">
              Reviews
            </a>
            <a className="hover:text-[var(--theme)] transition" href="#">
              Contact
            </a>
            <button className="bg-[var(--theme)] text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
              Book Now
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl text-gray-700"
            aria-label="Toggle Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-2xl"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
          {["Home", "Packages", "Reviews", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setOpen(false)}
              className="hover:text-[var(--theme)]"
            >
              {item}
            </a>
          ))}

          <button className="mt-4 bg-[var(--theme)] text-white py-3 rounded-lg">
            Book Your Trip
          </button>
        </div>
      </div>
    </>
  );
}
