"use client";

export default function FlightForm({ data, onChange }) {

  const update = (index, key, value) => {
    const next = [...data];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    onChange(next);
  };

  const addFlight = () => {
    onChange([
      ...data,
      {
        airline: "",
        flightNumber: "",
        from: "",
        to: "",
        departure: "",
        arrival: "",
      },
    ]);
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold">
            Flights
          </h2>

          <p className="text-sm text-slate-500">
            Flight information is optional.
          </p>
        </div>

        <button
          type="button"
          onClick={addFlight}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
        >
          + Add Flight
        </button>

      </div>

      <div className="space-y-5">

        {data.map((flight, index) => (

          <div
            key={index}
            className="grid gap-4 rounded-xl bg-slate-50 p-5 md:grid-cols-3"
          >

            <Input
              label="Airline"
              value={flight.airline}
              onChange={(e) =>
                update(index, "airline", e.target.value)
              }
            />

            <Input
              label="Flight Number"
              value={flight.flightNumber}
              onChange={(e) =>
                update(
                  index,
                  "flightNumber",
                  e.target.value
                )
              }
            />

            <Input
              label="From"
              value={flight.from}
              onChange={(e) =>
                update(index, "from", e.target.value)
              }
            />

            <Input
              label="To"
              value={flight.to}
              onChange={(e) =>
                update(index, "to", e.target.value)
              }
            />

            <Input
              label="Departure"
              value={flight.departure}
              onChange={(e) =>
                update(
                  index,
                  "departure",
                  e.target.value
                )
              }
            />

            <Input
              label="Arrival"
              value={flight.arrival}
              onChange={(e) =>
                update(
                  index,
                  "arrival",
                  e.target.value
                )
              }
            />

          </div>

        ))}

      </div>

    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold">
        {label}
      </span>

      <input
        {...props}
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
    </label>
  );
}