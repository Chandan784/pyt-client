"use client";

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
    <section className="py-14 px-4 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold t text-pink-950">
          Popular Domestic Destinations
        </h2>
        <div className="w-20 h-[2px] bg-black mx-auto mt-3" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {domesticTrips.map((trip, index) => (
          <div
            key={index}
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-end">
              <h3 className="text-white text-lg font-semibold p-4">
                {trip.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
