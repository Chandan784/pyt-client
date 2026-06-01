"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "next/navigation";

import TourCard from "@/app/components/TourCard";

export default function PackageDetails() {
  const params = useParams();

  const { id } = params;

  const [destination, setDestination] = useState(null);

  const [tours, setTours] = useState([]);

  const [loading, setLoading] = useState(true);

  /* ======================================================
      FETCH DESTINATION + PACKAGES
  ====================================================== */

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      /* -----------------------------------------
          GET DESTINATION
      ----------------------------------------- */

      const destinationRes = await axios.get(
        `https://api.primevistajourney.com/api/destinations/${id}`,
      );

      const destinationData = destinationRes.data;

      setDestination(destinationData);

      /* -----------------------------------------
          GET PACKAGES
      ----------------------------------------- */

      const packageRes = await axios.get(
        `https://api.primevistajourney.com/api/packages/destination/${destinationData.id}`,
      );

      setTours(packageRes.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
      LOADING
  ====================================================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  /* ======================================================
      NOT FOUND
  ====================================================== */

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Destination Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* ================= BANNER ================= */}

      <section
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${destination.bannerImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {destination.state || destination.country} Tour Packages
          </h1>

          <p className="max-w-2xl mx-auto text-lg">{destination.description}</p>
        </div>
      </section>

      {/* ================= DETAILS ================= */}

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore {destination.state || destination.country}
        </h2>

        <p className="text-gray-600 text-center leading-relaxed">
          Discover curated travel experiences designed for couples, families,
          and adventure lovers.
        </p>
      </section>

      {/* ================= PACKAGES ================= */}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            All {destination.state || destination.country} Tour Packages
          </h2>

          {tours.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No Packages Found
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  destinationSlug={destination.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
