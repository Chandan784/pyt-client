"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: "100", label: "Trips Completed", suffix: "K+" },
  { value: "350", label: "Global Destinations", suffix: "+" },
  { value: "500", label: "Trusted Partners", suffix: "+" },
  { value: "2500", label: "Travellers / Month", suffix: "+" },
];

export default function TripStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [countedValues, setCountedValues] = useState(stats.map(() => "0"));

  useEffect(() => {
    if (!isInView) return;

    const intervals = stats.map((stat, index) => {
      const targetValue = parseInt(stat.value);
      let currentValue = 0;

      return setInterval(() => {
        currentValue += Math.ceil(targetValue / 50);
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(intervals[index]);
        }

        setCountedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = currentValue.toString();
          return newValues;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-40" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Trusted by thousands of travelers
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We&apos;re proud to have built a platform that connects travelers
            with unforgettable experiences worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-200/50 hover:border-slate-300/50"
            >
              {/* Inner decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative space-y-2">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {isInView ? countedValues[index] : "0"}
                    <span className="text-primary-600">{stat.suffix}</span>
                  </span>
                </h3>

                <div className="space-y-1">
                  <p className="text-sm md:text-base font-medium text-slate-600">
                    {stat.label}
                  </p>

                  {/* Animated progress indicator */}
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000"
                      style={{
                        width: isInView
                          ? `${(parseInt(countedValues[index]) / parseInt(stat.value)) * 100}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Secure Booking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
