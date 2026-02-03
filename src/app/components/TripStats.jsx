"use client";

export default function TripStats() {
  return (
    <section className="bg-[var(--theme)] py-12 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center text-white">
          {/* Item */}
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              100K+
            </h3>
            <p className="text-xs md:text-sm opacity-90 tracking-wide">
              Trips Completed
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              350+
            </h3>
            <p className="text-xs md:text-sm opacity-90 tracking-wide">
              Global Destinations
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              500+
            </h3>
            <p className="text-xs md:text-sm opacity-90 tracking-wide">
              Trusted Partners
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              2500+
            </h3>
            <p className="text-xs md:text-sm opacity-90 tracking-wide">
              Travellers / Month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
