"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroSlider() {
  const slides = [
    {
      title: "Fly to Your Dream Destinations",
      desc: "Explore the world with trusted travel plans",
      image: "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
    },
    {
      title: "Relax on Breathtaking Beaches",
      desc: "Sun, sand & sea - unforgettable moments",
      image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
    },
    {
      title: "Journey Through Majestic Mountains",
      desc: "Adventure awaits in every step",
      image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
    },
  ];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // Function to start auto-slide
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Arrow navigation
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide(); // reset interval
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    startAutoSlide(); // reset interval
  };

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl">{slide.desc}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              startAutoSlide(); // reset interval
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i ? "bg-[var(--theme)] scale-125" : "bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20"
      >
        &#10095;
      </button>
    </section>
  );
}
