"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import axios from "axios";

export default function DomesticTripsSection() {
  const [domesticTrips, setDomesticTrips] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =====================================================
      FETCH DESTINATIONS
  ===================================================== */

  useEffect(() => {
    fetchDomesticDestinations();
  }, []);

  const fetchDomesticDestinations = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://api.primevistajourney.com/api/destinations",
      );

      console.log(res.data);

      /* FILTER DOMESTIC */

      const filtered = res.data.filter(
        (item) => item.type?.toLowerCase() === "international",
      );

      setDomesticTrips(filtered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
      LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="py-20 px-8 md:px-16 lg:px-20 xl:px-28 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-56 bg-gray-200"></div>

                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded w-40 mb-3"></div>

                  <div className="h-4 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-8 md:px-16 lg:px-20 xl:px-28 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider">
              ✈️ Explore International Destinations
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            <span className="text-black">Popular International</span>{" "}
            <span className="text-blue-600">Destinations</span>
          </h2>

          <p className="text-gray-600 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Discover handpicked escapes across India—from snow-capped peaks to
            sun-kissed beaches, every journey tells a story.
          </p>

          <div className="w-20 h-1 bg-blue-600 mt-6 rounded-full"></div>
        </div>

        {/* EMPTY */}

        {domesticTrips.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700">
              No International Destinations Found
            </h3>
          </div>
        )}

        {/* CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8">
          {domesticTrips.map((trip, index) => (
            <Link href={`/packages/${trip.id}`} key={trip.id || index}>
              <div
                className="
                  group
                  bg-white
                  rounded-2xl
                  shadow-md
                  hover:shadow-2xl
                  transition-all
                  duration-500
                  overflow-hidden
                  cursor-pointer
                  hover:-translate-y-2
                  border
                  border-gray-100
                "
              >
                {/* IMAGE */}

                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trip.bannerImage}
                    alt={trip.state}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* BADGE */}

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/50">
                      {trip.state}
                    </span>
                  </div>

                  {/* BUTTON */}

                  <div className="absolute bottom-4 left-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                      Explore Now
                      <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {trip.state}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {trip.description}
                  </p>

                  {/* LINE */}

                  <div className="w-12 h-0.5 bg-blue-600 mt-4 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
