"use client";

export default function StayForm({ data, onChange }) {

  const updateHotel = (index, key, value) => {
    const next = [...data];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    onChange(next);
  };

  const updateRoom = (
    hotelIndex,
    roomIndex,
    key,
    value
  ) => {
    const next = structuredClone(data);

    next[hotelIndex].rooms[roomIndex][key] = value;

    onChange(next);
  };

  const addHotel = () => {
    onChange([
      ...data,
      {
        hotel: "New Hotel",
        city: "",
        category: "4 Star",
        checkIn: "",
        checkOut: "",
        rooms: [
          {
            room: "Room 1",
            type: "",
            adults: "2 Adults",
            breakfast: "Included",
            lunch: "Not Included",
            dinner: "Not Included",
          },
        ],
      },
    ]);
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold">
            Stays
          </h2>

          <p className="text-sm text-slate-500">
            Hotels and room information.
          </p>
        </div>

        <button
          type="button"
          onClick={addHotel}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          + Add Hotel
        </button>

      </div>

      <div className="space-y-6">

        {data.map((hotel, hotelIndex) => (

          <div
            key={hotelIndex}
            className="rounded-xl border bg-slate-50 p-5"
          >

            <div className="grid gap-4 md:grid-cols-5">

              <Input
                label="Hotel"
                value={hotel.hotel}
                onChange={(e) =>
                  updateHotel(
                    hotelIndex,
                    "hotel",
                    e.target.value
                  )
                }
              />

              <Input
                label="City"
                value={hotel.city}
                onChange={(e) =>
                  updateHotel(
                    hotelIndex,
                    "city",
                    e.target.value
                  )
                }
              />

              <Input
                label="Category"
                value={hotel.category}
                onChange={(e) =>
                  updateHotel(
                    hotelIndex,
                    "category",
                    e.target.value
                  )
                }
              />

              <Input
                label="Check-in"
                value={hotel.checkIn}
                onChange={(e) =>
                  updateHotel(
                    hotelIndex,
                    "checkIn",
                    e.target.value
                  )
                }
              />

              <Input
                label="Check-out"
                value={hotel.checkOut}
                onChange={(e) =>
                  updateHotel(
                    hotelIndex,
                    "checkOut",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="mt-5 space-y-4">

              {hotel.rooms.map((room, roomIndex) => (

                <div
                  key={roomIndex}
                  className="rounded-lg border bg-white p-4"
                >

                  <div className="grid gap-4 md:grid-cols-3">

                    <Input
                      label="Room"
                      value={room.room}
                      onChange={(e) =>
                        updateRoom(
                          hotelIndex,
                          roomIndex,
                          "room",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Room Type"
                      value={room.type}
                      onChange={(e) =>
                        updateRoom(
                          hotelIndex,
                          roomIndex,
                          "type",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Guests"
                      value={room.adults}
                      onChange={(e) =>
                        updateRoom(
                          hotelIndex,
                          roomIndex,
                          "adults",
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>

      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
    </label>
  );
}