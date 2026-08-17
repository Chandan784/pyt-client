"use client";

import { useEffect, useState } from "react";

export default function TravelEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [travelType, setTravelType] = useState("domestic");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();

    const whatsappNumber = "918178420122";

    const text = `
🌍 TRAVEL ENQUIRY
━━━━━━━━━━━━━━━━━━
Type: ${travelType === "domestic" ? "Domestic" : "International"}

Name: ${form.name}
Email: ${form.email}
Phone: +91 ${form.phone}

━━━━━━━━━━━━━━━━━━
Prime Vista Journey
`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open travel enquiry"
        className="fixed bottom-5 right-5 z-[9998] w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 md:w-9 md:h-9"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.002 5.45-4.438 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.875 11.875 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.821 11.821 0 00-3.479-8.416" />
        </svg>

        {/* Pulse */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></span>
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6">
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          ></div>

          {/* Popup Card */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popup_0.3s_ease-out]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl"
              >
                ×
              </button>

              <div className="pr-8">
                <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">
                  ✈️ Plan Your Journey
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Where do you want to go?
                </h2>

                <p className="text-blue-100 text-sm mt-1">
                  Get a personalized travel quote from our experts.
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={sendWhatsApp}
              className="p-6 space-y-4"
            >
              {/* Trip Type */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  TRIP TYPE
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`border rounded-lg p-3 cursor-pointer text-center text-sm font-medium transition ${
                      travelType === "domestic"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="travelType"
                      value="domestic"
                      checked={travelType === "domestic"}
                      onChange={(e) => setTravelType(e.target.value)}
                      className="hidden"
                    />

                    🇮🇳 Domestic
                  </label>

                  <label
                    className={`border rounded-lg p-3 cursor-pointer text-center text-sm font-medium transition ${
                      travelType === "international"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="travelType"
                      value="international"
                      checked={travelType === "international"}
                      onChange={(e) => setTravelType(e.target.value)}
                      className="hidden"
                    />

                    🌍 International
                  </label>
                </div>
              </div>

              {/* Name */}
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Email */}
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address *"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Phone */}
              <div className="flex">
                <span className="flex items-center px-4 border border-r-0 border-gray-200 bg-gray-50 text-gray-600 rounded-l-lg text-sm">
                  +91
                </span>

                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={handleChange}
                  className="flex-1 border border-gray-200 rounded-r-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.002 5.45-4.438 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.875 11.875 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.821 11.821 0 00-3.479-8.416" />
                </svg>

                Send Enquiry on WhatsApp
              </button>

              <div className="flex justify-center gap-4 text-[11px] text-gray-500">
                <span>✓ Free Quote</span>
                <span>✓ No Spam</span>
                <span>✓ Quick Response</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Animation */}
      <style jsx>{`
        @keyframes popup {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}