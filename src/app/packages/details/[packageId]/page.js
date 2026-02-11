"use client";

import React from "react";
import { useParams } from "next/navigation";
import DayWiseItinerary from "@/app/components/DayWiseIntinary";
import domestic from "@/app/Data/DomesticTour.json";
import international from "@/app/Data/InternationalTour.json";

export default function TourDetails() {
  const params = useParams();
  const { packageId } = params;

  console.log(packageId, "id");

  // Find package by ID from both JSON files
  const findPackage = () => {
    // Check domestic destinations
    for (const dest of domestic.destinations) {
      const found = dest.packages?.find((pkg) => pkg.packageId === packageId);
      if (found) return { tour: found, destination: dest, type: "domestic" };
    }

    // Check international destinations
    for (const dest of international.destinations) {
      const found = dest.packages?.find((pkg) => pkg.packageId === packageId);
      if (found)
        return { tour: found, destination: dest, type: "international" };
    }

    return null;
  };

  const result = findPackage();

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Package Not Found
          </h2>
          <p className="text-gray-600">
            The tour package you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const { tour, destination } = result;
  const destinationName = destination.state || destination.country;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[60vh] md:h-[75vh]">
        <img
          src={tour.thumbnail || destination.bannerImage}
          alt={tour.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {tour.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              {destinationName} • {tour.duration}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {tour.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full font-semibold shadow-lg transition">
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
              {destination.description}
            </p>

            {/* Cities Covered */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tour.citiesCovered?.map((city, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  📍 {city}
                </span>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
              Day Wise Itinerary
            </h2>
            <DayWiseItinerary itinerary={tour.itinerary} />
          </div>

          {/* Inclusions & Exclusions Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold mb-4 text-green-600 flex items-center gap-2">
                ✅ Inclusions
              </h2>
              <ul className="space-y-2 text-gray-600">
                {tour.inclusions?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
                ❌ Exclusions
              </h2>
              <ul className="space-y-2 text-gray-600">
                {tour.exclusions?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500">✘</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Information / Travel Info */}
          {tour.keyInfo && tour.keyInfo.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
                Travel Information
              </h2>
              <div className="space-y-6">
                {tour.keyInfo.map((info, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    <ul className="list-disc ml-5 text-gray-600 space-y-1">
                      {info.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          {tour.termsAndConditions && tour.termsAndConditions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
                Terms & Conditions
              </h2>
              <div className="space-y-4">
                {tour.termsAndConditions.map((term, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {term.title}
                    </h3>
                    <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                      {term.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDE - PRICE & FORM ================= */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-2xl rounded-3xl p-8 sticky top-24 border border-gray-100">
            {/* Price Card */}
            <div className="text-center pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Starting from</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{tour.price.startingFrom.toLocaleString("en-IN")}
                </span>
                {tour.price.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{tour.price.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {tour.price.originalPrice && (
                <p className="text-sm text-green-600 mt-1 font-medium">
                  Save ₹
                  {(
                    tour.price.originalPrice - tour.price.startingFrom
                  ).toLocaleString("en-IN")}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">{tour.price.per}</p>
            </div>

            <h3 className="text-2xl font-bold mt-6 mb-2 text-gray-800">
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
                placeholder={`Interested in ${tour.title}`}
                defaultValue={`I'm interested in ${tour.title} package. Please share more details.`}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 transition transform text-black py-3 rounded-xl font-semibold shadow-lg"
              >
                Request Callback
              </button>
            </form>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">🔒 Secure</span>
              <span className="flex items-center gap-1">⚡ Instant</span>
              <span className="flex items-center gap-1">💬 24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
