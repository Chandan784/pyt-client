"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import {
  Plus,
  Trash2,
  X,
  Save,
  Loader2,
  MapPin,
  Tags,
  Shield,
  Star,
} from "lucide-react";

export default function PackageDetailsPage() {
  // ================= ROUTER =================
  const router = useRouter();

  // ================= PARAMS =================
  const params = useParams();

  const packageId = params?.packageId;

  const [loading, setLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(true);

  const [detailsId, setDetailsId] = useState(null);

  const [formData, setFormData] = useState({
    package_id: "",

    overview: "",

    inclusions: [""],

    exclusions: [""],

    highlights: [""],

    citiesCovered: [""],

    tags: [""],

    itinerary: [
      {
        day: "",
        title: "",
        stay: "",
        meals: "",
        description: "",
        highlights: [""],
      },
    ],

    keyInfo: [
      {
        title: "",
        points: [""],
      },
    ],

    termsAndConditions: [
      {
        title: "",
        points: [""],
      },
    ],
  });

  /* ======================================================
      FETCH DATA
  ====================================================== */

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(
        `https://api.primevistajourney.com/api/package-details/${packageId}`,
      );

      const data = res.data;

      console.log("API DATA => ", data);

      setDetailsId(data.id);

      setFormData({
        package_id: data.package_id || "",

        overview: data.overview || "",

        inclusions:
          Array.isArray(data.inclusions) && data.inclusions.length > 0
            ? data.inclusions
            : [""],

        exclusions:
          Array.isArray(data.exclusions) && data.exclusions.length > 0
            ? data.exclusions
            : [""],

        highlights:
          Array.isArray(data.highlights) && data.highlights.length > 0
            ? data.highlights
            : [""],

        citiesCovered:
          Array.isArray(data.citiesCovered) && data.citiesCovered.length > 0
            ? data.citiesCovered
            : [""],

        tags:
          Array.isArray(data.tags) && data.tags.length > 0 ? data.tags : [""],

        itinerary:
          Array.isArray(data.itinerary) && data.itinerary.length > 0
            ? data.itinerary
            : [
                {
                  day: "",
                  title: "",
                  stay: "",
                  meals: "",
                  description: "",
                  highlights: [""],
                },
              ],

        keyInfo:
          Array.isArray(data.keyInfo) && data.keyInfo.length > 0
            ? data.keyInfo
            : [
                {
                  title: "",
                  points: [""],
                },
              ],

        termsAndConditions:
          Array.isArray(data.termsAndConditions) &&
          data.termsAndConditions.length > 0
            ? data.termsAndConditions
            : [
                {
                  title: "",
                  points: [""],
                },
              ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  /* ======================================================
      BASIC INPUT
  ====================================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ======================================================
      SIMPLE ARRAY
  ====================================================== */

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];

    updated[index] = value;

    setFormData({
      ...formData,
      [field]: updated,
    });
  };

  const addField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeField = (field, index) => {
    const updated = [...formData[field]];

    updated.splice(index, 1);

    setFormData({
      ...formData,
      [field]: updated,
    });
  };

  /* ======================================================
      ITINERARY
  ====================================================== */

  const handleItinerary = (index, key, value) => {
    const updated = [...formData.itinerary];

    updated[index][key] = value;

    setFormData({
      ...formData,
      itinerary: updated,
    });
  };

  const addItinerary = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        {
          day: "",
          title: "",
          stay: "",
          meals: "",
          description: "",
          highlights: [""],
        },
      ],
    });
  };

  const removeItinerary = (index) => {
    const updated = [...formData.itinerary];

    updated.splice(index, 1);

    setFormData({
      ...formData,
      itinerary: updated,
    });
  };

  /* ======================================================
      DAY HIGHLIGHTS
  ====================================================== */

  const handleHighlightChange = (itineraryIndex, highlightIndex, value) => {
    const updated = [...formData.itinerary];

    updated[itineraryIndex].highlights[highlightIndex] = value;

    setFormData({
      ...formData,
      itinerary: updated,
    });
  };

  const addHighlight = (itineraryIndex) => {
    const updated = [...formData.itinerary];

    updated[itineraryIndex].highlights.push("");

    setFormData({
      ...formData,
      itinerary: updated,
    });
  };

  const removeHighlight = (itineraryIndex, highlightIndex) => {
    const updated = [...formData.itinerary];

    updated[itineraryIndex].highlights.splice(highlightIndex, 1);

    setFormData({
      ...formData,
      itinerary: updated,
    });
  };

  /* ======================================================
      KEY INFO + TERMS
  ====================================================== */

  const handleObjectSectionChange = (field, index, key, value) => {
    const updated = [...formData[field]];

    updated[index][key] = value;

    setFormData({
      ...formData,
      [field]: updated,
    });
  };

  const addObjectSection = (field) => {
    setFormData({
      ...formData,
      [field]: [
        ...formData[field],
        {
          title: "",
          points: [""],
        },
      ],
    });
  };

  const removeObjectSection = (field, index) => {
    const updated = [...formData[field]];

    updated.splice(index, 1);

    setFormData({
      ...formData,
      [field]: updated,
    });
  };

  /* ======================================================
      POINTS
  ====================================================== */

  const handlePointChange = (field, sectionIndex, pointIndex, value) => {
    const updated = [...formData[field]];

    updated[sectionIndex].points[pointIndex] = value;

    setFormData({
      ...formData,
      [field]: updated,
    });
  };

  const addPoint = (field, sectionIndex) => {
    const updated = [...formData[field]];

    updated[sectionIndex].points.push("");

    setFormData({
      ...formData,
      [field]: updated,
    });
  };

  const removePoint = (field, sectionIndex, pointIndex) => {
    const updated = [...formData[field]];

    updated[sectionIndex].points.splice(pointIndex, 1);

    setFormData({
      ...formData,
      [field]: updated,
    });
  };

  /* ======================================================
      SAVE
  ====================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `https://api.primevistajourney.com/api/package-details/${packageId}`,
        formData,
      );

      alert("Updated Successfully");
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
      DELETE
  ====================================================== */

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete package details permanently?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://api.primevistajourney.com/api/package-details/${packageId}`,
      );

      alert("Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  /* ======================================================
      LOADING
  ====================================================== */

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="bg-white p-10 rounded-[30px] shadow-lg flex items-center gap-4">
          <Loader2 className="animate-spin w-8 h-8 text-blue-600" />

          <h2 className="text-2xl font-black text-gray-700">
            Loading Package Details...
          </h2>
        </div>
      </div>
    );
  }

  /* ======================================================
      UI
  ====================================================== */

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_340px] gap-6"
      >
        {/* LEFT */}

        <div className="space-y-6">
          {/* HEADER */}

          <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-[35px] p-8 shadow-xl">
            <h1 className="text-4xl font-black">Package Management</h1>

            <p className="text-gray-300 mt-3 text-lg">
              Edit and manage package details professionally
            </p>
          </div>

          {/* OVERVIEW */}

          <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black mb-6">Package Overview</h2>

            <textarea
              rows={8}
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              className="w-full rounded-3xl border border-gray-200 p-5 text-lg outline-none focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* SIMPLE ARRAYS */}

          {[
            {
              field: "inclusions",
              title: "Inclusions",
              icon: Shield,
            },

            {
              field: "exclusions",
              title: "Exclusions",
              icon: X,
            },

            {
              field: "highlights",
              title: "Highlights",
              icon: Star,
            },

            {
              field: "citiesCovered",
              title: "Cities Covered",
              icon: MapPin,
            },

            {
              field: "tags",
              title: "Tags",
              icon: Tags,
            },
          ].map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.field}
                className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Icon className="w-7 h-7 text-blue-600" />

                    <h2 className="text-3xl font-black">{section.title}</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => addField(section.field)}
                    className="h-12 px-5 rounded-2xl bg-black text-white font-bold flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {formData[section.field].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            section.field,
                            index,
                            e.target.value,
                          )
                        }
                        className="flex-1 h-14 rounded-2xl border border-gray-200 px-5 text-lg"
                      />

                      <button
                        type="button"
                        onClick={() => removeField(section.field, index)}
                        className="w-14 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center hover:bg-red-200 transition"
                      >
                        <X className="text-red-600 w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* ITINERARY */}

          <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black">Day Wise Itinerary</h2>

              <button
                type="button"
                onClick={addItinerary}
                className="h-12 px-6 rounded-2xl bg-blue-600 text-white font-bold flex items-center gap-2"
              >
                <Plus size={18} />
                Add Day
              </button>
            </div>

            <div className="space-y-6">
              {formData.itinerary.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f8fafc] border border-gray-200 rounded-[30px] p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black text-gray-800">
                      {item.day || `Day ${index + 1}`}
                    </h3>

                    <button
                      type="button"
                      onClick={() => removeItinerary(index)}
                      className="h-11 px-5 rounded-2xl bg-red-100 border border-red-200 text-red-600 font-bold flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Day"
                      value={item.day}
                      onChange={(e) =>
                        handleItinerary(index, "day", e.target.value)
                      }
                      className="h-14 rounded-2xl border px-5"
                    />

                    <input
                      type="text"
                      placeholder="Title"
                      value={item.title}
                      onChange={(e) =>
                        handleItinerary(index, "title", e.target.value)
                      }
                      className="h-14 rounded-2xl border px-5"
                    />

                    <input
                      type="text"
                      placeholder="Stay"
                      value={item.stay}
                      onChange={(e) =>
                        handleItinerary(index, "stay", e.target.value)
                      }
                      className="h-14 rounded-2xl border px-5"
                    />

                    <input
                      type="text"
                      placeholder="Meals"
                      value={item.meals}
                      onChange={(e) =>
                        handleItinerary(index, "meals", e.target.value)
                      }
                      className="h-14 rounded-2xl border px-5"
                    />
                  </div>

                  <textarea
                    rows={5}
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      handleItinerary(index, "description", e.target.value)
                    }
                    className="w-full rounded-2xl border p-5 mb-5"
                  />

                  {/* DAY HIGHLIGHTS */}

                  <div>
                    <div className="flex justify-between mb-4">
                      <h4 className="text-xl font-black">Highlights</h4>

                      <button
                        type="button"
                        onClick={() => addHighlight(index)}
                        className="h-10 px-4 rounded-xl bg-black text-white flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex gap-3">
                          <input
                            type="text"
                            value={highlight}
                            onChange={(e) =>
                              handleHighlightChange(
                                index,
                                highlightIndex,
                                e.target.value,
                              )
                            }
                            className="flex-1 h-12 rounded-2xl border px-5"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeHighlight(index, highlightIndex)
                            }
                            className="w-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center"
                          >
                            <X className="text-red-600 w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KEY INFO + TERMS */}

          {[
            {
              field: "keyInfo",
              title: "Key Information",
            },

            {
              field: "termsAndConditions",
              title: "Terms & Conditions",
            },
          ].map((section) => (
            <div
              key={section.field}
              className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-black">{section.title}</h2>

                <button
                  type="button"
                  onClick={() => addObjectSection(section.field)}
                  className="h-12 px-5 rounded-2xl bg-black text-white font-bold flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Section
                </button>
              </div>

              <div className="space-y-6">
                {formData[section.field].map((item, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="bg-[#f8fafc] border rounded-[30px] p-6"
                  >
                    <div className="flex justify-between mb-5">
                      <h3 className="text-2xl font-black">
                        Section {sectionIndex + 1}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          removeObjectSection(section.field, sectionIndex)
                        }
                        className="h-10 px-4 rounded-xl bg-red-100 border border-red-200 text-blue-600 font-bold flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Section Title"
                      value={item.title}
                      onChange={(e) =>
                        handleObjectSectionChange(
                          section.field,
                          sectionIndex,
                          "title",
                          e.target.value,
                        )
                      }
                      className="w-full h-14 rounded-2xl border px-5 mb-5"
                    />

                    <div className="space-y-3">
                      {item.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex gap-3">
                          <input
                            type="text"
                            value={point}
                            onChange={(e) =>
                              handlePointChange(
                                section.field,
                                sectionIndex,
                                pointIndex,
                                e.target.value,
                              )
                            }
                            className="flex-1 h-12 rounded-2xl border px-5"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removePoint(
                                section.field,
                                sectionIndex,
                                pointIndex,
                              )
                            }
                            className="w-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center"
                          >
                            <X className="text-red-600 w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addPoint(section.field, sectionIndex)}
                      className="mt-4 h-11 px-5 rounded-2xl bg-blue-600 text-white font-bold flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Point
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="sticky top-5 h-fit">
          <div className="bg-white rounded-[35px] p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black mb-6">Actions</h2>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-14 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 ${
                loading ? "bg-gray-400" : "bg-black hover:opacity-90"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full h-14 rounded-2xl bg-red-500 text-white font-black text-lg mt-4 flex items-center justify-center gap-3"
            >
              <Trash2 size={20} />
              Delete Package
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
