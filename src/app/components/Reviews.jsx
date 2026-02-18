"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviewImages = [
  "/reviews/rev1.jpeg",
  "/reviews/rev2.jpeg",
  "/reviews/rev3.jpeg",
  "/reviews/rev4.jpeg",
  "/reviews/rev5.jpeg",
  "/reviews/rev6.jpeg",
  "/reviews/rev7.jpeg",
];

export default function ReviewImageSection() {
  const scrollRef = useRef(null);
  const autoSlideRef = useRef(null);

  // Auto Slide
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 5
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 280, behavior: "smooth" });
        }
      }, 3000);
    };

    const stopAutoSlide = () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };

    startAutoSlide();

    // Pause on hover (desktop)
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);

    return () => {
      stopAutoSlide();
      container.removeEventListener("mouseenter", stopAutoSlide);
      container.removeEventListener("mouseleave", startAutoSlide);
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">
            What Our Travelers Say
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Real screenshots from happy customers
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="
              absolute left-2 md:left-0
              top-1/2 -translate-y-1/2
              z-10
              bg-white/90 backdrop-blur
              shadow-md
              p-2 md:p-3
              rounded-full
              hover:scale-110
              transition
            "
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="
              flex gap-5
              overflow-x-auto
              scroll-smooth
              snap-x snap-mandatory
              pb-4
              no-scrollbar
            "
          >
            {reviewImages.map((img, i) => (
              <div
                key={i}
                className="
                  snap-start
                  flex-shrink-0
                  w-[75%]
                  sm:w-[45%]
                  md:w-[30%]
                  lg:w-[22%]
                  xl:w-[18%]
                "
              >
                <div className="rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition duration-300">
                  <Image
                    src={img}
                    alt="Customer review"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="
              absolute right-2 md:right-0
              top-1/2 -translate-y-1/2
              z-10
              bg-white/90 backdrop-blur
              shadow-md
              p-2 md:p-3
              rounded-full
              hover:scale-110
              transition
            "
          >
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
