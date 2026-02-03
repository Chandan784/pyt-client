"use client";

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
  {
    name: "Europe Package",
    place: "Europe",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
  },
  {
    name: "Mauritius Package",
    place: "Mauritius",
    image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
  },
];

export default function InternationalDestinations() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-[var(--theme)] mb-2">
            Popular International Destinations
          </h2>
          <p className="text-gray-600">
            Handpicked international holiday packages for unforgettable
            experiences
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {destinations.map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.place}
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold text-sm">
                  {item.name}
                </h3>
                <span className="text-white/80 text-xs">{item.place}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
