"use client";
import React from "react";

export default function ThailandPackageDetails() {
  const tours = [
    {
      title: "Thailand Vacation Itinerary: Temples, Islands & Tropical Bliss",
      duration: "10D/9N",
      route: "Bangkok (2N) – Krabi (2N) – Pattaya (2N)",
      price: "₹55,000",
      oldPrice: "₹67,000",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      rating: "4.8",
    },
    {
      title: "Thailand Package: Explore Krabi's Islands & Phuket's Charm",
      duration: "5D/4N",
      route: "Krabi (2N) – Phuket (2N)",
      price: "₹37,800",
      oldPrice: "₹47,000",
      image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
      rating: "4.7",
    },
    {
      title: "Scenic Thailand Phuket Krabi Package",
      duration: "8D/7N",
      route: "Koh Samui (2N) – Krabi (2N)",
      price: "₹68,000",
      oldPrice: "₹78,000",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      rating: "4.9",
    },
    {
      title: "Thailand Family Tour Package",
      duration: "6D/5N",
      route: "Krabi (2N) – Phuket (3N)",
      price: "₹35,000",
      oldPrice: "₹47,000",
      image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c",
      rating: "4.6",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* ================= BANNER ================= */}
      <section
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Thailand Tour Packages
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            Discover Bangkok, Phuket, Krabi & Pattaya with curated travel
            experiences.
          </p>
        </div>
      </section>

      {/* ================= DETAILS SECTION (NO PRICE) ================= */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore Thailand Like Never Before
        </h2>
        <p className="text-gray-600 text-center leading-relaxed">
          Thailand remains one of the most rewarding international destinations.
          From beautiful islands and vibrant nightlife to peaceful temples and
          cultural heritage, our Thailand packages are carefully designed for
          couples, families, and adventure lovers.
        </p>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            People Love Our Tours
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Amazing experience!",
              "Best honeymoon trip ever!",
              "Very well organized package!",
            ].map((text, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow">
                <p className="text-yellow-500 text-lg mb-2">★★★★★</p>
                <p className="text-gray-600">{text}</p>
                <h4 className="font-semibold mt-4">Verified Traveller</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOUR CARDS ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            All Thailand Tour Packages
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">
                  <span className="text-sm text-gray-500">{tour.duration}</span>

                  <h3 className="font-bold text-lg mt-2 line-clamp-2">
                    {tour.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">{tour.route}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-green-600 font-bold text-xl">
                        {tour.price}
                      </p>
                      <p className="text-gray-400 line-through text-sm">
                        {tour.oldPrice}
                      </p>
                    </div>
                    <span className="text-yellow-500 font-semibold">
                      ⭐ {tour.rating}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 text-sm">
                      View Details
                    </button>
                    <button className="flex-1 bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 text-sm">
                      Talk to Expert
                    </button>
                  </div>
                </div>
              </div>
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
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">
                What is the best time to visit Thailand?
              </h3>
              <p className="text-gray-600 mt-2">
                November to April is the best time due to pleasant weather.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">
                Are flights included in the package?
              </h3>
              <p className="text-gray-600 mt-2">
                Flights can be added on request. Most packages include hotels &
                transfers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">Can I customize my itinerary?</h3>
              <p className="text-gray-600 mt-2">
                Yes, all packages can be customized based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
