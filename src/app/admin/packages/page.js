"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PackageAdminPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH PACKAGES
  const fetchPackages = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://api.primevistajourney.com/api/packages",
      );

      setPackages(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE PACKAGE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://api.primevistajourney.com/api/packages/${id}`,
      );

      fetchPackages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // FILTERED PACKAGES
  const filteredPackages = packages.filter((pkg) =>
    pkg.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">
            Travel Packages
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage all travel packages professionally
          </p>
        </div>

        <button className="h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xl hover:scale-[1.02] transition-all duration-300">
          + Add Package
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search packages..."
            className="h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />

          <button className="h-14 rounded-2xl bg-gray-900 text-white font-bold hover:opacity-90 transition-all duration-300">
            Total Packages : {packages.length}
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPackages.length === 0 ? (
            <div className="bg-white rounded-[28px] p-10 text-center shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-800">
                No Packages Found
              </h2>

              <p className="text-gray-500 mt-2">
                No travel packages available right now.
              </p>
            </div>
          ) : (
            filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col xl:flex-row">
                  {/* IMAGE */}
                  <div className="xl:w-[320px] relative">
                    <img
                      src={pkg.thumbnail}
                      alt={pkg.title}
                      className="w-full h-[250px] xl:h-full object-cover"
                    />

                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {pkg.featured == 1 && (
                        <span className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 text-xs font-black shadow-lg">
                          Featured
                        </span>
                      )}

                      <span
                        className={`px-4 py-2 rounded-full text-xs font-black shadow-lg ${
                          pkg.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {pkg.status}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
                    {/* TOP */}
                    <div>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                            {pkg.title}
                          </h2>

                          <p className="text-gray-500 mt-2 text-lg">
                            📍 {pkg.destination_name || "Destination"}
                          </p>
                        </div>

                        <div className="text-left lg:text-right">
                          <p className="text-sm text-gray-500">Starting From</p>

                          <h3 className="text-3xl font-black text-blue-600 mt-1">
                            {pkg.currency} {pkg.startingFrom}
                          </h3>

                          <p className="text-sm text-gray-400 mt-1">
                            {pkg.perText}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-sm text-gray-500">Duration</p>

                        <h4 className="font-bold text-gray-900 mt-1">
                          {pkg.duration}
                        </h4>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-sm text-gray-500">Ratings</p>

                        <h4 className="font-bold text-gray-900 mt-1">
                          ⭐ {pkg.ratings}
                        </h4>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-sm text-gray-500">Package ID</p>

                        <h4 className="font-bold text-gray-900 mt-1">
                          {pkg.packageId}
                        </h4>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg">
                        Edit Package
                      </button>

                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="flex-1 h-14 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all duration-300 shadow-lg"
                      >
                        Delete Package
                      </button>

                      <button className="flex-1 h-14 rounded-2xl bg-gray-900 text-white font-bold hover:opacity-90 transition-all duration-300 shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
