"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/918178420122?text=Hello%20Prime%20Vista%20Journey%2C%20I%20want%20to%20know%20more%20about%20your%20travel%20packages.",
      "_blank"
    );
  };

  return (
    <button
      onClick={openWhatsApp}
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-[9999] text-[#25D366] hover:scale-110 transition-transform duration-200"
    >
      <FaWhatsapp size={48} />
    </button>
  );
}