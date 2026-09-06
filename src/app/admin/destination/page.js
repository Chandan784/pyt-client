"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DestinationFormModal from "../components/DestinationFormModal";
import { useRouter } from "next/navigation";

const API = "https://api.primevistajourney.com/api/destinations";

export default function DestinationManager() {
  const router = useRouter();
  const handleOpenDestination = (id) => {
    router.push(`admin/destination/${id}`);
  };

  // =========================
  // STATES
  // =========================
  const [destinations, setDestinations] = useState([]);

  const [fetchLoading, setFetchLoading] = useState(true);

  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [modal, setModal] = useState({
    show: false,
    type: "",
    message: "",
  });

  // =========================
  // FORM DATA
  // =========================
  const [formData, setFormData] = useState({
    type: "domestic",
    country: "India",
    state: "",
    slug: "",
    description: "",
  });

  // =========================
  // FETCH DESTINATIONS
  // =========================
  const fetchDestinations = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(API);

      setDestinations(res.data || []);
    } catch (error) {
      console.log(error);

      showModal("error", "Failed to fetch destinations");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // =========================
  // SHOW MODAL
  // =========================
  const showModal = (type, message) => {
    setModal({
      show: true,
      type,
      message,
    });
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    setModal({
      show: false,
      type: "",
      message: "",
    });
  };

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE STATE + SLUG
  // =========================
  const handleState = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      state: value,
      slug: value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
    });
  };

  // =========================
  // HANDLE IMAGE
  // =========================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // IMAGE VALIDATION
    if (!file.type.startsWith("image/")) {
      showModal("error", "Please select valid image");
      return;
    }

    // MAX 5MB
    if (file.size > 5 * 1024 * 1024) {
      showModal("error", "Image size must be less than 5MB");
      return;
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      type: "domestic",
      country: "India",
      state: "",
      slug: "",
      description: "",
    });

    setEditingId(null);

    setImage(null);

    setPreview("");
  };

  // =========================
  // OPEN ADD MODAL
  // =========================
  const openAddModal = () => {
    resetForm();

    setOpenForm(true);
  };

  // =========================
  // HANDLE EDIT
  // =========================
  const handleEdit = (item) => {
    alert(item.id);
    setEditingId(item.id);

    setFormData({
      type: item.type,
      country: item.country,
      state: item.state,
      slug: item.slug,
      description: item.description,
    });

    setPreview(item.bannerImage || item.banner_image);

    setOpenForm(true);
  };

  // =========================
  // HANDLE DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this destination?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);

      showModal("success", "Destination deleted successfully");

      fetchDestinations();
    } catch (error) {
      console.log(error);

      showModal("error", "Delete failed");
    }
  };

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // VALIDATION
    if (!formData.state.trim()) {
      showModal("error", "Please enter destination");
      return;
    }

    if (!formData.description.trim()) {
      showModal("error", "Please enter description");
      return;
    }

    // IMAGE REQUIRED FOR CREATE
    if (!editingId && !image) {
      showModal("error", "Please select image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("type", formData.type);
      data.append("country", formData.country);
      data.append("state", formData.state);
      data.append("slug", formData.slug);
      data.append("description", formData.description);

      if (image) {
        data.append("bannerImage", image);
      }

      // =========================
      // UPDATE
      // =========================
      if (editingId) {
        await axios.put(`${API}/${editingId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        showModal("success", "Destination updated successfully");
      }

      // =========================
      // CREATE
      // =========================
      else {
        await axios.post(API, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        showModal("success", "Destination added successfully");
      }

      setOpenForm(false);

      resetForm();

      fetchDestinations();
    } catch (error) {
      console.log(error);

      showModal(
        "error",
        error?.response?.data?.error || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-5 md:p-10">
      {/* =========================
          HEADER
      ========================= */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-800">
            Destination Management
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage all travel destinations professionally
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={openAddModal}
          className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition"
        >
          + Add Destination
        </button>
      </div>

      {/* =========================
          FORM MODAL COMPONENT
      ========================= */}
      <DestinationFormModal
        openForm={openForm}
        setOpenForm={setOpenForm}
        editingId={editingId}
        formData={formData}
        handleChange={handleChange}
        handleState={handleState}
        handleSubmit={handleSubmit}
        loading={loading}
        preview={preview}
        handleImage={handleImage}
        resetForm={resetForm}
      />

      {/* =========================
          SUCCESS / ERROR MODAL
      ========================= */}
      {modal.show && (
        <div className="fixed inset-0  z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[30px] p-8 text-center shadow-2xl">
            {/* ICON */}
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl ${
                modal.type === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {modal.type === "success" ? "✅" : "❌"}
            </div>

            {/* TITLE */}
            <h2 className="text-3xl font-black mt-5 text-gray-800">
              {modal.type === "success" ? "Success" : "Error"}
            </h2>

            {/* MESSAGE */}
            <p className="text-gray-500 mt-4 text-lg leading-7">
              {modal.message}
            </p>

            {/* BUTTON */}
            <button
              onClick={closeModal}
              className={`w-full h-12 rounded-2xl mt-7 text-white font-bold ${
                modal.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* =========================
          DESTINATION LIST
      ========================= */}
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-800">
            All Destinations
          </h2>

          <p className="text-gray-500 mt-2">
            Total Destinations: {destinations.length}
          </p>
        </div>

        {/* LOADING */}
        {fetchLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : destinations.length === 0 ? (
          <div className="bg-white rounded-[30px] p-16 text-center shadow">
            <h3 className="text-3xl font-black text-gray-700">
              No Destinations Found
            </h3>

            <p className="text-gray-500 mt-3 text-lg">
              Add your first destination now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {destinations.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.bannerImage || item.banner_image}
                    alt={item.state}
                    className="w-full h-44 object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

                  {/* TYPE BADGE */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg text-white ${
                        item.type === "domestic"
                          ? "bg-blue-600"
                          : "bg-purple-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="absolute top-4 right-0 flex gap-2">
                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-blue-600 hover:text-white text-gray-700 shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      ✏️
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-red-600 hover:text-white text-gray-700 shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* DESTINATION NAME OVER IMAGE */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-2xl font-black text-white drop-shadow-lg">
                      {item.state}
                    </h3>

                    <p className="text-white/90 text-sm mt-1 font-medium">
                      {item.country}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {/* SLUG */}
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                      /{item.slug}
                    </span>

                    <span className="text-xs text-gray-400 font-medium">
                      Destination
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 text-[15px] leading-7 mt-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* FOOTER */}
                  {/* VIEW BUTTON */}
                  <div className="mt-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/destination-details/${item.id}`);
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      View Destination →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
