"use client";

import { FiTarget, FiGlobe, FiShield } from "react-icons/fi";

export default function WhyPYT() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Why Travel with PYT?
          </h2>
          <div className="w-16 h-[2px] bg-[var(--theme)] mx-auto my-4" />
          <p className="text-gray-600 text-base">
            We don’t just plan trips — we craft personalized journeys that
            reflect who you are and how you want to travel.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white rounded-2xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--theme)]/10 text-[var(--theme)] text-2xl mb-6">
              <FiTarget />
            </div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              100% Tailor-Made Trips
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <li>• Trips designed around your preferences</li>
              <li>• Travel at your own pace & comfort</li>
              <li>• Choose accommodations that suit you</li>
              <li>• Expert guidance for perfect planning</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-2xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--theme)]/10 text-[var(--theme)] text-2xl mb-6">
              <FiGlobe />
            </div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Destination Experts
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <li>• Experts with real destination experience</li>
              <li>• One dedicated consultant end-to-end</li>
              <li>• Smart planning to save time & money</li>
              <li>• Authentic insights, not generic tours</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-2xl p-8 border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--theme)]/10 text-[var(--theme)] text-2xl mb-6">
              <FiShield />
            </div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Trusted & Reliable
            </h3>
            <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <li>• Government-recognized travel partner</li>
              <li>• Serving travelers since 2017</li>
              <li>• Verified local guides & partners</li>
              <li>• 24/7 support throughout your journey</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
