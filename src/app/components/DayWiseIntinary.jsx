"use client";
import { useState } from "react";

export default function DayWiseItinerary() {
  const [openIndex, setOpenIndex] = useState(null);
  const [openAll, setOpenAll] = useState(false);

  const itinerary = [
    {
      title: "Arrival in Pattaya & Alcazar Show",
      description:
        "Arrive at Bangkok Airport and transfer to Pattaya. Check-in and relax. In the evening enjoy the dazzling Alcazar Cabaret Show with colorful costumes, lighting, and music.",
      highlights: ["Arrival", "Alcazar Cabaret Show", "Night stay at Pattaya"],
    },
    {
      title: "Coral Island & Walking Street",
      description:
        "After breakfast, enjoy a speedboat ride to Coral Island. Relax at Tawaen Beach or try water sports like parasailing and snorkeling. Evening free to explore Pattaya Walking Street.",
      highlights: [
        "Coral Island Tour",
        "Walking Street",
        "Night stay at Pattaya",
      ],
    },
    {
      title: "Nong Nooch Village",
      description:
        "Visit Nong Nooch Tropical Village featuring themed gardens, elephant shows, orchid gardens, and cultural performances. Return for overnight stay in Pattaya.",
      highlights: ["Nong Nooch Village Tour", "Night stay at Pattaya"],
    },
    {
      title: "Transfer to Bangkok & Dinner Cruise",
      description:
        "Drive to Bangkok. Visit Golden Buddha & Emerald Buddha Temples. Enjoy a luxury dinner cruise along the Chao Phraya River with live entertainment.",
      highlights: [
        "Bangkok City Tour",
        "Dinner Cruise",
        "Night stay at Bangkok",
      ],
    },
    {
      title: "Safari World & Marine Park",
      description:
        "Visit Safari World with open zoo drive-through and Marine Park shows including dolphins and sea lions. A fun wildlife experience for the whole family.",
      highlights: ["Safari World", "Marine Park", "Night stay at Bangkok"],
    },
    {
      title: "Dream World Theme Park",
      description:
        "Enjoy full day at Dream World amusement park. Experience thrilling rides, Fantasy Land, and Snow Town with real snow fun.",
      highlights: ["Dream World Theme Park", "Night stay at Bangkok"],
    },
    {
      title: "Departure",
      description:
        "After breakfast, transfer to Bangkok Airport for your return flight home with unforgettable family memories.",
      highlights: ["Departure", "Airport Transfer"],
    },
  ];

  const toggleDay = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleAll = () => {
    setOpenAll(!openAll);
    setOpenIndex(null);
  };

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Day Wise Itinerary</h2>
        <button
          onClick={toggleAll}
          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold hover:bg-yellow-200 transition"
        >
          {openAll ? "Hide All" : "View All"}
        </button>
      </div>

      <div className="relative border-l-2 border-yellow-200 space-y-6 pl-6">
        {itinerary.map((day, index) => {
          const isOpen = openAll || openIndex === index;

          return (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[11px] top-6 w-5 h-5 bg-yellow-500 rounded-full border-4 border-white shadow"></div>

              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <button
                  onClick={() => toggleDay(index)}
                  className="w-full text-left p-6 flex justify-between items-center"
                >
                  <div>
                    <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">
                      Day {index + 1}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold mt-1">
                      {day.title}
                    </h3>
                  </div>

                  <span className="text-2xl text-yellow-600 font-light">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600">
                    <p className="mb-6 leading-relaxed">{day.description}</p>

                    {/* Highlights Chips */}
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800">
                        Today's Highlights
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {day.highlights.map((item, i) => (
                          <span
                            key={i}
                            className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Close Button */}
                    <div className="mt-6 text-right">
                      <button
                        onClick={() => setOpenIndex(null)}
                        className="text-sm text-gray-500 hover:text-yellow-600 font-medium transition"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
