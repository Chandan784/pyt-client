"use client";

export default function ContactSection() {
  return (
    <section className="bg-gray-50 py-14 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Let’s Start Your Journey
        </h2>
        <p className="text-sm text-gray-600">
          Connect with our travel experts to plan your perfect trip
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="bg-white border rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--theme)]/10 text-[var(--theme)] text-lg">
            📞
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Call Us
            </p>
            <p className="text-sm font-medium text-gray-800">+91 98715 97736</p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white border rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--theme)]/10 text-[var(--theme)] text-lg">
            ✉️
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Email Us
            </p>
            <p className="text-sm font-medium text-gray-800">
              info@traveljunky.co.in
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
