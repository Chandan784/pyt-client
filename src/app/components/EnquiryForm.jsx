"use client";
import { useState } from "react";

export default function TravelEnquirySection() {
  const [travelType, setTravelType] = useState("Domestic");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    destination: "",
    travelers: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendWhatsApp = (e) => {
    e.preventDefault();

    const whatsappNumber = "919871597736";

    const text = `
Travel Enquiry
Type: ${travelType}
Name: ${form.name}
Phone: ${form.phone}
Destination: ${form.destination}
Travelers: ${form.travelers}
Budget: ${form.budget || "N/A"}
Message: ${form.message || "N/A"}
`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <section className="max-w-7xl mx-auto my-20 px-1 lg:px-6">
      {/* SECTION HEADING */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Start Planning Your Trip
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
          Share your travel preferences and our experts will design a
          personalised itinerary just for you.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* LEFT IMAGE */}
        <div className="relative h-[320px] lg:h-auto">
          <img
            src="https://images.pexels.com/photos/21014/pexels-photo.jpg"
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 flex items-center p-10">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Travel Made Simple
              </h3>
              <p className="text-sm text-white/90 leading-relaxed max-w-sm">
                From domestic getaways to international adventures, we handle
                everything with care and expertise.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-1 lg:p-10">
          <div className="border rounded-xl p-1 lg:p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Travel Enquiry Form
            </h3>

            <form onSubmit={sendWhatsApp} className="space-y-4 text-sm">
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--theme)]"
              >
                <option value="Domestic">Domestic Trip</option>
                <option value="International">International Trip</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-[var(--theme)]"
                />
                <input
                  name="phone"
                  placeholder="Mobile Number"
                  required
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-[var(--theme)]"
                />
              </div>

              <input
                name="destination"
                placeholder="Destination"
                required
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-[var(--theme)]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="travelers"
                  placeholder="Number of Travelers"
                  required
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-[var(--theme)]"
                />

                {travelType === "International" && (
                  <input
                    name="budget"
                    placeholder="Approx Budget"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-[var(--theme)]"
                  />
                )}
              </div>

              <textarea
                name="message"
                rows="3"
                placeholder="Additional Requirements (optional)"
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-[var(--theme)]"
              />

              <button
                type="submit"
                className="w-full bg-[var(--theme)] text-white py-3 rounded-md font-medium hover:opacity-90 transition"
              >
                Send Enquiry on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
