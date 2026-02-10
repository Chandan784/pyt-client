"use client";
import DayWiseItinerary from "@/app/components/DayWiseIntinary";
import React from "react";

export default function ThailandFamilyDetails() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[60vh] md:h-[75vh]">
        <img
          src="https://images.unsplash.com/photo-1508009603885-50cf7c579365"
          alt="Thailand Family Trip"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Family Trip to Thailand
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Explore the Best of Bangkok & Pattaya • 7 Days / 6 Nights
            </p>
            <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold shadow-lg transition">
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {/* ================= MAIN SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid lg:grid-cols-3 gap-12">
        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:col-span-2 space-y-14">
          {/* Overview Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3">
              Tour Overview
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Embark on an unforgettable family holiday blending tropical
              beaches, cultural landmarks, thrilling theme parks, and vibrant
              nightlife. From Pattaya’s Coral Island to Bangkok’s dinner cruise,
              this journey offers the perfect mix of relaxation and adventure.
            </p>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
              Day Wise Itinerary
            </h2>
            <DayWiseItinerary />
          </div>

          {/* Inclusions & Exclusions Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold mb-4 text-green-600">
                Inclusions
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li>✔ 3 Nights Pattaya with Breakfast</li>
                <li>✔ 3 Nights Bangkok with Breakfast</li>
                <li>✔ Alcazar Show</li>
                <li>✔ Coral Island with Lunch</li>
                <li>✔ Dinner Cruise</li>
                <li>✔ Safari World & Dream World</li>
                <li>✔ SIC Transfers</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold mb-4 text-red-500">
                Exclusions
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li>✘ Airfare</li>
                <li>✘ Visa & Insurance</li>
                <li>✘ Personal Expenses</li>
                <li>✘ Optional Activities</li>
                <li>✘ GST & TCS</li>
              </ul>
            </div>
          </div>

          {/* Key Information */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
              Travel Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <p>
                <strong>Visa:</strong> Visa-free for Indians (30 Days)
              </p>
              <p>
                <strong>Best Time:</strong> November – April
              </p>
              <p>
                <strong>Currency:</strong> Thai Baht (THB)
              </p>
              <p>
                <strong>Language:</strong> Thai & English
              </p>
              <p>
                <strong>Emergency:</strong> Tourist Police – 1155
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
              Terms & Conditions
            </h2>
            <div className="space-y-3 text-gray-600 text-sm">
              <p>
                <strong>Cancellation:</strong> 30+ days: 25% | 15–29 days: 50% |
                Less than 15 days: 100%
              </p>
              <p>Hotels subject to availability.</p>
              <p>Flight fares dynamic & non-refundable.</p>
              <p>Not liable for natural delays or disasters.</p>
              <p>Indian jurisdiction applicable.</p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE FORM ================= */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-2xl rounded-3xl p-8 sticky top-24 border border-gray-100">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              Get Free Quote
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Our travel expert will contact you within 24 hours.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <input
                type="date"
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <textarea
                rows="3"
                placeholder="Your Message"
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 transition transform text-black py-3 rounded-xl font-semibold shadow-lg"
              >
                Request Callback
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
