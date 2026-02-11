"use client";

import React from "react";
import domestic from "@/app/Data/DomesticTour.json";
import international from "@/app/Data/InternationalTour.json";
import { useParams } from "next/navigation";
import TourCard from "@/app/components/TourCard";

export default function PackageDetails() {
  const params = useParams();
  const { id } = params;

  // Merge both JSON files
  const allDestinations = [
    ...domestic.destinations,
    ...international.destinations,
  ];

  // Find destination by slug
  const destination = allDestinations.find((item) => item.slug === id);

  if (!destination) {
    return <div className="p-10 text-center">Destination Not Found</div>;
  }

  const tours = destination.packages;

  return (
    <div className="bg-gray-50">
      {/* ================= BANNER ================= */}
      <section
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${destination.bannerImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {destination.state || destination.country} Tour Packages
          </h1>
          <p className="max-w-2xl mx-auto text-lg">{destination.description}</p>
        </div>
      </section>

      {/* ================= DETAILS SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore {destination.state || destination.country} Like Never Before
        </h2>
        <p className="text-gray-600 text-center leading-relaxed">
          Discover curated travel experiences designed for couples, families,
          and adventure lovers.
        </p>
      </section>

      {/* ================= TOUR CARDS ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            All {destination.state || destination.country} Tour Packages
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard
                key={tour.packageId}
                tour={tour}
                destinationSlug={destination.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {destination.packages[0]?.keyInfo?.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold">{info.title}</h3>
                <ul className="text-gray-600 mt-2 list-disc ml-5">
                  {info.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
