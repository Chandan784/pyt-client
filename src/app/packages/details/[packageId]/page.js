"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import DayWiseItinerary from "@/app/components/DayWiseIntinary";
import Image from "next/image";

export default function TourDetails() {
  const params = useParams();
  const { packageId } = params;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!quoteForm.name.trim()) {
      newErrors.name = "Name is required";
    } else if (quoteForm.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!quoteForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(quoteForm.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!quoteForm.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(quoteForm.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle WhatsApp submission
  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const message = `
Hello Prime Vista Journey,

I would like to request a free quote for the tour package.

📌 Package: ${tour?.title || "Tour Package"}
📅 Duration: ${tour?.duration || "N/A"}

👤 Name: ${quoteForm.name}
📧 Email: ${quoteForm.email}
📱 Phone: ${quoteForm.phone}

Please provide me with the best available offer.
Thank you!`;

      const whatsappNumber = "+918178420122";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
      
      window.open(url, "_blank");
      
      setQuoteForm({ name: "", email: "", phone: "" });
      setErrors({});
    } catch (error) {
      console.error("WhatsApp submission error:", error);
      alert("Unable to open WhatsApp. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch tour data
  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://api.primevistajourney.com/api/package-details/${packageId}`,
          {
            timeout: 10000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }
        );

        if (res.data?.data) {
          setTour(res.data.data);
        } else if (res.data) {
          setTour(res.data);
        } else {
          setError("No data found");
          setTour(null);
        }
      } catch (error) {
        console.error("Error fetching tour:", error);
        setError("Failed to load package details. Please try again later.");
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      fetchTour();
    }
  }, [packageId]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Calculate discount
  const starting = Number(tour?.startingFrom || 0);
  const original = Number(tour?.originalPrice || 0);
  const currency = tour?.currency || "₹";
  const perText = tour?.perText || "Per Person";
  const discount = original > starting && original > 0
    ? Math.round(((original - starting) / original) * 100)
    : 0;

  // ✅ Image fallback handler
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    // Show fallback div instead
    const parent = e.target.parentElement;
    if (parent) {
      const fallback = document.createElement('div');
      fallback.className = 'w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center';
      fallback.innerHTML = `<span class="text-white text-2xl font-bold">${tour?.title?.charAt(0) || '📸'}</span>`;
      parent.appendChild(fallback);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading package details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Package Not Found</h2>
          <p className="text-gray-600 mb-6">The package you're looking for doesn't exist or has been removed.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {/* Background Image - ✅ FIXED */}
        <div className="absolute inset-0 w-full h-full">
          {tour.thumbnail ? (
            <Image
              src={tour.thumbnail}
              alt={tour.title || "Tour Package"}
              fill
              priority
              className="object-cover scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              unoptimized={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-6xl">📸</span>
            </div>
          )}
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full px-6 md:px-16 py-20 md:py-28 text-white">
            {/* Rating Badge */}
            {tour.ratings && (
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-yellow-400/30">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{tour.ratings}</span>
                <span className="text-white/60">/ 5.0</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {tour.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm md:text-base text-white/80">
              <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                📅 {tour.duration || "N/A"}
              </span>
              <span className="text-white/40">•</span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                📍 {tour.citiesCovered?.join(" → ") || "Various Locations"}
              </span>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tour.highlights.slice(0, 5).map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs md:text-sm bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-6">
              <button
                onClick={() => {
                  document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          {tour.overview && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {tour.overview}
              </p>
            </div>
          )}

          {/* Itinerary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Itinerary</h2>
              <DayWiseItinerary itinerary={tour.itinerary} />
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-6">
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-green-600 font-bold text-lg mb-4 flex items-center gap-2">
                  <span>✔</span> Inclusions
                </h3>
                <ul className="space-y-2.5 text-gray-600">
                  {tour.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-red-500 font-bold text-lg mb-4 flex items-center gap-2">
                  <span>✖</span> Exclusions
                </h3>
                <ul className="space-y-2.5 text-gray-600">
                  {tour.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Key Info */}
          {tour.keyInfo && tour.keyInfo.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Information</h2>
              {tour.keyInfo.map((section, i) => (
                <div key={i} className="mb-5 last:mb-0">
                  <h3 className="font-semibold text-gray-700 mb-3">{section.title}</h3>
                  <ul className="space-y-2 text-gray-600">
                    {section.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Terms & Conditions */}
          {tour.termsAndConditions && tour.termsAndConditions.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Terms & Conditions</h2>
              {tour.termsAndConditions.map((section, i) => (
                <div key={i} className="mb-5 last:mb-0">
                  <h3 className="font-semibold text-gray-700 mb-3">{section.title}</h3>
                  <ul className="space-y-2 text-gray-600">
                    {section.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
            {/* Price Section */}
            <div className="text-center border-b pb-5">
              <p className="text-gray-500 text-sm font-medium">Starting From</p>
              <div className="flex items-end justify-center gap-2 mt-2">
                <h2 className="text-4xl font-bold text-gray-900">
                  {currency}{starting.toLocaleString("en-IN")}
                </h2>
                <span className="text-gray-500 mb-1 text-sm">{perText}</span>
              </div>
              {original > starting && original > 0 && (
                <div className="mt-2">
                  <span className="line-through text-gray-400">
                    {currency}{original.toLocaleString("en-IN")}
                  </span>
                  <span className="ml-2 bg-green-100 text-green-700 font-semibold text-sm px-2 py-0.5 rounded-full">
                    Save {discount}%
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {tour.tags && tour.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tour.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Quote Form */}
            <div id="quote-form" className="mt-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Get Free Quote</h3>
              <p className="text-sm text-gray-500">Fill in your details and we'll get back to you shortly</p>

              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={quoteForm.name}
                  onChange={handleQuoteChange}
                  className={`w-full border p-4 rounded-xl outline-none transition ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Enter Your Name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteChange}
                  className={`w-full border p-4 rounded-xl outline-none transition ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Enter Your Email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteChange}
                  className={`w-full border p-4 rounded-xl outline-none transition ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Enter Your Phone Number"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    Submitting...
                  </>
                ) : (
                  "Request Callback"
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-2">
                By submitting, you agree to our terms & privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}