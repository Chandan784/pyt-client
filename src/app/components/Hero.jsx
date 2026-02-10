"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function HeroSlider() {
  const slides = [
    {
      title: "Fly to Your Dream Destinations",
      desc: "Explore the world with trusted travel experiences",
      image: "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
    },
    {
      title: "Relax on Breathtaking Beaches",
      desc: "Sun, sand & sea — unforgettable memories",
      image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
    },
    {
      title: "Journey Through Majestic Mountains",
      desc: "Adventure awaits at every step",
      image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
    },
  ];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide();
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-3 md:px-6 pt-4 md:pt-6">
        <div className="relative h-[55vh] md:h-[85vh] rounded-[28px] md:rounded-[40px] overflow-hidden shadow-2xl">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-1000 ${
                i === index
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 md:px-6">
                <div className="max-w-2xl">
                  {/* Small Cool Label */}
                  <p className="text-[11px] md:text-sm uppercase tracking-[3px] text-gray-300 mb-3 md:mb-4">
                    Discover the World
                  </p>

                  {/* Heading */}
                  <h1 className="text-2xl leading-snug md:text-6xl font-semibold tracking-tight mb-4 md:mb-6">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-sm md:text-xl text-gray-200 mb-6 md:mb-8">
                    {slide.desc}
                  </p>

                  {/* Button */}
                  <button className="bg-white text-black px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-semibold tracking-wide shadow-xl hover:scale-105 transition duration-300">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 md:left-6 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition z-20 text-sm md:text-base"
          >
            &#10094;
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 md:right-6 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition z-20 text-sm md:text-base"
          >
            &#10095;
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  startAutoSlide();
                }}
                className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                  index === i ? "w-6 md:w-8 bg-white" : "w-2 md:w-3 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full h-14 md:h-20 bg-white rounded-t-[60%] md:rounded-t-[40%]" />
    </section>
  );
}
