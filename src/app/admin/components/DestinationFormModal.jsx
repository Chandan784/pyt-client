"use client";

import React, { useEffect, useRef } from "react";

export default function DestinationFormModal({
  openForm,
  setOpenForm,
  editingId,
  formData,
  handleChange,
  handleState,
  handleSubmit,
  loading,
  preview,
  handleImage,
  resetForm,
}) {
  const fileRef = useRef(null);

  // LOCK BODY SCROLL
  useEffect(() => {
    if (openForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openForm]);

  const closeModal = () => {
    setOpenForm(false);
    resetForm();
  };

  if (!openForm) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* CONTAINER */}
      <div className="min-h-screen px-3 py-6 flex justify-center items-start">
        {/* MODAL */}
        <div className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.25)] animate-modal overflow-hidden">
          {/* HEADER */}
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-5 md:px-8 py-5 rounded-t-[32px]">
            <div className="flex items-center justify-between gap-4">
              {/* TITLE */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                  {editingId ? "Edit Destination" : "Add Destination"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Create professional travel destination details
                </p>
              </div>

              {/* CLOSE */}
              <button
                onClick={closeModal}
                className="w-11 h-11 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-700 flex items-center justify-center text-2xl font-semibold transition-all duration-300 hover:rotate-90"
              >
                ×
              </button>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="px-5 md:px-8 py-6 space-y-7">
            {/* HERO CARD */}
            <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-white rounded-full"></div>
              </div>

              <div className="relative flex flex-col md:flex-row items-center gap-5">
                {/* IMAGE */}
                <div className="shrink-0">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-24 h-24 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl border border-white/20">
                      🌍
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black">
                    {formData.state || "Destination Name"}
                  </h3>

                  <p className="text-white/80 mt-1">
                    {formData.country || "Country"}
                  </p>

                  <div className="mt-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-medium backdrop-blur-md">
                      /{formData.slug || "destination-slug"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="bg-white border border-gray-100 rounded-[30px] p-5 md:p-7 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-800">
                  Basic Information
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Fill destination details carefully
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* TYPE */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Destination Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  >
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </div>

                {/* COUNTRY */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country name"
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>

                {/* DESTINATION */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Destination Name
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleState}
                    placeholder="Enter destination"
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>

                {/* SLUG */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    URL Slug
                  </label>

                  <input
                    type="text"
                    value={formData.slug}
                    readOnly
                    className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-100 px-5 text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* IMAGE SECTION */}
            <div className="bg-white border border-gray-100 rounded-[30px] p-5 md:p-7 shadow-sm">
              <div className="mb-5">
                <h3 className="text-xl font-black text-gray-800">
                  Banner Image
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Upload high quality travel image
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-[28px] bg-gray-50 transition-all duration-300 p-6">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* INPUT */}
                  <div className="flex-1 w-full">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-sm"
                    />

                    <p className="text-xs text-gray-400 mt-3">
                      Recommended Size: 1200 × 600 px
                    </p>
                  </div>

                  {/* PREVIEW */}
                  {preview && (
                    <div className="shrink-0">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-36 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white border border-gray-100 rounded-[30px] p-5 md:p-7 shadow-sm">
              <div className="mb-5">
                <h3 className="text-xl font-black text-gray-800">
                  Description
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Write attractive travel destination description
                </p>
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                placeholder="Write destination description..."
                className="w-full rounded-[28px] border border-gray-200 bg-gray-50 p-5 leading-8 resize-none outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              ></textarea>
            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl pt-4 pb-2">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* CANCEL */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 h-14 rounded-2xl border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all duration-300"
                >
                  Cancel
                </button>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 h-14 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:scale-[1.01]"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                      <span>{editingId ? "Updating..." : "Uploading..."}</span>
                    </>
                  ) : (
                    <span>
                      {editingId ? "Update Destination" : "Add Destination"}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* STYLE */}
      <style jsx>{`
        @keyframes modal {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        .animate-modal {
          animation: modal 0.3s ease;
        }
      `}</style>
    </div>
  );
}
