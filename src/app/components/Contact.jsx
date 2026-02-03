"use client";

export default function ContactSection() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-[var(--theme)] mb-4">
          Let's Start Your Journey
        </h2>
        <p className="text-gray-700 text-lg">
          Reach out to us and plan your dream trip today!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phone Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 hover:shadow-xl transition">
          <div className="text-[var(--theme)] text-4xl">📞</div>
          <h3 className="font-semibold text-xl">Call us on</h3>
          <p className="text-gray-700 font-medium">+91-9871597736</p>
        </div>

        {/* Email Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 hover:shadow-xl transition">
          <div className="text-[var(--theme)] text-4xl">✉️</div>
          <h3 className="font-semibold text-xl">Email us on</h3>
          <p className="text-gray-700 font-medium">info@traveljunky.co.in</p>
        </div>
      </div>
    </section>
  );
}
