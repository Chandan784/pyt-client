"use client";

import Link from "next/link";
import InternationalTour from "@/app/Data/InternationalTour.json";

export default function InternationalDestinations() {
  const destinations = InternationalTour?.destinations || [];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 xl:px-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header - Left Aligned with Clean Typography */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider">
              ✈️ Explore The World
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-black">Popular International</span>{" "}
            <span className="text-blue-600">Destinations</span>
          </h2>

          <p className="text-gray-600 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Discover world-class destinations crafted for unforgettable
            international experiences across the globe.
          </p>

          <div className="w-20 h-1 bg-blue-600 mt-6 rounded-full"></div>
        </div>

        {/* Cards Grid - Enhanced with hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8">
          {destinations.map((item, index) => (
            <Link
              href={`/packages/${item.slug}`}
              key={item.country || index}
              className="block group"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.bannerImage}
                    alt={item.country}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Country Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/50">
                      {item.country}
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.country}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Package Count */}
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
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
                    <span>{item.packages?.length || 0} Tour Packages</span>
                  </div>

                  {/* View Packages Link - Enhanced */}
                  <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium group/link">
                    <span>View Packages</span>
                    <span className="group-hover/link:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                    <span className="w-8 h-0.5 bg-blue-600 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button - Left Aligned */}
        {/* <div className="mt-14 text-left">
          <Link href="/international-packages">
            <button className="group relative bg-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden inline-flex items-center gap-3 hover:bg-blue-700">
              <span className="relative z-10">
                View All International Packages
              </span>
              <span className="relative z-10 text-xl group-hover:translate-x-1 transition-transform">
                →
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div> */}

        {/* Decorative Tags */}
        {/* <div className="mt-16 flex justify-start">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Asia
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Europe
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Middle East
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
              Island Getaways
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
