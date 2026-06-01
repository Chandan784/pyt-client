"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PackageFormModal({
  openModal,
  setOpenModal,
  editingId,
  destinationId,
  formData,
  setFormData,
  fetchPackages,
  resetForm,
}) {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  // LOCK SCROLL
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  // AUTO SLUG
  useEffect(() => {
    const slug = formData.title
      ?.toLowerCase()
      ?.replace(/[^a-z0-9 ]/g, "")
      ?.replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      slug,
    }));
  }, [formData.title]);

  // PREVIEW
  useEffect(() => {
    if (formData.thumbnail) {
      setPreview(formData.thumbnail);
    }
  }, [formData.thumbnail]);

  // CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const form = new FormData();

      form.append("destination_id", destinationId);
      form.append("packageId", formData.packageId);
      form.append("title", formData.title);
      form.append("slug", formData.slug);
      form.append("duration", formData.duration);
      form.append("ratings", formData.ratings);
      form.append("featured", formData.featured);
      form.append("status", formData.status);
      form.append("createdAt", formData.createdAt);

      form.append(
        "price",
        JSON.stringify({
          startingFrom: formData.startingFrom,
          originalPrice: formData.originalPrice,
          currency: formData.currency,
          per: formData.per,
        }),
      );

      if (image) {
        form.append("thumbnail", image);
      }

      // UPDATE
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/packages/${editingId}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      // CREATE
      else {
        await axios.post("http://localhost:5000/api/packages", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchPackages();

      setOpenModal(false);

      resetForm();

      setImage(null);

      setPreview("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-5xl bg-white rounded-[36px] shadow-2xl overflow-hidden my-10">
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-20 border-b border-gray-100">
          <div className="px-6 md:px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                {editingId ? "Edit Package" : "Add Package"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Create professional package
              </p>
            </div>

            <button
              onClick={() => {
                setOpenModal(false);
                resetForm();
              }}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-2xl font-bold transition-all duration-300"
            >
              ×
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="max-h-[85vh] overflow-y-auto px-6 md:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* TOP CARD */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[30px] p-6 border border-blue-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* IMAGE */}
                <div>
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-32 h-28 rounded-3xl object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-28 rounded-3xl bg-white border border-dashed border-gray-300 flex items-center justify-center text-4xl">
                      ✈️
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black text-gray-900">
                    {formData.title || "Travel Package"}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {formData.duration || "Package Duration"}
                  </p>
                </div>
              </div>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Package ID"
                name="packageId"
                value={formData.packageId}
                onChange={handleChange}
              />

              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              <Input label="Slug" name="slug" value={formData.slug} readOnly />

              <Input
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />

              <Input
                label="Ratings"
                name="ratings"
                value={formData.ratings}
                onChange={handleChange}
              />

              <Input
                label="Starting Price"
                name="startingFrom"
                value={formData.startingFrom}
                onChange={handleChange}
              />

              <Input
                label="Original Price"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
              />

              <Input
                label="Currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              />

              <Input
                label="Per Text"
                name="per"
                value={formData.per}
                onChange={handleChange}
              />

              {/* STATUS */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none"
                >
                  <option value="active">Active</option>

                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Package Thumbnail
              </label>

              <div className="border-2 border-dashed border-gray-200 rounded-[30px] p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="w-full rounded-2xl border border-gray-300 bg-white p-4"
                    />
                  </div>

                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-40 h-28 rounded-2xl object-cover border-4 border-white shadow-xl"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* FEATURED */}
            <div className="bg-gray-50 rounded-[30px] border border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black text-gray-900">
                  Featured Package
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Show in homepage section
                </p>
              </div>

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-6 h-6"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                type="button"
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
                className="flex-1 h-14 rounded-2xl bg-gray-200 font-bold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg"
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Creating..."
                  : editingId
                    ? "Update Package"
                    : "Create Package"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, readOnly = false }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none"
      />
    </div>
  );
}
