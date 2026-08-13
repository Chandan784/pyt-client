"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  /* ================= GET HERO SLIDES ================= */

  const getSlides = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/heroSliders/active`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load hero slides");
      }

      const data = await response.json();

      setSlides(data);
      setIndex(0);
    } catch (error) {
      console.error("Hero Slider Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    getSlides();
  }, []);

  /* ================= AUTO SLIDER ================= */

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (slides.length <= 1) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    if (slides.length > 1) {
      startAutoSlide();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  /* ================= PREVIOUS ================= */

  const handlePrev = () => {
    if (isAnimating || slides.length <= 1) return;

    setIsAnimating(true);

    setIndex(
      (prev) =>
        (prev - 1 + slides.length) % slides.length
    );

    startAutoSlide();

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  /* ================= NEXT ================= */

  const handleNext = () => {
    if (isAnimating || slides.length <= 1) return;

    setIsAnimating(true);

    setIndex(
      (prev) =>
        (prev + 1) % slides.length
    );

    startAutoSlide();

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  /* ================= DOT CLICK ================= */

  const handleDotClick = (i) => {
    if (isAnimating || i === index) return;

    setIsAnimating(true);

    setIndex(i);

    startAutoSlide();

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white/60 text-sm">
          Loading...
        </div>
      </section>
    );
  }

  /* ================= NO DATA ================= */

  if (!slides.length) {
    return null;
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Full Screen Slider Container */}

      <div className="relative w-full h-full">

        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
              i === index
                ? "opacity-100 scale-100 z-20"
                : "opacity-0 scale-110 z-10"
            }`}
          >

            {/* ================= IMAGE ================= */}

            <div className="absolute inset-0 overflow-hidden">

              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover transition-transform duration-[8000ms] ease-out"
                style={{
                  transform:
                    i === index
                      ? "scale(1.08)"
                      : "scale(1)",
                }}
              />

            </div>

            {/* ================= GRADIENT ================= */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

            {/* ================= CONTENT ================= */}

            <div className="relative z-30 h-full flex items-center justify-center text-center text-white px-6">

              <div
                className={`max-w-3xl transform transition-all duration-1000 delay-300 ${
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >

                {/* Label */}

                <p className="text-xs md:text-sm uppercase tracking-[8px] text-white/80 mb-4 md:mb-6 font-light">
                  DISCOVER
                </p>

                {/* Dynamic Title */}

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 md:mb-6 leading-[1.2]">
                  {slide.title}
                </h1>

                {/* Dynamic Description */}

                <p className="text-sm md:text-base lg:text-lg text-white/70 mb-8 md:mb-10 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
                  {slide.description}
                </p>

                {/* Dynamic Button */}

                <a
                  href={slide.button_link || "#"}
                  className="group relative inline-block px-8 py-3 md:px-9 md:py-3.5 border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm md:text-base font-medium tracking-wide hover:bg-white hover:text-black transition-all duration-500 hover:border-white rounded-full"
                >
                  <span className="relative z-10">
                    {slide.button_text || "Explore Now"}
                  </span>
                </a>

              </div>

            </div>
          </div>
        ))}

        {/* ================= PREVIOUS BUTTON ================= */}

        {slides.length > 1 && (
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="absolute top-1/2 left-6 md:left-10 -translate-y-1/2 text-white/60 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 hover:bg-white/10 z-40 flex items-center justify-center group disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="text-2xl md:text-3xl font-light group-hover:scale-110 transition-transform duration-300">
              &#10094;
            </span>
          </button>
        )}

        {/* ================= NEXT BUTTON ================= */}

        {slides.length > 1 && (
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute top-1/2 right-6 md:right-10 -translate-y-1/2 text-white/60 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 hover:bg-white/10 z-40 flex items-center justify-center group disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="text-2xl md:text-3xl font-light group-hover:scale-110 transition-transform duration-300">
              &#10095;
            </span>
          </button>
        )}

        {/* ================= DOTS ================= */}

        {slides.length > 1 && (
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-40">

            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => handleDotClick(i)}
                disabled={isAnimating}
                className="group"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    index === i
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              </button>
            ))}

          </div>
        )}

      </div>

      {/* ================= BOTTOM CURVE ================= */}

      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-white rounded-t-[50%] z-30" />

    </section>
  );
}