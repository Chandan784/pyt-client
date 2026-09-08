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
  // ======================================================
  // PARAMS
  // ======================================================

  const params = useParams();
  const packageId = params?.packageId;

  // ======================================================
  // STATES
  // ======================================================

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [detailsId, setDetailsId] = useState(null);

  const [packageInfo, setPackageInfo] = useState(null);

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

  // ======================================================
  // DEFAULT OBJECTS
  // ======================================================

  const createDefaultItinerary = () => ({
    day: "",
    title: "",
    stay: "",
    meals: "",
    description: "",
    highlights: [""],
  });

  const createDefaultSection = () => ({
    title: "",
    points: [""],
  });

  // ======================================================
  // FETCH DATA
  // ======================================================

  useEffect(() => {
    if (packageId) {
      fetchPackageDetails();
    }
  }, [packageId]);

  const fetchPackageDetails = async () => {
    try {
      setFetchLoading(true);

      const res = await axios.get(
        `https://api.primevistajourney.com/api/package-details/${packageId}`
      );

      console.log("FULL API RESPONSE =>", res.data);

      // IMPORTANT:
      // API response is:
      //
      // {
      //   success: true,
      //   data: {
      //      id: 21,
      //      package_id: 15,
      //      ...
      //   }
      // }

      const data = res.data?.data;

      if (!data) {
        throw new Error("Package details not found");
      }

      console.log("PACKAGE DETAILS =>", data);

      // Save details ID
      setDetailsId(data.id);

      // Save package information for sidebar/header
      setPackageInfo(data);

      // Set form data
      setFormData({
        package_id: data.package_id || packageId || "",

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
          Array.isArray(data.tags) && data.tags.length > 0
            ? data.tags
            : [""],

        itinerary:
          Array.isArray(data.itinerary) && data.itinerary.length > 0
            ? data.itinerary.map((item) => ({
                day: item.day || "",
                title: item.title || "",
                stay: item.stay || "",
                meals: item.meals || "",
                description: item.description || "",

                highlights:
                  Array.isArray(item.highlights) &&
                  item.highlights.length > 0
                    ? item.highlights
                    : [""],
              }))
            : [createDefaultItinerary()],

        keyInfo:
          Array.isArray(data.keyInfo) && data.keyInfo.length > 0
            ? data.keyInfo.map((item) => ({
                title: item.title || "",

                points:
                  Array.isArray(item.points) && item.points.length > 0
                    ? item.points
                    : [""],
              }))
            : [createDefaultSection()],

        termsAndConditions:
          Array.isArray(data.termsAndConditions) &&
          data.termsAndConditions.length > 0
            ? data.termsAndConditions.map((item) => ({
                title: item.title || "",

                points:
                  Array.isArray(item.points) && item.points.length > 0
                    ? item.points
                    : [""],
              }))
            : [createDefaultSection()],
      });
    } catch (error) {
      console.error("FETCH PACKAGE DETAILS ERROR =>", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to load package details");
      }
    } finally {
      setFetchLoading(false);
    }
  };

  // ======================================================
  // BASIC INPUT
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // SIMPLE ARRAY
  // ======================================================

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated[index] = value;

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const addField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (field, index) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated.splice(index, 1);

      // Always keep one input
      if (updated.length === 0) {
        updated.push("");
      }

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  // ======================================================
  // ITINERARY
  // ======================================================

  const handleItinerary = (index, key, value) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return {
        ...prev,
        itinerary: updated,
      };
    });
  };

  const addItinerary = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        createDefaultItinerary(),
      ],
    }));
  };

  const removeItinerary = (index) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];

      updated.splice(index, 1);

      if (updated.length === 0) {
        updated.push(createDefaultItinerary());
      }

      return {
        ...prev,
        itinerary: updated,
      };
    });
  };

  // ======================================================
  // DAY HIGHLIGHTS
  // ======================================================

  const handleHighlightChange = (
    itineraryIndex,
    highlightIndex,
    value
  ) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];

      updated[itineraryIndex] = {
        ...updated[itineraryIndex],
        highlights: [...updated[itineraryIndex].highlights],
      };

      updated[itineraryIndex].highlights[highlightIndex] = value;

      return {
        ...prev,
        itinerary: updated,
      };
    });
  };

  const addHighlight = (itineraryIndex) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];

      updated[itineraryIndex] = {
        ...updated[itineraryIndex],
        highlights: [
          ...updated[itineraryIndex].highlights,
          "",
        ],
      };

      return {
        ...prev,
        itinerary: updated,
      };
    });
  };

  const removeHighlight = (
    itineraryIndex,
    highlightIndex
  ) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];

      const highlights = [
        ...updated[itineraryIndex].highlights,
      ];

      highlights.splice(highlightIndex, 1);

      updated[itineraryIndex] = {
        ...updated[itineraryIndex],
        highlights:
          highlights.length > 0 ? highlights : [""],
      };

      return {
        ...prev,
        itinerary: updated,
      };
    });
  };

  // ======================================================
  // KEY INFO + TERMS
  // ======================================================

  const handleObjectSectionChange = (
    field,
    index,
    key,
    value
  ) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const addObjectSection = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        createDefaultSection(),
      ],
    }));
  };

  const removeObjectSection = (field, index) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated.splice(index, 1);

      if (updated.length === 0) {
        updated.push(createDefaultSection());
      }

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  // ======================================================
  // POINTS
  // ======================================================

  const handlePointChange = (
    field,
    sectionIndex,
    pointIndex,
    value
  ) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated[sectionIndex] = {
        ...updated[sectionIndex],
        points: [...updated[sectionIndex].points],
      };

      updated[sectionIndex].points[pointIndex] = value;

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const addPoint = (field, sectionIndex) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated[sectionIndex] = {
        ...updated[sectionIndex],
        points: [
          ...updated[sectionIndex].points,
          "",
        ],
      };

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const removePoint = (
    field,
    sectionIndex,
    pointIndex
  ) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      const points = [
        ...updated[sectionIndex].points,
      ];

      points.splice(pointIndex, 1);

      updated[sectionIndex] = {
        ...updated[sectionIndex],
        points: points.length > 0 ? points : [""],
      };

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  // ======================================================
  // SAVE
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        package_id: packageId,
      };

      console.log("SAVE PAYLOAD =>", payload);

      // ==================================================
      // CREATE
      // ==================================================

      if (!detailsId) {
        const res = await axios.post(
          "https://api.primevistajourney.com/api/package-details",
          payload
        );

        console.log("CREATE RESPONSE =>", res.data);

        const newId =
          res.data?.data?.id ||
          res.data?.id;

        if (newId) {
          setDetailsId(newId);
        }

        alert("Package Details Added Successfully");

        return;
      }

      // ==================================================
      // UPDATE
      // ==================================================

      const res = await axios.put(
        `https://api.primevistajourney.com/api/package-details/${detailsId}`,
        payload
      );

      console.log("UPDATE RESPONSE =>", res.data);

      alert("Package Details Updated Successfully");
    } catch (error) {
      console.error("SAVE PACKAGE DETAILS ERROR =>", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong while saving");
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async () => {
    if (!detailsId) {
      alert("Package details do not exist");
      return;
    }

    const confirmDelete = window.confirm(
      "Delete package details permanently?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axios.delete(
        `https://api.primevistajourney.com/api/package-details/${detailsId}`
      );

      alert("Package Details Deleted Successfully");

      // Reset form
      setDetailsId(null);

      setFormData({
        package_id: packageId || "",
        overview: "",
        inclusions: [""],
        exclusions: [""],
        highlights: [""],
        citiesCovered: [""],
        tags: [""],
        itinerary: [createDefaultItinerary()],
        keyInfo: [createDefaultSection()],
        termsAndConditions: [createDefaultSection()],
      });
    } catch (error) {
      console.error("DELETE ERROR =>", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to delete package details");
      }
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-5">
        <div className="bg-white p-10 rounded-[30px] shadow-lg flex items-center gap-4">
          <Loader2 className="animate-spin w-8 h-8 text-blue-600" />

          <h2 className="text-2xl font-black text-gray-700">
            Loading Package Details...
          </h2>
        </div>
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_340px] gap-6"
      >
        {/* ==================================================
            LEFT
        ================================================== */}

        <div className="space-y-6">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-[35px] p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              {packageInfo?.thumbnail && (
                <img
                  src={packageInfo.thumbnail}
                  alt={packageInfo.title || "Package"}
                  className="w-28 h-28 rounded-3xl object-cover border border-white/20"
                />
              )}

              <div>
                <p className="text-blue-400 font-bold uppercase tracking-wider text-sm">
                  Package Management
                </p>

                <h1 className="text-3xl md:text-4xl font-black mt-2">
                  {packageInfo?.title ||
                    "Package Management"}
                </h1>

                <div className="flex flex-wrap gap-3 mt-4 text-sm">
                  {packageInfo?.duration && (
                    <span className="bg-white/10 px-4 py-2 rounded-xl">
                      {packageInfo.duration}
                    </span>
                  )}

                  {packageInfo?.ratings && (
                    <span className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-1">
                      <Star
                        size={15}
                        fill="currentColor"
                      />
                      {packageInfo.ratings}
                    </span>
                  )}

                  {packageInfo?.citiesCovered?.length > 0 && (
                    <span className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-1">
                      <MapPin size={15} />
                      {packageInfo.citiesCovered.join(
                        ", "
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* OVERVIEW */}

          <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black mb-6">
              Package Overview
            </h2>

            <textarea
              rows={8}
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Enter package overview..."
              className="w-full rounded-3xl border border-gray-200 p-5 text-lg outline-none focus:ring-4 focus:ring-blue-100 resize-y"
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

                    <h2 className="text-3xl font-black">
                      {section.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addField(section.field)
                    }
                    className="h-12 px-5 rounded-2xl bg-black text-white font-bold flex items-center gap-2 hover:bg-gray-800"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {formData[section.field].map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleArrayChange(
                              section.field,
                              index,
                              e.target.value
                            )
                          }
                          placeholder={`Enter ${section.title.toLowerCase()}...`}
                          className="flex-1 h-14 rounded-2xl border border-gray-200 px-5 text-lg outline-none focus:ring-4 focus:ring-blue-100"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeField(
                              section.field,
                              index
                            )
                          }
                          className="w-14 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center hover:bg-red-200 transition"
                        >
                          <X className="text-red-600 w-5 h-5" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}

          {/* ==================================================
              ITINERARY
          ================================================== */}

          <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-black">
                Day Wise Itinerary
              </h2>

              <button
                type="button"
                onClick={addItinerary}
                className="h-12 px-6 rounded-2xl bg-blue-600 text-white font-bold flex items-center gap-2 hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Day
              </button>
            </div>

            <div className="space-y-6">
              {formData.itinerary.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-[#f8fafc] border border-gray-200 rounded-[30px] p-6"
                  >
                    <div className="flex justify-between items-center mb-6 gap-4">
                      <h3 className="text-2xl font-black text-gray-800">
                        {item.day ||
                          `Day ${index + 1}`}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          removeItinerary(index)
                        }
                        className="h-11 px-5 rounded-2xl bg-red-100 border border-red-200 text-red-600 font-bold flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>

                    {/* DAY BASIC INFO */}

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Day"
                        value={item.day}
                        onChange={(e) =>
                          handleItinerary(
                            index,
                            "day",
                            e.target.value
                          )
                        }
                        className="h-14 rounded-2xl border px-5 outline-none focus:ring-4 focus:ring-blue-100"
                      />

                      <input
                        type="text"
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) =>
                          handleItinerary(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="h-14 rounded-2xl border px-5 outline-none focus:ring-4 focus:ring-blue-100"
                      />

                      <input
                        type="text"
                        placeholder="Stay"
                        value={item.stay}
                        onChange={(e) =>
                          handleItinerary(
                            index,
                            "stay",
                            e.target.value
                          )
                        }
                        className="h-14 rounded-2xl border px-5 outline-none focus:ring-4 focus:ring-blue-100"
                      />

                      <input
                        type="text"
                        placeholder="Meals"
                        value={item.meals}
                        onChange={(e) =>
                          handleItinerary(
                            index,
                            "meals",
                            e.target.value
                          )
                        }
                        className="h-14 rounded-2xl border px-5 outline-none focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    {/* DESCRIPTION */}

                    <textarea
                      rows={6}
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        handleItinerary(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full rounded-2xl border p-5 mb-5 outline-none focus:ring-4 focus:ring-blue-100 resize-y"
                    />

                    {/* DAY HIGHLIGHTS */}

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-black">
                          Highlights
                        </h4>

                        <button
                          type="button"
                          onClick={() =>
                            addHighlight(index)
                          }
                          className="h-10 px-4 rounded-xl bg-black text-white flex items-center gap-2"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      </div>

                      <div className="space-y-3">
                        {item.highlights.map(
                          (
                            highlight,
                            highlightIndex
                          ) => (
                            <div
                              key={highlightIndex}
                              className="flex gap-3"
                            >
                              <input
                                type="text"
                                value={highlight}
                                onChange={(e) =>
                                  handleHighlightChange(
                                    index,
                                    highlightIndex,
                                    e.target.value
                                  )
                                }
                                placeholder="Day highlight"
                                className="flex-1 h-12 rounded-2xl border px-5 outline-none focus:ring-4 focus:ring-blue-100"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeHighlight(
                                    index,
                                    highlightIndex
                                  )
                                }
                                className="w-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center"
                              >
                                <X className="text-red-600 w-5 h-5" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ==================================================
              KEY INFO + TERMS
          ================================================== */}

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
              <div className="flex justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-black">
                  {section.title}
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    addObjectSection(
                      section.field
                    )
                  }
                  className="h-12 px-5 rounded-2xl bg-black text-white font-bold flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Section
                </button>
              </div>

              <div className="space-y-6">
                {formData[section.field].map(
                  (item, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="bg-[#f8fafc] border border-gray-200 rounded-[30px] p-6"
                    >
                      <div className="flex justify-between items-center mb-5 gap-4">
                        <h3 className="text-2xl font-black">
                          Section{" "}
                          {sectionIndex + 1}
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            removeObjectSection(
                              section.field,
                              sectionIndex
                            )
                          }
                          className="h-10 px-4 rounded-xl bg-red-100 border border-red-200 text-red-600 font-bold flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>

                      {/* SECTION TITLE */}

                      <input
                        type="text"
                        placeholder="Section Title"
                        value={item.title}
                        onChange={(e) =>
                          handleObjectSectionChange(
                            section.field,
                            sectionIndex,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full h-14 rounded-2xl border px-5 mb-5 outline-none focus:ring-4 focus:ring-blue-100"
                      />

                      {/* POINTS */}

                      <div className="space-y-3">
                        {item.points.map(
                          (
                            point,
                            pointIndex
                          ) => (
                            <div
                              key={pointIndex}
                              className="flex gap-3"
                            >
                              <input
                                type="text"
                                value={point}
                                onChange={(e) =>
                                  handlePointChange(
                                    section.field,
                                    sectionIndex,
                                    pointIndex,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter point..."
                                className="flex-1 h-12 rounded-2xl border px-5 outline-none focus:ring-4 focus:ring-blue-100"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removePoint(
                                    section.field,
                                    sectionIndex,
                                    pointIndex
                                  )
                                }
                                className="w-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center"
                              >
                                <X className="text-red-600 w-5 h-5" />
                              </button>
                            </div>
                          )
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addPoint(
                            section.field,
                            sectionIndex
                          )
                        }
                        className="mt-4 h-11 px-5 rounded-2xl bg-blue-600 text-white font-bold flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Point
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================
            RIGHT SIDEBAR
        ================================================== */}

        <div className="sticky top-5 h-fit">
          <div className="bg-white rounded-[35px] p-6 shadow-sm border border-gray-100">

            <h2 className="text-2xl font-black mb-6">
              Actions
            </h2>

            {/* PACKAGE SUMMARY */}

            {packageInfo && (
              <div className="border border-gray-100 rounded-3xl p-4 mb-5 bg-gray-50">
                <p className="text-xs uppercase font-bold text-gray-400">
                  Package
                </p>

                <p className="font-black text-gray-800 mt-1">
                  {packageInfo.title}
                </p>

                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      Starting From
                    </p>

                    <p className="font-black text-green-600">
                      ₹
                      {Number(
                        packageInfo.startingFrom || 0
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Original
                    </p>

                    <p className="font-bold text-gray-500 line-through">
                      ₹
                      {Number(
                        packageInfo.originalPrice || 0
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-400">
                    Duration
                  </p>

                  <p className="font-bold">
                    {packageInfo.duration || "-"}
                  </p>
                </div>
              </div>
            )}

            {/* SAVE */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-14 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
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

            {/* DELETE */}

            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || !detailsId}
              className={`w-full h-14 rounded-2xl text-white font-black text-lg mt-4 flex items-center justify-center gap-3 ${
                loading || !detailsId
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
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