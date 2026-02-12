"use client";

import Link from "next/link";
import DomesticTour from "@/app/Data/DomesticTour.json";

export default function DomesticTripsSection() {
  const domesticTrips = DomesticTour?.destinations || [];

  return (
    <section className="py-20 px-8 md:px-16 lg:px-20 xl:px-28 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header - Left Aligned */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider">
              ✈️ Explore India
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            <span className="text-black">Popular Domestic</span>{" "}
            <span className="text-blue-600">Destinations</span>
          </h2>

          <p className="text-gray-600 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Discover handpicked escapes across India—from snow-capped peaks to
            sun-kissed beaches, every journey tells a story.
          </p>

          <div className="w-20 h-1 bg-blue-600 mt-6 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8">
          {domesticTrips.map((trip, index) => (
            <Link href={`/packages/${trip.slug}`} key={trip.slug || index}>
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trip.bannerImage}
                    alt={trip.state}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* State Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/50">
                      {trip.state}
                    </span>
                  </div>

                  {/* Explore Badge */}
                  <div className="absolute bottom-4 left-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                      Explore Now
                      <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {trip.state}
                  </h3>

                  {/* Package Count */}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>{trip.packages?.length || 0} Tour Packages</span>
                  </div>

                  {/* Animated Underline */}
                  <div className="w-12 h-0.5 bg-blue-600 mt-3 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
