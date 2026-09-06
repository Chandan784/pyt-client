"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://api.primevistajourney.com" || "http://localhost:5000";

function Hero() {
  const [slides, setSlides] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    button_text: "Explore Now",
    button_link: "/packages",
    is_active: 1,
    sort_order: 0,
    image: null,
  });

  /* ================= GET SLIDES ================= */

  const getSlides = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/heroSliders`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load slides"
        );
      }

      setSlides(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSlides();
  }, []);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= IMAGE CHANGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  /* ================= RESET FORM ================= */

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      button_text: "Explore Now",
      button_link: "/packages",
      is_active: 1,
      sort_order: 0,
      image: null,
    });

    setEditingId(null);
    setImagePreview(null);
  };

  /* ================= OPEN CREATE ================= */

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  /* ================= OPEN EDIT ================= */

  const openEdit = (slide) => {
    setEditingId(slide.id);

    setForm({
      title: slide.title || "",
      description: slide.description || "",
      button_text:
        slide.button_text || "Explore Now",
      button_link:
        slide.button_link || "/packages",
      is_active:
        slide.is_active ? 1 : 0,
      sort_order:
        slide.sort_order || 0,
      image: null,
    });

    setImagePreview(slide.image_url);

    setShowModal(true);
  };

  /* ================= CLOSE MODAL ================= */

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !form.image) {
      alert("Please select an image");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "button_text",
        form.button_text
      );

      formData.append(
        "button_link",
        form.button_link
      );

      formData.append(
        "is_active",
        form.is_active
      );

      formData.append(
        "sort_order",
        form.sort_order
      );

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      const url = editingId
        ? `${API_URL}/api/heroSliders/${editingId}`
        : `${API_URL}/api/heroSliders`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Something went wrong"
        );
      }

      alert(
        editingId
          ? "Hero slide updated successfully"
          : "Hero slide created successfully"
      );

      setShowModal(false);

      resetForm();

      getSlides();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slide?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/heroSliders/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Delete failed"
        );
      }

      setSlides((prev) =>
        prev.filter(
          (slide) => slide.id !== id
        )
      );

      alert("Hero slide deleted successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleStatus = async (slide) => {
    try {
      const formData = new FormData();

      formData.append(
        "title",
        slide.title
      );

      formData.append(
        "description",
        slide.description || ""
      );

      formData.append(
        "button_text",
        slide.button_text || "Explore Now"
      );

      formData.append(
        "button_link",
        slide.button_link || "/packages"
      );

      formData.append(
        "is_active",
        slide.is_active ? 0 : 1
      );

      formData.append(
        "sort_order",
        slide.sort_order || 0
      );

      const response = await fetch(
        `${API_URL}/api/heroSliders/${slide.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Status update failed"
        );
      }

      getSlides();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hero Slider
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your website hero slider
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Hero Slide
        </button>

      </div>

      {/* ================= CONTENT ================= */}

      {loading ? (
        <div className="bg-white rounded-xl p-10 text-center">
          <p className="text-gray-500">
            Loading slides...
          </p>
        </div>
      ) : slides.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border">

          <div className="text-5xl mb-4">
            🖼️
          </div>

          <h2 className="text-lg font-semibold">
            No Hero Slides
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            Add your first hero slide.
          </p>

          <button
            onClick={openCreate}
            className="bg-black text-white px-5 py-3 rounded-lg"
          >
            Add Hero Slide
          </button>

        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {slides.map((slide) => (

            <div
              key={slide.id}
              className="bg-white rounded-xl border overflow-hidden shadow-sm"
            >

              {/* IMAGE */}

              <div className="relative h-52 bg-gray-100">

                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* STATUS */}

                <div className="absolute top-3 left-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      slide.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {slide.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>

                </div>

                {/* ORDER */}

                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                  #{slide.sort_order}
                </div>

              </div>

              {/* CONTENT */}

              <div className="p-5">

                <h2 className="font-semibold text-lg text-gray-900 line-clamp-1">
                  {slide.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                  {slide.description}
                </p>

                {/* BUTTON INFO */}

                <div className="mt-4 text-xs text-gray-400">

                  Button:{" "}
                  <span className="text-gray-700">
                    {slide.button_text}
                  </span>

                </div>

                {/* ACTIONS */}

                <div className="flex gap-2 mt-5">

                  <button
                    onClick={() =>
                      openEdit(slide)
                    }
                    className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleStatus(slide)
                    }
                    className={`flex-1 py-2 rounded-lg text-sm ${
                      slide.is_active
                        ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {slide.is_active
                      ? "Disable"
                      : "Activate"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(slide.id)
                    }
                    className="px-4 py-2 rounded-lg text-sm bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-6 border-b">

              <div>
                <h2 className="text-xl font-semibold">
                  {editingId
                    ? "Edit Hero Slide"
                    : "Add Hero Slide"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Configure your website hero section
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* IMAGE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image
                </label>

                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">

                  {imagePreview && (
                    <div className="mb-4">

                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />

                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm"
                  />

                  {editingId && (
                    <p className="text-xs text-gray-400 mt-2">
                      Leave empty to keep the existing image.
                    </p>
                  )}

                </div>

              </div>

              {/* TITLE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Fly to Your Dream Destinations"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Explore the world with trusted travel experiences"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/10 resize-none"
                />

              </div>

              {/* BUTTON */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>

                  <input
                    type="text"
                    name="button_text"
                    value={form.button_text}
                    onChange={handleChange}
                    placeholder="Explore Now"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Link
                  </label>

                  <input
                    type="text"
                    name="button_link"
                    value={form.button_link}
                    onChange={handleChange}
                    placeholder="/packages"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
                  />

                </div>

              </div>

              {/* ORDER + STATUS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>

                  <input
                    type="number"
                    name="sort_order"
                    value={form.sort_order}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>

                  <select
                    name="is_active"
                    value={form.is_active}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
                  >
                    <option value={1}>
                      Active
                    </option>

                    <option value={0}>
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-3 pt-4 border-t">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-5 py-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Slide"
                    : "Create Slide"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Hero;