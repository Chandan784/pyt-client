"use client";

import Link from "next/link";
import InternationalTour from "@/app/Data/InternationalTour.json";

export default function InternationalDestinations() {
  const destinations = InternationalTour?.destinations || [];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular International Destinations
          </h2>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            Discover world-class destinations crafted for unforgettable
            international experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((item, index) => (
            <Link
              href={`/packages/${item.slug}`}
              key={item.country || index}
              className="block"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full">
                <img
                  src={item.bannerImage}
                  alt={item.country}
                  loading="lazy"
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.country}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {item.description}
                  </p>

                  {/* View Packages Link */}
                  <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 group">
                    View Packages
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
