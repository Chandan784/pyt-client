"use client";
import { useState } from "react";

export default function TravelEnquirySection() {
  const [travelType, setTravelType] = useState("Domestic");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelers: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ travelType, ...formData });
    alert(`Your ${travelType} enquiry has been submitted!`);
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelers: "",
      budget: "",
      message: "",
    });
  };

  return (
    <section className="max-w-7xl mx-auto my-12 px-6">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* LEFT SIDE: IMAGE + TEXT */}
        <div className="lg:w-1/2 relative">
          <img
            src="https://images.pexels.com/photos/21014/pexels-photo.jpg"
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6 lg:p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Plan Your Dream Trip
            </h2>
            <p className="text-white text-lg">
              Whether domestic or international, we make your travel effortless
              and unforgettable.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="lg:w-1/2 p-6 lg:p-12">
          <h3 className="text-3xl font-bold text-[var(--theme)] mb-6 text-center">
            Enquiry Form
          </h3>

          {/* Tabs */}
          <div className="flex justify-center mb-6 gap-4">
            <button
              className={`px-6 py-2 rounded-lg font-medium ${
                travelType === "Domestic"
                  ? "bg-[var(--theme)] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setTravelType("Domestic")}
            >
              Domestic
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium ${
                travelType === "International"
                  ? "bg-[var(--theme)] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setTravelType("International")}
            >
              International
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme)]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme)]"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme)]"
              />
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                placeholder="Number of Travelers"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme)]"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Destination"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme)]"
              />
              {travelType === "International" && (
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Approx. Budget"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme)]"
                />
              )}
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme)]"
            ></textarea>

            <button
              type="submit"
              className="bg-[var(--theme)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
