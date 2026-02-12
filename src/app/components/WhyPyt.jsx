"use client";

import { FiTarget, FiGlobe, FiShield, FiStar, FiHeart } from "react-icons/fi";

export default function WhyPrimevista() {
  const features = [
    {
      icon: <FiTarget className="text-2xl" />,
      title: "100% Tailor-Made Trips",
      bgColor: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
      items: [
        "Trips designed around your preferences",
        "Travel at your own pace & comfort",
        "Choose accommodations that suit you",
        "Expert guidance for perfect planning",
      ],
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: "Destination Experts",
      bgColor: "from-blue-400 to-blue-500",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-500",
      items: [
        "Experts with real destination experience",
        "One dedicated consultant end-to-end",
        "Smart planning to save time & money",
        "Authentic insights, not generic tours",
      ],
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "Trusted & Reliable",
      bgColor: "from-blue-600 to-blue-700",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
      items: [
        "Government-recognized travel partner",
        "Serving travelers since 2017",
        "Verified local guides & partners",
        "24/7 support throughout your journey",
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Clean Light Blue Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-blue-100/30 to-transparent"></div>

      {/* Subtle Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading Section - Clean & Professional */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Brand Badge - Light Blue */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            <FiStar className="text-blue-600" />
            <span>Why Choose Us</span>
            <FiHeart className="text-blue-400" />
          </div>

          {/* Main Heading - Simple Blue Gradient */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Why Travel with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent relative">
              Primevista Journey?
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></div>
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
            We don't just plan trips — we craft personalized journeys that
            reflect who you are and how you want to travel.
          </p>

          {/* Stats Bar - Clean */}
          <div className="flex items-center justify-center gap-8 mt-10 pt-6 border-t border-blue-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5000+</div>
              <p className="text-xs text-gray-500">Happy Travelers</p>
            </div>
            <div className="w-px h-8 bg-blue-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">150+</div>
              <p className="text-xs text-gray-500">Destinations</p>
            </div>
            <div className="w-px h-8 bg-blue-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.9</div>
              <p className="text-xs text-gray-500">Customer Rating</p>
            </div>
          </div>
        </div>

        {/* Cards Grid - Clean Blue Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border border-blue-100/50"
            >
              {/* Subtle Blue Hover Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Light Blue Decorative Circle */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Icon - Clean Blue Gradient */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.bgColor} text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-500`}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* List Items */}
              <ul className="space-y-3">
                {feature.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-600 text-sm"
                  >
                    <span className="inline-block w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Blue Accent */}
              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.bgColor} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
            </div>
          ))}
        </div>

        {/* Trust Badges - Light Blue */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-8 border-t border-blue-100">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-700">
              24/7 Customer Support
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-700">
              Best Price Guarantee
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-700">
              Free Cancellation
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-700">
              Verified Reviews
            </span>
          </div>
        </div>

        {/* CTA Banner - Clean Blue Gradient */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-2">
            Ready to Start Your Journey?
          </h3>
          <p className="text-blue-100 mb-4">
            Let our experts design your perfect trip today.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Plan Your Trip Now
          </button>
        </div>
      </div>
    </section>
  );
}
