"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import axios from "axios";

export default function InternationalDestinations() {
  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =====================================================
      FETCH INTERNATIONAL DESTINATIONS
  ===================================================== */

  useEffect(() => {
    fetchInternationalDestinations();
  }, []);

  const fetchInternationalDestinations = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://api.primevistajourney.com/api/destinations",
      );

      const internationalData = res.data.filter(
        (item) => item.type?.toLowerCase() === "international",
      );

      setDestinations(internationalData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 xl:px-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

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

        {/* LOADING */}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-56 bg-gray-200"></div>

                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded w-40 mb-3"></div>

                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>

                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* DESTINATIONS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8">
              {destinations.map((item, index) => (
                <Link
                  href={`/packages/${item.slug}`}
                  key={item.id || index}
                  className="block group"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full hover:-translate-y-2">
                    {/* IMAGE */}

                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.bannerImage}
                        alt={item.country}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* OVERLAY */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* COUNTRY */}

                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/50">
                          {item.country}
                        </span>
                      </div>

                      {/* EXPLORE */}

                      <div className="absolute bottom-4 left-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                          Explore Now
                          <span className="text-lg">→</span>
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-5 text-left">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.country}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* VIEW */}

                      <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium">
                        <span>View Packages</span>

                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* EMPTY */}

            {destinations.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-700">
                  No International Destinations Found
                </h3>

                <p className="text-gray-500 mt-3">
                  Please add international destinations from admin panel.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
