"use client";

import Link from "next/link";
import DomesticTour from "@/app/Data/DomesticTour.json";

export default function DomesticTripsSection() {
  const domesticTrips = DomesticTour?.destinations || [];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular Domestic Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover handpicked destinations across India
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domesticTrips.map((trip, index) => (
            <Link href={`/packages/${trip.slug}`} key={trip.slug || index}>
              <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={trip.bannerImage}
                  alt={trip.state}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {trip.state}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {trip.description || "Explore beautiful destinations"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link href="/domestic-packages">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View All Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
