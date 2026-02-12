"use client";
import { useState } from "react";

export default function TravelEnquirySection() {
  const [travelType, setTravelType] = useState("domestic");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendWhatsApp = (e) => {
    e.preventDefault();

    const whatsappNumber = "919871597736";

    const text = `
🌍 TRAVEL ENQUIRY
━━━━━━━━━━━━━━━━━━
Type: ${travelType === "domestic" ? "Domestic" : "International"}
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
━━━━━━━━━━━━━━━━━━
    `;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
          ✈️ Start Your Journey
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Ready to Travel?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-base">
          Tell us where you want to go and we'll create the perfect itinerary
          for you.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Single Optimized Image */}
        <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg"
            alt="Travel destination"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold mb-1">Explore the World</h3>
            <p className="text-white/90">Your adventure starts here</p>
          </div>
        </div>

        {/* Right - Simple Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2.5 rounded-full text-blue-600 text-lg">
              ✉️
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Plan Your Trip
              </h3>
              <p className="text-xs text-gray-500">Free quote in 24 hours</p>
            </div>
          </div>

          <form onSubmit={sendWhatsApp} className="space-y-4">
            {/* Radio Buttons for Travel Type */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-2">
                Trip Type
              </p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="travelType"
                    value="domestic"
                    checked={travelType === "domestic"}
                    onChange={(e) => setTravelType(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Domestic</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="travelType"
                    value="international"
                    checked={travelType === "international"}
                    onChange={(e) => setTravelType(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">International</span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name *"
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address *"
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <div className="flex">
                <span className="inline-flex items-center px-4 border border-r-0 border-gray-200 bg-gray-50 text-gray-600 rounded-l-lg text-sm">
                  +91
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  onChange={handleChange}
                  className="flex-1 border border-gray-200 rounded-r-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Send Enquiry on WhatsApp
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">✓ Free Quote</span>
              <span className="flex items-center gap-1">✓ No Spam</span>
              <span className="flex items-center gap-1">✓ 24/7 Support</span>
            </div>
          </form>
        </div>
      </div>

      {/* Simple Stats Row */}
      <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">500+</div>
          <p className="text-xs text-gray-500">Destinations</p>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">1000+</div>
          <p className="text-xs text-gray-500">Hotels</p>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">4.8/5</div>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">Secure</div>
          <p className="text-xs text-gray-500">Booking</p>
        </div>
      </div>
    </section>
  );
}
