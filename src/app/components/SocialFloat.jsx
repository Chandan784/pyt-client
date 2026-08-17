"use client";

import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function SocialFloat() {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/918178420122?text=Hello%20Prime%20Vista%20Journey%2C%20I%20want%20to%20know%20more%20about%20your%20travel%20packages.",
      "_blank"
    );
  };

  const openInstagram = () => {
    window.open(
      "https://www.instagram.com/primevistajourney?igsh=MWlwN3A4djBiMm05cw%3D%3D&utm_source=qr",
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-center gap-3">
      
      {/* Instagram */}
      <button
        onClick={openInstagram}
        aria-label="Instagram"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#4f5bd5] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
      >
        <FaInstagram size={27} />
      </button>

      {/* WhatsApp */}
      <button
        onClick={openWhatsApp}
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
      >
        <FaWhatsapp size={27} />
      </button>

    </div>
  );
}