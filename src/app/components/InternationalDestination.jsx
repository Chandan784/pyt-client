"use client";
import { motion } from "framer-motion";

const destinations = [
  {
    name: "Bali Package",
    place: "Bali",
    image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
  },
  {
    name: "Dubai Package",
    place: "Dubai",
    image: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  },
  {
    name: "Maldives Package",
    place: "Maldives",
    image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
  },
  {
    name: "Singapore Package",
    place: "Singapore",
    image: "https://images.pexels.com/photos/358443/pexels-photo-358443.jpeg",
  },
  {
    name: "Thailand Package",
    place: "Thailand",
    image: "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg",
  },
  {
    name: "Vietnam Package",
    place: "Vietnam",
    image: "https://images.pexels.com/photos/1291129/pexels-photo-1291129.jpeg",
  },
  {
    name: "Baku Package",
    place: "Baku",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  },
  {
    name: "Almaty Package",
    place: "Almaty",
    image: "https://images.pexels.com/photos/733174/pexels-photo-733174.jpeg",
  },
];

export default function InternationalDestinations() {
  return (
    <section className="relative py-16 md:py-20 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      {/* Soft Premium Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400/20 rounded-full blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Popular International Destinations
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover handpicked international holiday packages crafted for
            unforgettable experiences.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.place}
                  loading="lazy"
                  className="w-full h-56 object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-600 transition">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.place}</p>

                {/* Hover Underline Animation */}
                <div className="mt-3 h-[2px] w-0 bg-yellow-500 mx-auto group-hover:w-16 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
