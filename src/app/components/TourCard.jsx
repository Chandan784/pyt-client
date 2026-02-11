"use client";

import Link from "next/link";

export default function TourCard({ tour, destinationSlug }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={tour.thumbnail}
          alt={tour.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
          {tour.title}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
          <span>📅</span>
          <span>{tour.duration}</span>
        </div>

        {/* Cities */}
        <div className="flex flex-wrap gap-1 mt-2">
          {tour.citiesCovered?.slice(0, 2).map((city, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {city}
            </span>
          ))}
          {tour.citiesCovered?.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{tour.citiesCovered.length - 2}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{tour.price.startingFrom.toLocaleString("en-IN")}
          </span>
          {tour.price.originalPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ₹{tour.price.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-xs text-gray-500 block">{tour.price.per}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {tour.tags?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Details Button */}
        <Link href={`/packages/details/${tour.packageId}`}>
          <button className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
