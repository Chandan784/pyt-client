"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const domesticTrips = [
  {
    title: "Andaman",
    image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
  },
  {
    title: "Himachal",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  },
  {
    title: "Kashmir",
    image: "https://images.pexels.com/photos/358443/pexels-photo-358443.jpeg",
  },
  {
    title: "Kerala",
    image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
  },
  {
    title: "Ladakh",
    image: "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg",
  },
  {
    title: "North East",
    image: "https://images.pexels.com/photos/1291129/pexels-photo-1291129.jpeg",
  },
  {
    title: "Rajasthan",
    image: "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg",
  },
  {
    title: "Uttarakhand",
    image: "https://images.pexels.com/photos/733174/pexels-photo-733174.jpeg",
  },
];

export default function DomesticTripsSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[4px] uppercase text-gray-500 mb-3">
            Explore India
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
            Popular Domestic Destinations
          </h2>

          <div className="w-16 h-[2px] bg-gray-900 mx-auto mt-6"></div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {domesticTrips.map((trip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative rounded-3xl overflow-hidden bg-white/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative w-full h-72">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500">
                {/* Title */}
                <div className="absolute bottom-6 left-6 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-6">
                  <p className="text-xs tracking-[3px] uppercase text-gray-300 mb-2">
                    Destination
                  </p>
                  <h3 className="text-white text-2xl font-semibold tracking-wide">
                    {trip.title}
                  </h3>
                </div>

                {/* Center Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-sm font-semibold tracking-wide shadow-2xl hover:scale-105 hover:bg-gray-100 transition-all duration-300">
                    View Packages
                  </button>
                </div>
              </div>

              {/* Premium Border Glow */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
