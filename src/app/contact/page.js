"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact PrimeVistaJourney
          </h1>
          <p className="text-blue-100 text-lg">
            Let’s plan your next unforgettable journey together.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-indigo-700">
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Whether you're planning a vacation, corporate trip, or need
                travel assistance, our team is here to help you every step of
                the way.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border">
                <h3 className="font-semibold text-lg text-indigo-700">
                  📍 Office
                </h3>
                <p className="text-gray-600 mt-2">India</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border">
                <h3 className="font-semibold text-lg text-indigo-700">
                  📞 Phone
                </h3>
                <p className="text-gray-600 mt-2">+91 81784 20122</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border">
                <h3 className="font-semibold text-lg text-indigo-700">
                  ✉ Email
                </h3>
                <p className="text-gray-600 mt-2">Info@primevistajourney.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Your Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-semibold transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
