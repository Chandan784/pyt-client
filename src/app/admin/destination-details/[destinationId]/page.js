"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";

import PackageFormModal from "../../components/PackageFormModal";

export default function DestinationDetailsPage() {
  // ================= API =================
  const API = "https://api.primevistajourney.com/api";
  const DEMO_API = "http://localhost:5000/api";
  // ================= ROUTER =================
  const router = useRouter();

  // ================= PARAMS =================
  const params = useParams();

  const destinationId = params?.destinationId;

  // ================= STATES =================
  const [destination, setDestination] = useState(null);

  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= MODAL =================
  const [openModal, setOpenModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  // ================= INITIAL FORM =================
  const initialForm = {
    packageId: "",
    title: "",
    slug: "",
    duration: "",
    ratings: "5",
    thumbnail: "",
    featured: false,
    status: "active",
    createdAt: new Date().toISOString().split("T")[0],
    startingFrom: "",
    originalPrice: "",
    currency: "₹",
    per: "Per Person",
  };

  // ================= FORM =================
  const [formData, setFormData] = useState(initialForm);

  // ================= FETCH DESTINATION =================
  const fetchDestination = async () => {
    try {
      const res = await axios.get(`${API}/destinations/${destinationId}`);

      setDestination(res.data);
    } catch (error) {
      console.log(error);

      setError("Failed to fetch destination");
    }
  };
  console.log(destination);

  // ================= FETCH PACKAGES =================
  const fetchPackages = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/packages`);

      const filteredPackages = res.data.filter(
        (item) => Number(item.destination_id) === Number(destinationId),
      );

      setPackages(filteredPackages);
    } catch (error) {
      console.log(error);

      setError("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    if (destinationId) {
      fetchDestination();

      fetchPackages();
    }
  }, [destinationId]);

  // ================= RESET FORM =================
  const resetForm = () => {
    setFormData(initialForm);

    setEditingId(null);
  };

  // ================= ADD PACKAGE =================
  const handleAddPackage = () => {
    resetForm();

    setOpenModal(true);
  };

  // ================= EDIT PACKAGE =================
  const handleEdit = (pkg) => {
    setEditingId(pkg.id);

    setFormData({
      packageId: pkg.packageId || "",
      title: pkg.title || "",
      slug: pkg.slug || "",
      duration: pkg.duration || "",
      ratings: pkg.ratings || "5",
      thumbnail: pkg.thumbnail || "",
      featured: pkg.featured == 1,
      status: pkg.status || "active",
      createdAt: pkg.createdAt || new Date().toISOString().split("T")[0],
      startingFrom: pkg.startingFrom || "",
      originalPrice: pkg.originalPrice || "",
      currency: pkg.currency || "₹",
      per: pkg.perText || "Per Person",
    });

    setOpenModal(true);
  };

  // ================= SAVE PACKAGE =================
  const handleSavePackage = async () => {
    try {
      // VALIDATION
      if (!formData.title || !formData.thumbnail || !formData.duration) {
        alert("Please fill all required fields");

        return;
      }

      const payload = {
        ...formData,

        featured: formData.featured ? 1 : 0,

        destination_id: destinationId,

        perText: formData.per,
      };
      console.log("fhf");

      // ================= UPDATE =================
      if (editingId) {
        await axios.put(`${API}/packages/${editingId}`, payload);

        alert("Package updated successfully");
      }

      // ================= CREATE =================
      else {
        await axios.post(`${API}/packages`, payload);

        alert("Package added successfully");
      }

      // REFRESH
      fetchPackages();

      // CLOSE MODAL
      setOpenModal(false);

      // RESET
      resetForm();
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  // ================= DELETE PACKAGE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this package?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/packages/${id}`);

      setPackages((prev) => prev.filter((item) => item.id !== id));

      alert("Package deleted successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to delete package");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* ================= HERO ================= */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={
            destination?.bannerImage ||
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          }
          alt="destination"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex items-end px-6 md:px-12 pb-12">
          <div>
            <p className="text-white/80 uppercase tracking-[5px] font-bold text-sm">
              Destination Dashboard
            </p>

            <h1 className="text-5xl md:text-7xl font-black text-white mt-4">
              {destination?.state || "Destination"}
            </h1>

            <p className="text-white/80 text-xl mt-3">{destination?.country}</p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-20">
        {/* TOP CARD */}
        <div className="bg-white rounded-[36px] p-6 md:p-8 shadow-2xl border border-gray-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900">Tour Packages</h2>

            <p className="text-gray-500 mt-2 text-lg">
              Manage destination packages
            </p>
          </div>

          <button
            onClick={handleAddPackage}
            className="h-16 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg shadow-xl hover:scale-105 transition-all duration-300"
          >
            + Add Package
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-8 font-semibold">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && packages.length === 0 && (
          <div className="bg-white rounded-[30px] p-16 text-center shadow-xl">
            <h2 className="text-3xl font-black text-gray-800">
              No Packages Found
            </h2>

            <p className="text-gray-500 mt-3">
              Start by adding your first package
            </p>

            <button
              onClick={handleAddPackage}
              className="mt-8 px-8 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300"
            >
              Add Package
            </button>
          </div>
        )}

        {/* ================= PACKAGES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-[34px] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={pkg.thumbnail}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* BADGES */}
                <div className="absolute top-5 left-5 flex gap-2">
                  {pkg.featured == 1 && (
                    <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold shadow-md">
                      Featured
                    </span>
                  )}

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
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
              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* TITLE */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                      {pkg.title}
                    </h2>

                    <p className="text-gray-500 mt-2">{pkg.duration}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">Starting From</p>

                    <h3 className="text-2xl md:text-3xl font-black text-blue-600 mt-1">
                      {pkg.currency} {pkg.startingFrom}
                    </h3>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-8 space-y-4">
                  <div className="flex gap-4">
                    {/* EDIT */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        handleEdit(pkg);
                      }}
                      className="flex-1 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-all duration-300"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        handleDelete(pkg.id);
                      }}
                      className="flex-1 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>

                  {/* VIEW */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      router.push(`/admin/package-details/${pkg.id}`);
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    View Package →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <PackageFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        editingId={editingId}
        destinationId={destinationId}
        formData={formData}
        setFormData={setFormData}
        fetchPackages={fetchPackages}
        resetForm={resetForm}
        handleSavePackage={handleSavePackage}
      />
    </div>
  );
}
