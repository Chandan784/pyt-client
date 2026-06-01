"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import DayWiseItinerary from "@/app/components/DayWiseIntinary";

export default function TourDetails() {
  const params = useParams();
  const { packageId } = params;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleQuoteChange = (e) => {
    setQuoteForm({
      ...quoteForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppSubmit = () => {
    let newErrors = {};

    // NAME VALIDATION
    if (!quoteForm.name.trim()) {
      newErrors.name = "Name is required";
    }

    // EMAIL VALIDATION
    if (!quoteForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(quoteForm.email)
    ) {
      newErrors.email = "Invalid email";
    }

    // PHONE VALIDATION
    if (!quoteForm.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(quoteForm.phone)) {
      newErrors.phone = "Enter valid 10 digit phone number";
    }

    setErrors(newErrors);

    // STOP IF ERRORS
    if (Object.keys(newErrors).length > 0) return;

    // WHATSAPP MESSAGE
    const message = `
Hello Prime Vista Journey,

I want a free quote.

Name: ${quoteForm.name}
Email: ${quoteForm.email}
Phone: ${quoteForm.phone}
`;

    // YOUR WHATSAPP NUMBER
    const whatsappNumber = "+918178420122";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };
  /* ================= FETCH API ================= */

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.primevistajourney.com/api/package-details/${packageId}`,
        );

        setTour(res.data);
      } catch (error) {
        console.log(error);
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) fetchTour();
  }, [packageId]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold">Package Not Found</h2>
      </div>
    );
  }

  /* ================= SAFE VALUES ================= */

  const starting = Number(tour.startingFrom || 0);
  const original = Number(tour.originalPrice || 0);
  const currency = tour.currency || "₹";
  const perText = tour.perText || "Per Person";

  const discount =
    original > starting
      ? Math.round(((original - starting) / original) * 100)
      : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src={tour.thumbnail}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          alt={tour.title}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-end">
          {/* MORE PADDING TOP + BOTTOM SPACE */}
          <div className="w-full px-6 md:px-16 py-20 md:py-28 text-white">
            {/* TITLE */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight m-10">
              {tour.title}
            </h1>

            {/* META (FIXED) */}
            <p className="text-white font-semibold  mt-6 text-sm md:text-base">
              <span className=" text-white font-bold  ">
                {tour.duration} Days
              </span>
              <span className="text-white"> • {tour.slug}</span>
            </p>

            {/* HIGHLIGHTS */}
            <div className="flex flex-wrap gap-2 mt-4 ">
              {(
                tour.highlights || [
                  "Best Scenic Views",
                  "Luxury Stay",
                  "Guided Tours",
                ]
              ).map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs md:text-sm bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* CITIES COVERED */}
            <div className="mt-10 text-sm text-white/80">
              <span className="font-semibold text-white">Cities Covered:</span>{" "}
              {(tour.cities || ["Bhubaneswar", "Puri", "Konark"]).join(" → ")}
            </div>

            {/* CTA BUTTON */}
            <div className="mt-4">
              <button
                onClick={handleWhatsAppSubmit}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold shadow-lg"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">
          {/* OVERVIEW */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-600">{tour.overview}</p>
          </div>

          {/* ITINERARY */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-5">Itinerary</h2>
            <DayWiseItinerary itinerary={tour.itinerary} />
          </div>

          {/* INCLUSIONS / EXCLUSIONS */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="text-green-600 font-bold mb-3">✔ Inclusions</h3>
              <ul className="space-y-2 text-gray-600">
                {tour.inclusions?.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="text-red-500 font-bold mb-3">✖ Exclusions</h3>
              <ul className="space-y-2 text-gray-600">
                {tour.exclusions?.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* TERMS & CONDITIONS */}
          {tour.termsAndConditions?.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow mt-6">
              <h2 className="text-2xl font-bold mb-5">Terms & Conditions</h2>

              {tour.termsAndConditions.map((section, i) => (
                <div key={i} className="mb-5">
                  <h3 className="font-bold mb-2">{section.title}</h3>

                  <ul className="list-disc ml-5 text-gray-600 space-y-1">
                    {section.points?.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* KEY INFO */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-5">Key Information</h2>

            {tour.keyInfo?.map((section, i) => (
              <div key={i} className="mb-5">
                <h3 className="font-bold mb-2">{section.title}</h3>
                <ul className="list-disc ml-5 text-gray-600">
                  {section.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 border">
            {/* PRICE SECTION (FIXED PROPERLY) */}
            <div className="text-center border-b pb-5">
              <p className="text-gray-500 text-sm">Starting From</p>

              <div className="flex items-end justify-center gap-2 mt-2">
                <h2 className="text-4xl font-bold text-gray-900">
                  {currency}
                  {starting.toLocaleString("en-IN")}
                </h2>

                <span className="text-gray-500 mb-1">{perText}</span>
              </div>

              {original > starting && original > 0 && (
                <div className="mt-2">
                  <span className="line-through text-gray-400">
                    {currency}
                    {original.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-2 text-green-600 font-semibold text-sm">
                    Save {discount}%
                  </span>
                </div>
              )}
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tour.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* FORM */}
            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-black text-gray-800">
                Get Free Quote
              </h3>

              {/* NAME */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={quoteForm.name}
                  onChange={handleQuoteChange}
                  className={`w-full border p-4 rounded-2xl outline-none ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Enter Your Name"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteChange}
                  className={`w-full border p-4 rounded-2xl outline-none ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Enter Your Email"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteChange}
                  className={`w-full border p-4 rounded-2xl outline-none ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Enter Your Phone Number"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-4 rounded-2xl font-black text-lg"
              >
                Request Callback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
