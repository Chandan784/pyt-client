"use client";

export default function ContactSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header - Modern & Elegant */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm border border-blue-200/50">
            ✈️ Ready to Travel?
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Let's Start Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Connect with our travel experts to plan your perfect trip —
            <span className="text-blue-600 font-medium">
              {" "}
              free consultation
            </span>
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Contact Cards - Modern Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone Card */}
          <div className="group bg-white rounded-2xl p-8 flex items-center gap-5 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
            <div className="relative">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                📞
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>

            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-[3px] mb-1">
                Call Us 24/7
              </p>
              <p className="text-sm md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                +91 81784 20122
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Available now
              </p>
            </div>

            {/* Decorative Element */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-2xl text-blue-200">→</span>
            </div>
          </div>

          {/* Email Card */}
          <div className="group bg-white rounded-2xl p-8 flex items-center gap-5 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
            <div className="relative">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                ✉️
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-green-500 text-xs">✓</span>
              </div>
            </div>

            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-[3px] mb-1">
                Email Us
              </p>
              <p className="text-sm md:text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors break-all">
                info@primevistajourney.com
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ⚡ Reply within 2 hours
              </p>
            </div>

            {/* Decorative Element */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-2xl text-indigo-200">→</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Free Consultation
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
            No Booking Fee
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
            24/7 Support
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            Best Price Guarantee
          </span>
        </div>
      </div>
    </section>
  );
}
