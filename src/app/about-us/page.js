export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-6">
            About PrimeVistaJourney
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            Redefining travel experiences with trust, excellence, and
            personalized care.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed text-lg text-center max-w-4xl mx-auto">
          Established in 2025, PrimeVistaJourney was created to reshape modern
          travel experiences in a post-pandemic world. We blend innovation,
          affordability, and human connection to craft journeys that are
          seamless, meaningful, and memorable. Our team of young, dynamic
          professionals ensures every itinerary is designed with precision,
          passion, and attention to detail.
        </p>
      </section>

      {/* Vision */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
            To revolutionize travel by setting new benchmarks in reliability,
            creativity, and service excellence. We aspire to become a trusted
            global name in tourism, delivering inspiring journeys accessible to
            travelers of every background.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Customized Travel Packages",
            "Flight Bookings",
            "Hotel Bookings",
            "Corporate Travel",
            "Guided Tours",
            "Transport Solutions",
            "Adventure Activities",
            "Group Travel",
            "Visa & Documentation Assistance",
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border"
            >
              <h3 className="font-semibold text-lg text-indigo-700">
                {service}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-indigo-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose PrimeVistaJourney
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Personalized travel experiences",
              "Affordable pricing with premium quality",
              "Customer-first approach",
              "Experienced & passionate team",
              "Flexible planning & full support",
              "Safety & comfort assurance",
            ].map((point, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
              >
                <p className="text-gray-700 font-medium">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Destinations We Cover
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-gray-600">
          <div>
            <h3 className="font-semibold text-lg text-indigo-700 mb-2">
              India
            </h3>
            <p>
              From the Himalayas to Kerala’s backwaters and Goa’s beaches —
              experience India’s diversity.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-700 mb-2">Asia</h3>
            <p>
              Explore Tokyo, Bangkok, Bali, Kathmandu and more vibrant
              destinations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-700 mb-2">
              Europe
            </h3>
            <p>Discover Paris, Rome, Venice and the breathtaking Swiss Alps.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-700 mb-2">
              Americas
            </h3>
            <p>
              Visit New York, Rio de Janeiro, the Grand Canyon and Patagonia.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-700 mb-2">
              Africa
            </h3>
            <p>
              Experience Kenya’s wildlife, Egypt’s heritage and Morocco’s
              colorful markets.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-indigo-700 mb-2">
              Australia & Oceania
            </h3>
            <p>Witness the Great Barrier Reef and the beauty of New Zealand.</p>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Message from the Founders</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            At PrimeVistaJourney, we believe travel is transformation. It
            expands horizons, nurtures the spirit, and connects cultures. Our
            mission is to make travel meaningful, accessible, and unforgettable.
            With dedication, innovation, and trust, we craft journeys that leave
            lasting impressions.
          </p>
        </div>
      </section>
    </div>
  );
}
