"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ReviewImageSection() {
  const [reviewImages, setReviewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  const scrollRef = useRef(null);
  const autoSlideRef = useRef(null);

  const API = "https://api.primevistajourney.com/api/reviews";

  // 🔥 Fetch Images
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setReviewImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔥 Auto Slider
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const start = () => {
      autoSlideRef.current = setInterval(() => {
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 5
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 300, behavior: "smooth" });
        }
      }, 3000);
    };

    const stop = () => clearInterval(autoSlideRef.current);

    start();
    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);

    return () => {
      stop();
      container.removeEventListener("mouseenter", stop);
      container.removeEventListener("mouseleave", start);
    };
  }, []);

  // 🔥 Manual Scroll
  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Travelers Say
          </h2>
          <p className="text-gray-500 mt-2">
            Real screenshots from happy customers
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:scale-110 transition"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
          >
            {/* Skeleton Loading */}
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[70%] sm:w-[40%] md:w-[28%] lg:w-[20%] h-48 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}

            {/* Images */}
            {!loading &&
              reviewImages.map((img) => (
                <div
                  key={img.id}
                  className="flex-shrink-0 w-[70%] sm:w-[30%] md:w-[24%] lg:w-[20%]"
                >
                  <div
                    onClick={() => setActiveImage(img.image_url)}
                    className="cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                  >
                    <Image
                      src={img.image_url}
                      alt="review"
                      width={400}
                      height={600}
                      className="w-full h-fit object-cover"
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:scale-110 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 🔥 Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={30} />
          </button>

          <img
            src={activeImage}
            className="max-h-[90vh] rounded-xl shadow-lg"
          />
        </div>
      )}
    </section>
  );
}
