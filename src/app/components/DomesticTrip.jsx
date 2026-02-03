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

export default function DomesticTripsSimple() {
  return (
    <section className="my-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-[var(--theme)] mb-6">
        Domestic Trips
      </h2>

      <div className="flex overflow-x-auto gap-6 py-4 scrollbar-hide">
        {domesticTrips.map((trip, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transform transition"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white font-bold text-xl text-center">
                {trip.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
