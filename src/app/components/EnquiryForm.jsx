"use client";
import { useState } from "react";

export default function TravelEnquirySection() {
  const [travelType, setTravelType] = useState("Domestic");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendWhatsApp = (e) => {
    e.preventDefault();

    const whatsappNumber = "919871597736";

    const text = `
🌍 TRAVEL ENQUIRY
━━━━━━━━━━━━━━━━━━
Type: ${travelType}
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Message: ${form.message || "N/A"}
━━━━━━━━━━━━━━━━━━
    `;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-4">
          ✈️ Start Your Journey
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Ready to Travel?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Tell us where you want to go and we'll create the perfect itinerary
          for you.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Beautiful Travel Images */}
        <div className="space-y-4">
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg"
              alt="Beautiful beach destination"
              className="w-full h-full object-cover hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-1">Explore the World</h3>
              <p className="text-white/90">Your adventure starts here</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-32 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg"
                alt="Tropical beach"
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>
            <div className="relative h-32 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
                alt="Mountain landscape"
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>
            <div className="relative h-32 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.pexels.com/photos/2409681/pexels-photo-2409681.jpeg"
                alt="City architecture"
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>
            <div className="relative h-32 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg"
                alt="Indian palace"
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>
          </div>
        </div>

        {/* Right - Simple Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">
              ✉️
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Plan Your Trip
              </h3>
              <p className="text-sm text-gray-500">
                Get a free quote within 24 hours
              </p>
            </div>
          </div>

          <form onSubmit={sendWhatsApp} className="space-y-5">
            {/* Travel Type Toggle */}
            <div className="bg-gray-50 p-1.5 rounded-xl">
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setTravelType("Domestic")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    travelType === "Domestic"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  🏔️ Domestic
                </button>
                <button
                  type="button"
                  onClick={() => setTravelType("International")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    travelType === "International"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ✈️ International
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 border border-r-0 border-gray-200 bg-gray-50 text-gray-600 rounded-l-xl">
                  +91
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="98765 43210"
                  onChange={handleChange}
                  className="flex-1 border border-gray-200 rounded-r-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                name="message"
                rows="3"
                placeholder="Tell us about your dream vacation..."
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
            >
              📱 Send Enquiry on WhatsApp
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-green-600">✓</span> Free Quote
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-600">✓</span> No Spam
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-600">✓</span> 24/7 Support
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <div className="text-center p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">✈️</div>
          <h4 className="font-semibold text-gray-900">500+</h4>
          <p className="text-xs text-gray-500">Destinations</p>
        </div>
        <div className="text-center p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">🏨</div>
          <h4 className="font-semibold text-gray-900">1000+</h4>
          <p className="text-xs text-gray-500">Hotels</p>
        </div>
        <div className="text-center p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">⭐</div>
          <h4 className="font-semibold text-gray-900">4.8/5</h4>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
        <div className="text-center p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">🔒</div>
          <h4 className="font-semibold text-gray-900">Secure</h4>
          <p className="text-xs text-gray-500">Booking</p>
        </div>
      </div>
    </section>
  );
}
