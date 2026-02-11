"use client";

import React from "react";

export default function DayWiseItinerary({ itinerary }) {
  if (!itinerary || itinerary.length === 0) {
    return <p className="text-gray-500">No itinerary available</p>;
  }

  return (
    <div className="space-y-6">
      {itinerary.map((day, index) => (
        <div
          key={index}
          className="border-b border-gray-100 pb-6 last:border-0"
        >
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
              {day.day}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {day.title}
              </h3>

              {day.stay && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Stay:</span> {day.stay}
                </p>
              )}

              {day.meals && day.meals.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Meals:</span>{" "}
                  {day.meals.join(" • ")}
                </p>
              )}

              <p className="text-gray-600 mt-2">{day.description}</p>

              {day.highlights && day.highlights.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-700">
                    Highlights:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {day.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                      >
                        ✦ {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
